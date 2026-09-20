"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Download,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import VariableModal from "@/components/variables/VariableModal";
import VariableTable from "@/components/variables/VariableTable";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function Project() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [variables, setVariables] = useState([]);
  const [variableLoading, setVariableLoading] = useState(true);
  const [variableError, setVariableError] = useState(null);
  const [visibleVariableId, setVisibleVariableId] = useState(null);


  const [variableDeleteModal, setVariableDeleteModal] = useState(false);
  const [variableToDelete, setVariableToDelete] = useState(null);
  const [isDeletingVariable, setIsDeletingVariable] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    value: "",
  });

  // Fetch project
  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/projects/${id}`);

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch project"
          );
        }

        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  // Fetch environment variables
  useEffect(() => {
    async function fetchVariables() {
      setVariableLoading(true);
      setVariableError(null);

      try {
        const response = await fetch(
          `/api/projects/${id}/variables`
        );

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch environment variables"
          );
        }

        setVariables(data.variables || []);
      } catch (error) {
        console.error(
          "Error fetching environment variables:",
          error
        );

        setVariableError(error.message);
      } finally {
        setVariableLoading(false);
      }
    }

    if (id) {
      fetchVariables();
    }
  }, [id, router]);

  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/projects/${id}/variables`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add environment variable"
        );
      }

      // Refresh the variables list
      setVariables((prevVariables) => [
        ...prevVariables,
        data.variable,
      ]);

      // Reset form and close modal
      setFormData({ key: "", value: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error adding environment variable:",
        error
      );
    }
  };

  const handleDeleteVariable = async () => {
    if (!variableToDelete) {
      return;
    }

    setIsDeletingVariable(true);

    try {
      const response = await fetch(
        `/api/projects/${id}/variables/${variableToDelete.id}`,
        { method: "DELETE" }
      );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete variable");
      }

      setVariables((previousVariables) =>
        previousVariables.filter(
          (variable) => variable.id !== variableToDelete.id
        )
      );
      setVariableDeleteModal(false);
      setVariableToDelete(null);
    } catch (error) {
      console.error("Error deleting environment variable:", error);
    } finally {
      setIsDeletingVariable(false);
    }
  };

  // Render
  return (
    <main className="min-h-screen bg-[#0e0e10] py-10 text-[#e4e2e4] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

        {/* EnVault Header */}
        <div>
          <div className="mb-1 flex items-center gap-1 font-mono text-xs tracking-wider text-purple-400">
            <span>EnVault</span>
          </div>

          {/* Project Header Card */}
          <div className="mt-2 flex w-full flex-col gap-6 rounded-lg bg-surface-container p-5 shadow-md md:flex-row md:items-center md:justify-between">

            {/* Project Details */}

            {loading ? (
              /* Project Skeleton */
              <div className="animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-48 rounded bg-gray-700" />
                  <div className="h-5 w-12 rounded bg-gray-700" />
                </div>

                <div className="mt-3 h-4 w-72 rounded bg-gray-700" />

                <div className="mt-3 h-3 w-32 rounded bg-gray-700" />
              </div>
            ) : error ? (
              /* Project Error */
              <div>
                <h1 className="text-lg font-semibold text-red-400">
                  Failed to load project
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {error}
                </p>
              </div>
            ) : (
              /* Project Details */
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {project.name}
                  </h1>

                  <span className="rounded-md bg-purple-500/10 px-2 py-1 font-mono text-xs text-purple-400">
                    {project.version}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#ccc3d8]">
                  {project.description ||
                    "No description provided."}
                </p>

                {project.category && (
                  <p className="mt-2 text-xs text-gray-500">
                    Category: {project.category.name}
                  </p>
                )}
              </div>
            )}

            {/* Quick Actions */}
            {!loading && !error && (
              <div className="flex shrink-0 items-center gap-2">

                {/* Export */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  <Download size={16} />
                  export
                </button>

                {/* Edit */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  <Pencil size={16} />
                  edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            )}
          </div>

          {/* Project Metadata */}
          {!loading && !error && project && (
            <div className="flex gap-4 pt-2 text-xs text-gray-500">

              <div className="flex gap-1">
                <h3 className="text-primary">
                  created_at:
                </h3>

                <span>
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-1">
                <h3 className="text-primary">
                  updated_at:
                </h3>

                <span>
                  {new Date(
                    project.updatedAt
                  ).toLocaleDateString()}
                </span>
              </div>

            </div>
          )}
        </div>

        {/* Environment Variables */}
        <div className="flex flex-col gap-4">

          {/* Section Header */}

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold tracking-tight">
              Environment Variables
            </h2>

            <button
              type="button"
              className="flex items-center gap-2 rounded-md bg-purple-500/10 px-3 py-2 text-sm text-purple-400 transition hover:bg-purple-500/20 hover:text-purple-300"
              onClick={() => {setIsModalOpen(true);}}
            >
              <Plus size={16} />
              add_variable
            </button>

          </div>

          <VariableTable
            variables={variables}
            loading={variableLoading}
            error={variableError}
            visibleVariableId={visibleVariableId}
            onDelete={(variable) => {
              setVariableToDelete(variable);
              setVariableDeleteModal(true);
            }}
            onToggleVisibility={(variableId) => {
              setVisibleVariableId(
                visibleVariableId === variableId ? null : variableId
              );
            }}
          />
          {variableDeleteModal && variableToDelete && (
            <DeleteConfirmDialog
              itemName={variableToDelete.key}
              onClose={() => {
                if (!isDeletingVariable) {
                  setVariableDeleteModal(false);
                  setVariableToDelete(null);
                }
              }}
              onConfirm={handleDeleteVariable}
              isDeleting={isDeletingVariable}
            />
          )}
           {isModalOpen && (
          <VariableModal
            formData={formData}
            onChange={onChange}
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
          />
        )}
        </div>
      </div>
    </main>
  );
}
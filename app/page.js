"use client";

import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ProjectModal from "@/components/dashboard/ProjectModal";
import { useEffect, useState } from "react";
import {
  Grid2X2,
  FolderOpen,
  Key,
  Shield,
  Search,
  Rows3
} from "lucide-react"
import { useRouter } from "next/navigation";

function mapProject(project) {
  return {
    ...project,
    environment: project.version,
    category: project.category?.name?.toLowerCase(),
    label: project.category?.name || "Uncategorized",
    tech: project.version || "No technology specified",
    variables: project.variables?.length ?? 0,
    updated: `Updated ${new Date(project.updatedAt).toLocaleDateString()}`,
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    techStack: "",
    description: "",
    categoryId: "",
  });

  const filters = [
    { label: "All", value: "all" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.name.toLowerCase(),
    })),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data.projects.map(mapProject));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("project-search")?.focus();
      }

      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/category");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  function handleFormChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleCreateProject(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: formData.name,
          version: formData.techStack || "Not specified",
          description: formData.description,
          categoryId: formData.categoryId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      setProjects((previous) => [mapProject(data.project), ...previous]);
      setFormData({ name: "", techStack: "", description: "", categoryId: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#0e0e10] py-10 text-[#e4e2e4] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

        {/* Dashboard Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1 flex items-center gap-1 font-mono text-xs tracking-wider text-purple-400">
              <span>EnVault</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              dashboard
            </h1>

            <p className="mt-1 text-sm text-[#ccc3d8]">
              Manage your projects and environment variables.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-600"
          >
            <span className="material-symbols-outlined text-base">
              add_new_project
            </span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="total_projects"
            value={projects.length}
            icon={FolderOpen}
            iconColor="text-purple-400"
          />

          <StatCard
            title="total_secrets"
            value="48"
            suffix="active"
            suffixColor="text-green-400"
            icon={Key}
            iconColor="text-green-400"
          />

          <StatCard
            title="vault_status"
            value="Encrypted & Synced"
            icon={Shield}
            iconColor="text-[#ccc3d8]"
            status
          />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-[#1b1b1d] p-3 md:flex-row md:items-center">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#958da1]">
              <Search size={18} />
            </span>

            <input
              id="project-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-lg bg-[#1f1f21] py-2 pl-10 pr-14 text-sm text-[#e4e2e4] outline-none placeholder:text-[#958da1]/60 focus:ring-1 focus:ring-purple-400"
            />

            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-[#2a2a2c] px-1.5 py-0.5 font-mono text-[11px] text-[#ccc3d8]">
              Ctrl+K
            </kbd>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center gap-1 rounded-lg bg-[#1f1f21] p-1">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedCategory(filter.value)}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    selectedCategory === filter.value
                      ? "bg-[#353437] text-[#e4e2e4]"
                      : "text-[#958da1] hover:text-[#e4e2e4]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-[#1f1f21] p-1">
              <button className="rounded bg-[#353437] p-1.5 text-[#e4e2e4]">
                <span className="material-symbols-outlined block text-lg">
                  <Grid2X2 size={18}/>
                </span>
              </button>

              <button className="rounded p-1.5 text-[#958da1] hover:text-[#e4e2e4]">
                <span className="material-symbols-outlined block text-lg">
                  <Rows3 size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => router.push(`/${project.id}`)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-xl bg-[#1b1b1d] py-16 text-center text-sm text-[#958da1]">
            No projects found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProjectModal
          formData={formData}
          categories={categories}
          onChange={handleFormChange}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </main>
  );
}

import CategoryPicker from "@/components/CategoryPicker";
import { X } from "lucide-react";

export default function ProjectModal({
  formData,
  categories,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-xl bg-[#1f1f21] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Create New Project
            </h3>

            <p className="mt-1 text-sm text-[#958da1]">
              Initialize a safe workspace for secrets and deployments.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#958da1] hover:bg-[#2a2a2c] hover:text-[#e4e2e4]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" htmlFor="project-name">
              Project Name
            </label>

            <input
              id="project-name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g. Payment-Gateway"
              required
              className="rounded-lg bg-[#1b1b1d] px-3 py-2 text-sm outline-none placeholder:text-[#958da1]/50 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" htmlFor="tech-stack">
              Framework / Tech
            </label>

            <input
              id="tech-stack"
              name="techStack"
              value={formData.techStack}
              onChange={onChange}
              placeholder="e.g. Node.js, Redis, Docker"
              className="rounded-lg bg-[#1b1b1d] px-3 py-2 text-sm outline-none placeholder:text-[#958da1]/50 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="e.g. Core billing and payment dispatch microservice"
              rows={3}
              className="resize-none rounded-lg bg-[#1b1b1d] p-3 text-sm outline-none placeholder:text-[#958da1]/50 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <CategoryPicker
            categories={categories}
            selectedCategoryId={formData.categoryId}
            onSelect={(categoryId) =>
              onChange({
                target: {
                  name: "categoryId",
                  value: categoryId,
                },
              })
            }
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-[#958da1] transition hover:bg-[#2a2a2c] hover:text-[#e4e2e4]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-600"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
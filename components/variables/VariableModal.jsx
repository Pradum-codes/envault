import { X } from "lucide-react";

export default function VariableModal({
  formData,
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
              Add New Variable
            </h3>
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
              key
            </label>

            <input
              id="project-name"
              name="key"
              value={formData.key}
              onChange={onChange}
              placeholder="e.g. DATABASE_URL, API_KEY, SECRET_KEY"
              required
              className="rounded-lg bg-[#1b1b1d] px-3 py-2 text-sm outline-none placeholder:text-[#958da1]/50 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" htmlFor="tech-stack">
              value
            </label>

            <input
              id="tech-stack"
              name="value"
              value={formData.value}
              onChange={onChange}
              placeholder="e.g. my-secret-key, my-api-key, my-database-url"
              className="rounded-lg bg-[#1b1b1d] px-3 py-2 text-sm outline-none placeholder:text-[#958da1]/50 focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-[#958da1] transition hover:bg-[#2a2a2c] hover:text-[#e4e2e4]"
            >
              cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-600"
            >
              add_variable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
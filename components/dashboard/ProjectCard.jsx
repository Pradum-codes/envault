import { FolderRoot, Lock } from "lucide-react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div onClick={onClick} className="group flex cursor-pointer flex-col justify-between rounded-xl bg-[#1b1b1d] p-4 transition-colors hover:bg-[#1f1f21]">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a2a2c]">
              <FolderRoot size={18} />
            </div>

            <div>
              <h2 className="text-sm font-medium transition-colors group-hover:text-purple-400">
                {project.name}
              </h2>

              <span className="font-mono text-xs text-[#958da1]">
                {project.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-[#2a2a2c] px-2 py-1 text-[10px] uppercase text-[#958da1]">
              {project.version}
            </span>
          </div>
        </div>

        <p className="truncate font-mono text-xs text-[#958da1]">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="-mx-4 -mb-4 mt-4 flex items-center justify-between rounded-b-xl bg-[#0e0e10]/40 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#958da1]">
          <Lock size={14} className="text-[#958da1]" />

          <span className="font-medium text-[#e4e2e4]">
            {project.variables} variables
          </span>
        </div>

        <span className="text-[10px] text-[#958da1]">
          {project.updated}
        </span>
      </div>
    </div>
  );
}
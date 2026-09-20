import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";

export default function VariableTable({
  variables,
  loading,
  error,
  visibleVariableId,
  onToggleVisibility,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full table-fixed text-left text-sm text-gray-300">
        <thead className="bg-surface-container">
          <tr>
            <th className="w-[30%] px-4 py-3">key</th>
            <th className="w-[50%] px-4 py-3">value</th>
            <th className="w-[20%] px-4 py-3">actions</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <>
              <LoadingRow keyWidth="w-32" valueWidth="w-48" />
              <LoadingRow keyWidth="w-24" valueWidth="w-40" />
              <LoadingRow keyWidth="w-28" valueWidth="w-56" />
            </>
          )}

          {!loading && error && (
            <tr>
              <td colSpan="3" className="px-4 py-8 text-center">
                <p className="text-sm text-red-400">
                  Failed to load environment variables.
                </p>
                <p className="mt-1 text-xs text-gray-500">{error}</p>
              </td>
            </tr>
          )}

          {!loading && !error && variables.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-10 text-center">
                <p className="text-sm text-gray-500">
                  No environment variables found.
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Add a variable to get started.
                </p>
              </td>
            </tr>
          )}

          {!loading && !error && variables.length > 0 &&
            variables.map((variable) => (
              <tr
                key={variable.id}
                className="border-t border-white/10 transition hover:bg-white/2"
              >
                <td className="px-4 py-3 font-mono text-sm">
                  {variable.key}
                </td>

                <td className="max-w-0 px-4 py-3 font-mono text-sm text-gray-400">
                  <span className="block truncate">
                    {visibleVariableId === variable.id
                      ? variable.value
                      : "••••••••••••"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Edit variable"
                      className="rounded-md bg-purple-500/10 p-2 text-purple-400 transition hover:bg-purple-500/20 hover:text-purple-300"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      type="button"
                      title="Delete variable"
                      onClick={() => onDelete(variable)}
                      className="rounded-md bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      type="button"
                      title={
                        visibleVariableId === variable.id
                          ? "Hide variable"
                          : "View variable"
                      }
                      onClick={() => onToggleVisibility(variable.id)}
                      className="rounded-md bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300"
                    >
                      {visibleVariableId === variable.id ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingRow({ keyWidth, valueWidth }) {
  return (
    <tr className="animate-pulse border-t border-white/10">
      <td className="px-4 py-3">
        <div className={`h-4 ${keyWidth} rounded bg-gray-700`} />
      </td>
      <td className="px-4 py-3">
        <div className={`h-4 ${valueWidth} rounded bg-gray-700`} />
      </td>
      <td className="px-4 py-3">
        <div className="h-7 w-24 rounded bg-gray-700" />
      </td>
    </tr>
  );
}

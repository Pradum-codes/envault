"use client";

import { useState } from "react";
import { projectIcons } from "./projectIcons";

export default function CategoryPicker({
  categories = [],
  selectedCategoryId,
  onSelect,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-[#e4e2e4]">
        Project Category
      </label>

      <div className="grid grid-cols-4 gap-2 rounded-lg bg-[#1b1b1d] p-3">
        {categories.map((category) => {
          const Icon =
            projectIcons.find((item) => item.name === category.icon)?.icon;

          const isSelected = selectedCategoryId === category.id;

          return (
            <div key={category.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`flex h-16 w-full flex-col items-center justify-center gap-1 rounded-lg transition ${
                  isSelected
                    ? "bg-purple-600 text-white ring-2 ring-purple-400"
                    : "text-[#958da1] hover:bg-[#353437] hover:text-[#e4e2e4]"
                }`}
                aria-label={`Select ${category.name} category`}
              >
                {Icon ? <Icon size={18} strokeWidth={1.8} /> : null}

                <span className="max-w-full truncate px-1 text-[10px]">
                  {category.name}
                </span>
              </button>

              {hoveredCategory === category.id && (
                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#353437] px-2 py-1 text-[11px] text-[#e4e2e4] shadow-lg">
                  {category.name}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {categories.length === 0 && (
        <p className="text-xs text-[#958da1]">
          No categories available.
        </p>
      )}
    </div>
  );
}
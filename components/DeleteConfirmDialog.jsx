"use client";

import { X } from "lucide-react";

export default function DeleteConfirmDialog({
    itemName = "this item",
    onClose,
    onConfirm,
    isDeleting = false,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="presentation"
            onClick={(event) => {
                if (event.target === event.currentTarget && !isDeleting) {
                    onClose();
                }
            }}
        >
            <div
                className="flex w-full max-w-lg flex-col gap-6 rounded-xl bg-[#1f1f21] p-6 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-dialog-title"
            >
                <div className="flex items-start justify-between">
                    <h3
                        id="delete-dialog-title"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Confirm Deletion
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        aria-label="Close delete confirmation"
                        className="rounded-lg p-1 text-[#958da1] hover:bg-[#2a2a2c] hover:text-[#e4e2e4] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <p className="text-sm text-gray-400">
                    Are you sure you want to delete <strong>{itemName}</strong>? This
                    action cannot be undone.
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg bg-[#353437] px-4 py-2 text-sm font-medium text-[#e4e2e4] transition hover:bg-[#2a2a2c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "deleting..." : "delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
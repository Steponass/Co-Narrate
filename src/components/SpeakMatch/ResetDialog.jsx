import React, { forwardRef } from "react";

const ResetDialog = forwardRef(function ResetDialog(
  {
    open,
    onCancel,
    onConfirm,
  },
  ref
) {
  return (
    <dialog
      ref={ref}
      open={open}
      className="fixed inset-0 w-11/12 max-w-xs m-auto p-4 bg-neutral-50 dark:bg-gray-800 rounded-lg shadow-2xl sm:p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Confirm Reset
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        This will clear all matched phrases and stop the microphone</p>
      <div className="flex justify-between gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-700 text-white transition-colors hover:bg-red-600"
        >
          Reset All Phrases
        </button>
      </div>
    </dialog>
  );
});

export default ResetDialog;

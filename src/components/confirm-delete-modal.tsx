import { AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";


interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Delete Record",
  description = "Are you absolutely sure you want to delete this record? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Darkened Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Card content wrapper */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Corner Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors disabled:opacity-50">
          <X className="size-4" />
        </button>

        {/* Warning Header Layout */}
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Control Actions Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={onClose}>
            <span>Cancel</span>
          </Button>

          <Button
            type="button"
            variant="destructive"
            isLoading={isLoading}
            onClick={onConfirm}>
            <span>Delete Permanently</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isDarkMode?: boolean;
  prompt?: string;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  /** Disable closing by clicking backdrop / ESC (optional) */
  disableDismiss?: boolean;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDarkMode = false,
  prompt = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  title = "Confirm Deletion",
  disableDismiss = false,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  // Lock scroll & manage focus when open
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => cancelBtnRef.current?.focus(), 0);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen]);

  // Handle ESC to close
  useEffect(() => {
    if (!isOpen || disableDismiss) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Simple focus trap: loop focus within modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, disableDismiss]);

  if (!isOpen) return null;

  const bg = isDarkMode
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-gray-900";
  const border = isDarkMode ? "border-gray-700" : "border-gray-200";
  const muted = isDarkMode ? "text-gray-300" : "text-gray-600";

  const handleBackdrop = () => {
    if (!disableDismiss) onClose();
  };

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await onConfirm();
      // Usually parent closes after success; if not, we close here:
      // onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-labelledby="confirm-delete-title"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-black/60" : "bg-black/40"
        } backdrop-blur-sm`}
        onClick={handleBackdrop}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={`relative mx-4 w-full max-w-md rounded-2xl border ${border} ${bg} shadow-2xl`}
      >
        <div className="p-6">
          <h3 id="confirm-delete-title" className="text-xl font-semibold">
            {title}
          </h3>

          <p className={`mt-3 text-sm ${muted}`}>{prompt}</p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              ref={cancelBtnRef}
              type="button"
              disabled={submitting}
              onClick={onClose}
              className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ring-1 transition
                ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100 ring-gray-600 hover:bg-gray-600"
                    : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-100"
                }`}
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={submitting}
              className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition
                ${
                  isDarkMode
                    ? "bg-red-600 text-white ring-red-500 hover:bg-red-500"
                    : "bg-red-600 text-white ring-red-600 hover:bg-red-500"
                }
                disabled:opacity-60 disabled:cursor-not-allowed`}
              aria-busy={submitting}
            >
              {submitting ? "Deleting…" : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render via portal (if document.body exists)
  const mountNode = typeof document !== "undefined" ? document.body : null;
  return mountNode ? createPortal(modal, mountNode) : modal;
};

export default ConfirmDeleteModal;

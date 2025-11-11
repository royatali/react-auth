import {
  HiOutlineUserCircle,
  HiOutlineClipboardCopy,
  HiCheck,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useDarkMode } from "../../hooks/useDarKMode";

type ProfileNotFoundProps = {
  profileId: string;
};

const ProfileNotFound = ({ profileId }: ProfileNotFoundProps) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useDarkMode();

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(profileId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const pageBg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50";
  const textMain = isDarkMode ? "text-gray-100" : "text-gray-900";
  const textSub = isDarkMode ? "text-gray-300" : "text-gray-700";

  return (
    <MainLayout title="Profile Not Found">
      <div
        className={`${pageBg} transition-colors min-h-[80vh] flex flex-col items-center justify-center px-4`}
      >
        <div
          className={`w-full max-w-xl rounded-2xl border shadow-sm p-8 text-center transition-colors
            ${
              isDarkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-200"
            }`}
        >
          {/* Icon */}
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
              ${
                isDarkMode
                  ? "bg-indigo-900/30 text-indigo-300"
                  : "bg-indigo-50 text-indigo-600"
              }`}
          >
            <HiOutlineUserCircle className="h-10 w-10" />
          </div>

          {/* Heading & Subtext */}
          <h1 className="text-2xl font-bold mb-2">
            We couldn’t find that profile
          </h1>
          <p className={`text-sm mb-4 ${textSub}`}>
            The requested profile with ID{" "}
            <span className="font-mono text-xs break-all">{profileId}</span> was
            not found.
          </p>

          {/* Copy button */}
          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2
              ${
                isDarkMode
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-gray-50 text-gray-800 border-gray-200"
              }`}
          >
            <code className="font-mono text-xs sm:text-sm">{profileId}</code>
            <button
              type="button"
              onClick={copyId}
              className={`ml-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium border transition
                ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              aria-label="Copy profile id"
              title="Copy profile id"
            >
              {copied ? (
                <HiCheck className="h-4 w-4" />
              ) : (
                <HiOutlineClipboardCopy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(0)}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-2.5
                         text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500
                         active:scale-[.99] transition"
            >
              Retry
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-2.5
                         text-sm font-semibold ring-1 transition
                         ${
                           isDarkMode
                             ? "bg-gray-700 text-gray-100 ring-gray-600 hover:bg-gray-600"
                             : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-100"
                         }`}
            >
              Go Back
            </button>

            <Link
              to="/dashboard"
              className={`inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-2.5
                         text-sm font-semibold ring-1 transition
                         ${
                           isDarkMode
                             ? "bg-gray-700 text-gray-100 ring-gray-600 hover:bg-gray-600"
                             : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-100"
                         }`}
            >
              Home
            </Link>
          </div>

          {/* Help text */}
          <p className={`mt-4 text-xs ${textSub}`}>
            If this keeps happening, contact support with the ID above.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileNotFound;

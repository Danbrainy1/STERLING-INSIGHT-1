import { useState, type FormEvent } from "react";
import { X, Upload, CheckCircle2, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";

import { type ResearchCategory, type AcademicLevel } from "@/data/research-data";

interface PublishResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublishResearchModal({ isOpen, onClose }: PublishResearchModalProps) {
  const { isAuthenticated, addPublishedProject } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ResearchCategory>("Artificial Intelligence");
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>("Masters Thesis");
  const [price, setPrice] = useState("25");
  const [abstract, setAbstract] = useState("");
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Sign in required", {
        description: "Please sign in or register to publish your research work.",
      });
      navigate({ to: "/auth" });
      onClose();
      return;
    }

    if (!fileSelected) {
      toast.error("Please upload a document file (PDF or DOCX).");
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      addPublishedProject({
        title,
        category,
        academicLevel,
        price: parseFloat(price) || 0,
        abstract,
      });
      setIsPublishing(false);
      setIsSuccess(true);
      toast.success("Research project published successfully!", {
        description: "Your work is now indexed in the Sterling Research Hub.",
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-border bg-card text-card-foreground">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-2xl font-bold font-display">Published to Repository!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your research paper <strong className="text-foreground">"{title}"</strong> is now live
              on the marketplace. You will earn 80% royalties on every download.
            </p>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate({ to: "/dashboard" });
                }}
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Go to My Published Works
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pb-4 border-b border-border/60">
              <h3 className="text-xl font-bold font-display">Publish Your Research Work</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Upload your thesis, dissertation, journal article, or dataset. Set your own price
                and keep 80% of sales.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assessment of Deep Learning Models in Financial Fraud Detection"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ResearchCategory)}
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Medicine & Health">Medicine & Health</option>
                    <option value="Economics & Finance">Economics & Finance</option>
                    <option value="Environment & Climate">Environment & Climate</option>
                    <option value="Education & Social Sciences">Education & Social Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Academic Level
                  </label>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value as AcademicLevel)}
                    className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    <option value="Undergraduate">Undergraduate Project</option>
                    <option value="Masters Thesis">Masters Thesis</option>
                    <option value="PhD Dissertation">PhD Dissertation</option>
                    <option value="Dataset">Dataset</option>
                    <option value="Questionnaire & Template">Questionnaire & Template</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Listing Price (USD) - Set 0 for Free Access
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-xl border border-input bg-secondary/50 pl-8 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Abstract / Executive Summary
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide a concise summary of research objectives, methodologies, and findings..."
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full rounded-xl border border-input bg-secondary/50 px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {/* Upload Drop Area */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Upload Document / Dataset Package
                </label>
                <div
                  onClick={() => setFileSelected("Research_Project_Final_Manuscript.pdf")}
                  className={`cursor-pointer border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                    fileSelected
                      ? "border-emerald-500/80 bg-emerald-500/10"
                      : "border-border hover:border-primary bg-secondary/30"
                  }`}
                >
                  <Upload className="mx-auto size-6 text-muted-foreground mb-1" />
                  {fileSelected ? (
                    <div>
                      <p className="text-xs font-semibold text-emerald-500">
                        ✓ File Attached: {fileSelected}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Click to replace file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Click to upload PDF, DOCX, or ZIP dataset
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Max file size 50MB · Encrypted & Watermarked
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPublishing}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_30px_-6px_var(--color-cobalt-glow)] disabled:opacity-60"
              >
                {isPublishing
                  ? "Submitting Work to Plagiarism Check & Indexing…"
                  : "Publish Research Work"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import {
  X,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Upload,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { formatMoney } from "@/lib/currency";
import type { HiredProject, ProjectFile } from "@/types";

interface ProjectWorkspaceModalProps {
  project: HiredProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectWorkspaceModal({ project, isOpen, onClose }: ProjectWorkspaceModalProps) {
  const { user, sendProjectMessage, releaseMilestone, uploadProjectFile, activeCurrency } =
    useAuth();

  const [activeTab, setActiveTab] = useState<"chat" | "milestones" | "files">("chat");
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [project?.messages, activeTab]);

  if (!isOpen || !project) return null;

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const text = messageInput.trim();
    setMessageInput("");
    setIsSending(true);

    await sendProjectMessage(project.id, text);
    setIsSending(false);
  };

  const handleReleaseMilestone = async (milestoneId: string, title: string, amount: number) => {
    const ok = await releaseMilestone(project.id, milestoneId);
    if (ok) {
      toast.success(
        `Payment of ${formatMoney(amount, activeCurrency)} released to ${project.expertName}!`,
        {
          description: `Milestone "${title}" marked completed and settled.`,
        },
      );
    } else {
      toast.error("Failed to release payment.");
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);

    await uploadProjectFile(project.id, {
      name: file.name,
      size: `${sizeMB} MB`,
      uploadedBy: "client",
      uploaderName: user?.name || "Dr. Alexander Sterling",
      type: file.type || "Document",
    });

    // Also send an automated notification in the chat
    await sendProjectMessage(
      project.id,
      `📎 Uploaded new study asset: "${file.name}" (${sizeMB} MB). Please review and incorporate into our milestones.`,
    );

    setIsUploading(false);
    toast.success(`File "${file.name}" uploaded to project room!`);
  };

  const handleDownloadDeliverable = (f: ProjectFile) => {
    const content = `STERLING INSIGHT ACADEMIC DELIVERABLE
Project ID: ${project.id}
Project Title: ${project.title}
Deliverable Name: ${f.name}
Uploaded By: ${f.uploaderName} (${f.uploadedBy})
Date: ${new Date(f.uploadedAt).toLocaleString()}
Integrity: Verified by Sterling Insight Advisory Network

=======================================================
CONTENT EXCERPT & STATISTICAL OUTPUT:
- Statistical analysis performed using verified methodological guidelines.
- Multicollinearity and normality tests passed within academic thresholds.
- Full script output and documentation attached.
=======================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = f.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded: ${f.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel relative w-full max-w-4xl h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-border bg-card text-card-foreground">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between gap-4 bg-secondary/30">
          <div className="flex items-center gap-3.5">
            <img
              src={project.expertAvatar}
              alt={project.expertName}
              className="size-12 rounded-2xl object-cover border-2 border-primary/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display">{project.expertName}</h3>
                <span className="rounded-full bg-emerald-500/15 text-emerald-500 px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Workspace
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {project.expertRole} ·{" "}
                <span className="text-foreground font-medium">{project.title}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right pr-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                Escrow Budget
              </span>
              <span className="text-sm font-bold font-display text-emerald-500">
                {formatMoney(project.totalBudget, activeCurrency)}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border/60 px-4 sm:px-6 py-2.5 bg-background/50">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "chat"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            💬 Live Messaging & Discussion ({project.messages.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("milestones")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "milestones"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            📋 Milestones & Escrow Release ({project.milestones.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("files")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "files"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            📁 Shared Files & Datasets ({project.files.length})
          </button>
        </div>

        {/* TAB 1: LIVE CHAT */}
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col min-h-0 bg-background/30">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3 text-center text-xs text-muted-foreground max-w-lg mx-auto">
                <ShieldCheck className="size-4 text-primary inline mr-1" />
                This consultation is protected by NDA and end-to-end academic integrity standards.
                Discuss research questions, request revisions, and verify outputs directly with your
                hired advisor.
              </div>

              {project.messages.map((msg) => {
                const isMe = msg.sender === "client";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 max-w-[85%] sm:max-w-[75%] ${
                      isMe ? "ml-auto flex-row-reverse" : ""
                    }`}
                  >
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="size-8 rounded-xl object-cover border border-border mt-0.5 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 ${isMe ? "justify-end" : ""}`}>
                        <span className="text-[11px] font-semibold text-foreground">
                          {isMe ? "You" : msg.senderName}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div
                        className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                          isMe
                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
                            : "bg-secondary/60 text-foreground border border-border/80 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 border-t border-border/60 bg-card"
            >
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".sav,.csv,.xlsx,.docx,.doc,.pdf,.py,.r"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  title="Upload dataset or chapter file"
                  className="p-2.5 rounded-xl border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <Paperclip className="size-4" />
                </button>
                <input
                  type="text"
                  placeholder={`Send a message to ${project.expertName}... (Press Enter)`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 rounded-xl border border-input bg-secondary/50 px-4 py-2.5 text-xs outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={isSending || !messageInput.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="size-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MILESTONES & ESCROW */}
        {activeTab === "milestones" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold font-display">
                  Project Milestones & Escrow Settlement
                </h4>
                <p className="text-xs text-muted-foreground">
                  Funds remain safely secured in escrow. Release payment to {project.expertName}{" "}
                  only after you inspect and approve each deliverable.
                </p>
              </div>
              <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-500">
                Total Escrow: {formatMoney(project.totalBudget, activeCurrency)}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {project.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-border/80 bg-secondary/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-muted-foreground">
                        0{idx + 1}
                      </span>
                      <h5 className="text-sm font-semibold text-foreground">{m.title}</h5>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.status === "Released"
                            ? "bg-emerald-500/20 text-emerald-500"
                            : m.status === "Delivered"
                              ? "bg-blue-500/20 text-blue-500 animate-pulse"
                              : m.status === "In Progress"
                                ? "bg-amber-500/20 text-amber-500"
                                : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xl">{m.description}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-foreground block">
                        {formatMoney(m.amount, activeCurrency)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">Escrow Amount</span>
                    </div>

                    {m.status === "Released" ? (
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 px-3 py-2 bg-emerald-500/10 rounded-xl">
                        <Check className="size-4" />
                        Settled & Paid
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReleaseMilestone(m.id, m.title, m.amount)}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="size-3.5" />
                        Approve & Release Payment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FILES & DATASETS */}
        {activeTab === "files" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold font-display">Shared Datasets & Deliverables</h4>
                <p className="text-xs text-muted-foreground">
                  Exchange SPSS files, Python/R scripts, thesis manuscripts, and summary tables.
                </p>
              </div>

              <input
                type="file"
                id="workspace-file-upload"
                onChange={handleFileUpload}
                className="hidden"
                accept=".sav,.csv,.xlsx,.docx,.doc,.pdf,.py,.r"
              />
              <label
                htmlFor="workspace-file-upload"
                className="cursor-pointer flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                <Upload className="size-3.5" />
                Upload Dataset or Document
              </label>
            </div>

            <div className="space-y-3">
              {project.files.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl p-6">
                  <FileText className="size-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">No files uploaded yet.</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Upload your raw survey data or study draft to begin collaborating with{" "}
                    {project.expertName}.
                  </p>
                </div>
              ) : (
                project.files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-secondary/30 p-3.5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{f.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {f.size} · Uploaded by{" "}
                          <strong className="text-foreground">{f.uploaderName}</strong> (
                          {f.uploadedBy}) · {new Date(f.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadDeliverable(f)}
                      className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 transition-colors"
                    >
                      <Download className="size-3.5 text-primary" />
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

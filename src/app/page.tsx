"use client";

import { useMemo, useState } from "react";
import {
  RELEASE,
  SPRINTS,
  OUT_OF_SCOPE,
  MEETINGS,
  computeStats,
  computeSprintStats,
  type Sprint,
  type Task,
  type TaskStatus,
  type OutOfScopeItem,
  type OosCategory,
  type SprintUpdate,
  type UpdateKind,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_META: Record<TaskStatus, { label: string; color: string; dot: string }> = {
  done: { label: "Done", color: "text-emerald-400", dot: "bg-emerald-500" },
  in_progress: { label: "In progress", color: "text-orange-400", dot: "bg-orange-500" },
  pending: { label: "Pending", color: "text-zinc-400", dot: "bg-zinc-500" },
  blocked: { label: "Blocked", color: "text-red-400", dot: "bg-red-500" },
  review: { label: "Review", color: "text-violet-400", dot: "bg-violet-500" },
};

const PRIORITY_META: Record<string, { label: string; cls: string }> = {
  P0: { label: "P0", cls: "bg-red-500/15 text-red-300 border-red-500/30" },
  P1: { label: "P1", cls: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  P2: { label: "P2", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  TD: { label: "TD", cls: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  L: { label: "L", cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" },
  B: { label: "✓", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

const CATEGORY_META: Record<OosCategory, { label: string; cls: string }> = {
  ui: { label: "UI", cls: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  ux: { label: "UX", cls: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  feature: { label: "FEATURE", cls: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  cosmetic: { label: "COSMETIC", cls: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30" },
  removal: { label: "REMOVAL", cls: "bg-red-500/15 text-red-300 border-red-500/30" },
};

const UPDATE_META: Record<UpdateKind, { icon: string; color: string }> = {
  milestone: { icon: "🏁", color: "text-cyan-400" },
  decision: { icon: "💡", color: "text-violet-400" },
  blocker: { icon: "🚧", color: "text-red-400" },
  qa: { icon: "✅", color: "text-emerald-400" },
  deploy: { icon: "🚀", color: "text-blue-400" },
  info: { icon: "·", color: "text-zinc-400" },
};

export default function Dashboard() {
  const stats = useMemo(() => computeStats(SPRINTS), []);
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(new Set(["S0", "S1"]));
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [collapseAll, setCollapseAll] = useState(false);
  const [oosItems, setOosItems] = useState<OutOfScopeItem[]>(OUT_OF_SCOPE);
  const [oosDraft, setOosDraft] = useState("");

  const toggleSprint = (id: string) => {
    setExpandedSprints((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTask = (id: string) => {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCollapseAll = () => {
    setExpandedSprints(new Set());
    setCollapseAll(true);
  };

  const handleExpandAll = () => {
    setExpandedSprints(new Set(SPRINTS.map((s) => s.id)));
    setCollapseAll(false);
  };

  const addOos = () => {
    const text = oosDraft.trim();
    if (!text) return;
    const item: OutOfScopeItem = {
      id: `OOS-${oosItems.length + 1}`,
      title: text,
      source: "manual",
      raisedAt: new Date().toISOString().slice(0, 10),
      status: "pending_estimate",
    };
    setOosItems([item, ...oosItems]);
    setOosDraft("");
  };

  const updateOosEstimate = (id: string, value: string) => {
    const usd = value === "" ? undefined : Number(value);
    setOosItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, estimateUsd: usd, status: usd ? "estimated" : "pending_estimate" } : it))
    );
  };

  const totalOosUsd = oosItems.reduce((acc, it) => acc + (it.estimateUsd ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="size-9 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">E</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">
                    {RELEASE.product} <span className="text-cyan-400">{RELEASE.version}</span>
                  </h1>
                  <p className="text-xs text-zinc-500 font-mono">
                    Source: {RELEASE.source} · baseline {RELEASE.baselineVersion} · {RELEASE.repo}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCollapseAll}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition"
              >
                Collapse all
              </button>
              <button
                onClick={handleExpandAll}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition"
              >
                Expand all
              </button>
            </div>
          </div>

          {/* Progress strip */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
              <span>
                <span className="text-zinc-100 font-semibold text-base">{stats.percent}%</span> complete
              </span>
              <span>
                {stats.done} done · {stats.inProgress} in progress · {stats.pending} pending · {stats.total} total
              </span>
            </div>
            <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-[var(--border)]">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Body — 2 column layout */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Sprints column */}
        <main className="space-y-3">
          {SPRINTS.map((sprint) => (
            <SprintCard
              key={sprint.id}
              sprint={sprint}
              expanded={expandedSprints.has(sprint.id)}
              onToggle={() => toggleSprint(sprint.id)}
              expandedTasks={expandedTasks}
              onTaskToggle={toggleTask}
            />
          ))}
        </main>

        {/* Out-of-scope sidebar */}
        <aside className="space-y-3 lg:sticky lg:top-32 self-start">
          {/* Sessions card */}
          {MEETINGS.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-sm">📹 Sessions</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Транскрипты разборов</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{MEETINGS.length}</span>
              </div>

              <ul className="space-y-2">
                {MEETINGS.map((m) => {
                  const items = oosItems.filter((it) => it.meetingId === m.id);
                  const inTz = 0; // computed: пока все 7 = вне ТЗ
                  const outTz = items.length;
                  return (
                    <li key={m.id} className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5">
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="text-[11px] font-mono text-zinc-300">{m.id}</span>
                        <span className="text-[10px] text-zinc-500">{m.date}</span>
                      </div>
                      <p className="text-xs font-medium leading-snug mb-1">{m.title}</p>
                      <p className="text-[10px] text-zinc-500 mb-2">{m.participants.join(" · ")}</p>
                      <div className="flex gap-1.5 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {inTz} in ТЗ
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {outTz} out-of-ТЗ
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Out-of-scope card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold text-sm">⚠ Out-of-scope</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {oosItems.length} запрос{oosItems.length === 1 ? "" : oosItems.length < 5 ? "а" : "ов"} вне ТЗ
                </p>
              </div>
              <div className="text-right">
                <div className="text-base font-mono font-semibold text-cyan-400">${totalOosUsd}</div>
                <div className="text-[10px] text-zinc-500">total estimate</div>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <textarea
                value={oosDraft}
                onChange={(e) => setOosDraft(e.target.value)}
                placeholder="Запрос клиента из транскрипта..."
                rows={2}
                className="w-full text-xs bg-[var(--surface-elevated)] border border-[var(--border)] rounded-md px-2 py-1.5 resize-none focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={addOos}
                disabled={!oosDraft.trim()}
                className="w-full text-xs py-1.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                + Add to scope-out
              </button>
            </div>

            {oosItems.length === 0 ? (
              <p className="text-xs text-zinc-600 italic py-3 text-center">
                Пока пусто. Транскрипты сессий → запросы вне ТЗ → оценка $.
              </p>
            ) : (
              <ul className="space-y-2">
                {oosItems.map((item) => {
                  const cat = item.category ? CATEGORY_META[item.category] : null;
                  return (
                    <li key={item.id} className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5">
                      <div className="flex justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono text-zinc-500">{item.id}</span>
                        <span className="text-[10px] text-zinc-500">{item.raisedAt}</span>
                      </div>
                      <p className="text-xs leading-snug mb-2">{item.title}</p>
                      <div className="flex items-center gap-1 mb-2 flex-wrap">
                        {cat && (
                          <span className={cn("text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded border", cat.cls)}>
                            {cat.label}
                          </span>
                        )}
                        {item.relatedTzItem && (
                          <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                            → affects {item.relatedTzItem}
                          </span>
                        )}
                        {item.meetingId && (
                          <span className="text-[9px] font-mono text-zinc-500">{item.meetingId}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500 text-xs">$</span>
                        <input
                          type="number"
                          min="0"
                          value={item.estimateUsd ?? ""}
                          onChange={(e) => updateOosEstimate(item.id, e.target.value)}
                          placeholder="estimate"
                          className="flex-1 text-xs bg-zinc-900 border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-cyan-500/50 font-mono"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Workflow card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-zinc-400 leading-relaxed">
            <p className="text-zinc-200 font-semibold mb-2">📌 Workflow</p>
            <ol className="list-decimal pl-4 space-y-1 text-[11px]">
              <li>Dev делает таск → пушит PR</li>
              <li>QA запускает автотесты против ТЗ</li>
              <li>Tester (Roman) подтверждает</li>
              <li>Только потом — короткий PR-линк появляется в задаче</li>
            </ol>
          </div>
        </aside>
      </div>

      <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-zinc-500 flex flex-wrap gap-4 justify-between">
          <span>EngiBoard Release Dashboard · v0.1 · {new Date().toISOString().slice(0, 10)}</span>
          <span className="font-mono">github.com/{RELEASE.repo.split("/")[0]}/engiboard-dashboard</span>
        </div>
      </footer>
    </div>
  );
}

function SprintCard({
  sprint,
  expanded,
  onToggle,
  expandedTasks,
  onTaskToggle,
}: {
  sprint: Sprint;
  expanded: boolean;
  onToggle: () => void;
  expandedTasks: Set<string>;
  onTaskToggle: (id: string) => void;
}) {
  const stats = computeSprintStats(sprint);
  const isDone = sprint.status === "done";

  return (
    <div
      className={cn(
        "rounded-xl border bg-[var(--surface)] overflow-hidden transition",
        expanded ? "border-cyan-500/30" : "border-[var(--border)]",
        isDone && "opacity-95"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--surface-elevated)] transition"
      >
        <span className={cn("text-xs font-mono w-7 text-zinc-500", expanded && "text-cyan-400")}>
          {expanded ? "▼" : "▶"}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-900">{sprint.id}</span>
            <h3 className="font-semibold text-sm truncate">
              {sprint.name}
              <span className="text-zinc-500 font-normal ml-2 font-mono text-xs">{sprint.versionRange}</span>
            </h3>
            {isDone && (
              <span className="text-[10px] uppercase tracking-wide font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-1.5 py-0.5">
                done
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden max-w-md">
              <div
                className={cn(
                  "h-full transition-all",
                  isDone ? "bg-emerald-500" : "bg-gradient-to-r from-cyan-600 to-cyan-400"
                )}
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <span className="text-xs text-zinc-500 font-mono whitespace-nowrap">
              {stats.done} / {stats.total} · {stats.percent}%
            </span>
          </div>
        </div>
      </button>

      {expanded && (
        <>
          {sprint.updates && sprint.updates.length > 0 && <SprintUpdatesSection updates={sprint.updates} />}
          <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
            {sprint.tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                expanded={expandedTasks.has(task.id)}
                onToggle={() => onTaskToggle(task.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SprintUpdatesSection({ updates }: { updates: SprintUpdate[] }) {
  const [open, setOpen] = useState(false);
  const sorted = [...updates].sort((a, b) => b.date.localeCompare(a.date));
  const visible = open ? sorted : sorted.slice(0, 3);

  return (
    <div className="border-t border-[var(--border)] bg-[var(--surface-elevated)]/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[11px] uppercase tracking-wide font-semibold text-zinc-400">
          📊 Updates ({updates.length})
        </h4>
        {updates.length > 3 && (
          <button onClick={() => setOpen(!open)} className="text-[11px] text-cyan-400 hover:text-cyan-300">
            {open ? "Свернуть" : `Показать все ${updates.length}`}
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {visible.map((u) => {
          const meta = UPDATE_META[u.kind];
          return (
            <li key={u.id} className="flex gap-3 text-xs">
              <span className="text-[10px] font-mono text-zinc-500 w-20 shrink-0 pt-0.5">{u.date}</span>
              <span className={cn("shrink-0 w-4 text-center text-sm leading-snug", meta.color)} aria-label={u.kind}>
                {meta.icon}
              </span>
              <div className="flex-1 leading-snug text-zinc-200">
                <span>{u.text}</span>
                {u.author && <span className="text-zinc-500 ml-1.5 text-[10px]">— {u.author}</span>}
                {u.prUrl && (
                  <a
                    href={u.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 ml-1.5 text-[10px] font-mono"
                  >
                    PR ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TaskRow({ task, expanded, onToggle }: { task: Task; expanded: boolean; onToggle: () => void }) {
  const status = STATUS_META[task.status];
  const priority = PRIORITY_META[task.priority] ?? PRIORITY_META.B;
  const hasDetails = task.description || task.acceptance?.length || task.estimateHours;

  return (
    <div>
      <button
        onClick={hasDetails ? onToggle : undefined}
        className={cn(
          "w-full flex items-start gap-3 px-4 py-3 text-left transition",
          hasDetails && "hover:bg-[var(--surface-elevated)] cursor-pointer",
          !hasDetails && "cursor-default"
        )}
      >
        <span className={cn("size-2 rounded-full mt-1.5 shrink-0", status.dot)} aria-label={status.label} />

        <span
          className={cn(
            "text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0",
            priority.cls,
            "min-w-[40px] text-center"
          )}
        >
          {task.id}
        </span>

        <div className="flex-1 min-w-0">
          <p className={cn("text-sm leading-snug", task.status === "done" ? "text-zinc-400" : "text-zinc-100")}>
            {task.title}
          </p>
          {task.estimateHours && (
            <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">
              ~{task.estimateHours[0]}–{task.estimateHours[1]}h
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {task.prUrl && (
            <a
              href={task.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
            >
              PR ↗
            </a>
          )}
          <span className={cn("text-[10px] uppercase tracking-wide font-medium", status.color)}>{status.label}</span>
          {hasDetails && <span className="text-zinc-600 text-xs w-3">{expanded ? "−" : "+"}</span>}
        </div>
      </button>

      {expanded && hasDetails && (
        <div className="px-4 pb-4 ml-9 text-xs text-zinc-300 space-y-3">
          {task.description && <p className="leading-relaxed">{task.description}</p>}
          {task.acceptance && task.acceptance.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1.5 font-semibold">
                Acceptance criteria
              </p>
              <ul className="space-y-1">
                {task.acceptance.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-500 shrink-0">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!task.prUrl && task.status !== "done" && (
            <div className="text-[10px] text-zinc-600 italic border-l-2 border-zinc-800 pl-2 py-1">
              PR-доказательство появится только после прохождения QA + подтверждения тестировщика.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export type TaskStatus = "done" | "in_progress" | "pending" | "blocked" | "review";
export type Priority = "P0" | "P1" | "P2" | "TD" | "L" | "B";

export interface Task {
  id: string;
  title: string;
  description?: string;
  acceptance?: string[];
  estimateHours?: [number, number];
  status: TaskStatus;
  priority: Priority;
  prUrl?: string;
  testProof?: string;
}

export type UpdateKind = "milestone" | "decision" | "blocker" | "qa" | "deploy" | "info";

export interface SprintUpdate {
  id: string;
  date: string;
  kind: UpdateKind;
  text: string;
  author?: string;
  prUrl?: string;
}

export interface Sprint {
  id: string;
  name: string;
  versionRange: string;
  status: "done" | "in_progress" | "pending";
  tasks: Task[];
  updates?: SprintUpdate[];
}

export type OosCategory = "ui" | "ux" | "feature" | "cosmetic" | "removal";

export interface OutOfScopeItem {
  id: string;
  title: string;
  description?: string;
  relatedTzItem?: string;
  category?: OosCategory;
  source: string;
  meetingId?: string;
  raisedAt: string;
  estimateUsd?: number;
  status: "pending_estimate" | "estimated" | "rejected" | "accepted";
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  summary: string;
  decisions?: string[];
  promises?: string[];
}

export const RELEASE = {
  product: "EngiBoard",
  version: "v1.0",
  baselineVersion: "v0.1.12",
  repo: "mag8888/engiboard-desktop",
  source: "EngiBoard_Context.md §15",
};

export const SPRINTS: Sprint[] = [
  {
    id: "S0",
    name: "Baseline",
    versionRange: "v0.1.0 → v0.1.12",
    status: "done",
    updates: [
      { id: "U-S0-01", date: "2026-04-22", kind: "milestone", text: "v0.1.0 — первый релиз: базовый UI + native screencapture -i" },
      { id: "U-S0-02", date: "2026-04-23", kind: "info", text: "v0.1.1 — screenshot fix: предв. скрытие окон" },
      { id: "U-S0-03", date: "2026-04-24", kind: "decision", text: "v0.1.3 — отказ от native screencapture: возврат на свой sniper.html overlay (M5+Sequoia)" },
      { id: "U-S0-04", date: "2026-04-25", kind: "info", text: "v0.1.4 — drag окна через data-tauri-drag-region" },
      { id: "U-S0-05", date: "2026-04-26", kind: "info", text: "v0.1.5 — Editor on-top с auto-drop через 1с" },
      { id: "U-S0-06", date: "2026-04-27", kind: "milestone", text: "v0.1.6 — Deep-link OAuth (engiboard://) для Google Sign-in" },
      { id: "U-S0-07", date: "2026-04-27", kind: "info", text: "v0.1.7 — robust deep-link: runtime register + cold-start handling" },
      { id: "U-S0-08", date: "2026-04-28", kind: "info", text: "v0.1.8 — editor focus fix" },
      { id: "U-S0-09", date: "2026-04-28", kind: "info", text: "v0.1.9 — clean titlebar (убраны Tasks/Dashboard кнопки)" },
      { id: "U-S0-10", date: "2026-04-28", kind: "info", text: "v0.1.10 — per-project inline input для добавления задач" },
      { id: "U-S0-11", date: "2026-04-29", kind: "info", text: "v0.1.11 — убран project switcher из шапки" },
      { id: "U-S0-12", date: "2026-04-29", kind: "milestone", text: "v0.1.12 — slideshow ▶ + lightbox с pin-комментариями · SPRINT 0 ЗАКРЫТ" },
      { id: "U-S0-13", date: "2026-05-01", kind: "decision", text: "Демо-сессия с клиентом: 7 запросов на правки UI/UX → все 7 классифицированы как out-of-ТЗ (см. правую панель)" },
    ],
    tasks: [
      { id: "B-01", priority: "B", status: "done", title: "Custom sniper.html overlay (transparent fullscreen area selector)" },
      { id: "B-02", priority: "B", status: "done", title: "AppleScript hides EngiBoard before screencapture" },
      { id: "B-03", priority: "B", status: "done", title: "Native screencapture -R через child process" },
      { id: "B-04", priority: "B", status: "done", title: "Editor with annotation tools (arrow / rect / pen / text / blur / highlight)" },
      { id: "B-05", priority: "B", status: "done", title: "Editor window always_on_top until closed" },
      { id: "B-06", priority: "B", status: "done", title: "Global hotkey ⌘⇧G" },
      { id: "B-07", priority: "B", status: "done", title: "Deep-link engiboard:// для OAuth callback" },
      { id: "B-08", priority: "B", status: "done", title: "Supabase Google OAuth (provider + redirect)" },
      { id: "B-09", priority: "B", status: "done", title: "Sidebar 5 разделов (Dashboard / Projects / Chats / Shortcuts / Profile)" },
      { id: "B-10", priority: "B", status: "done", title: "Бургер ⌘B (200px ↔ 54px collapsed)" },
      { id: "B-11", priority: "B", status: "done", title: "Группировка задач по проектам с прогресс-баром" },
      { id: "B-12", priority: "B", status: "done", title: "Per-project inline input для добавления задач" },
      { id: "B-13", priority: "B", status: "done", title: "8 статусов задач с цветами + dropdown" },
      { id: "B-14", priority: "B", status: "done", title: "Drag-to-reorder задач + resize высоты" },
      { id: "B-15", priority: "B", status: "done", title: "Editable task name (contenteditable)" },
      { id: "B-16", priority: "B", status: "done", title: "Chat-панель сбоку для каждой задачи" },
      { id: "B-17", priority: "B", status: "done", title: "Lightbox с pin-комментариями (v0.1.12)" },
      { id: "B-18", priority: "B", status: "done", title: "Slideshow презентация всех скриншотов задачи (v0.1.12)" },
      { id: "B-19", priority: "B", status: "done", title: "Window drag (data-tauri-drag-region на .tbar)" },
      { id: "B-20", priority: "B", status: "done", title: "GitHub Actions matrix build (Mac arm64+x64 + Windows .exe+.msi)" },
      { id: "B-21", priority: "B", status: "done", title: "Auto-release при push tag v* — 4 артефакта" },
      { id: "B-22", priority: "B", status: "done", title: "macOS quarantine workaround (xattr -cr в инструкции)" },
    ],
  },
  {
    id: "S1",
    name: "Distribution Trust",
    versionRange: "v0.1.13 → v0.1.14",
    status: "pending",
    tasks: [
      {
        id: "P0-1",
        priority: "P0",
        status: "pending",
        title: "Apple Developer signing + notarization",
        description: "Подпись + notarize чтобы убрать команду xattr -cr и диалоги Sequoia",
        estimateHours: [4, 8],
        acceptance: [
          "Свежий Mac (не разработчика) открывает приложение обычным двойным кликом",
          "spctl -a -t exec /Applications/EngiBoard.app → accepted",
        ],
      },
      {
        id: "P0-2",
        priority: "P0",
        status: "pending",
        title: "Windows Code Signing Certificate",
        description: "EV Code Signing $300-500/год — убрать SmartScreen warning",
        estimateHours: [4, 8],
        acceptance: [
          "Запуск .exe не вызывает SmartScreen warning",
          "Defender / Avast не блокируют",
          "Digital Signatures показывает EngiBoard organization",
        ],
      },
    ],
  },
  {
    id: "S2",
    name: "Data Layer",
    versionRange: "v0.1.15 → v0.1.18",
    status: "pending",
    tasks: [
      {
        id: "P0-3",
        priority: "P0",
        status: "pending",
        title: "Real Supabase persistence (заменить localStorage)",
        description: "4 таблицы (projects, tasks, comments, image_comments) + RLS + Storage bucket + realtime sync",
        estimateHours: [16, 24],
        acceptance: [
          "Двухустройственная синхронизация задач за <2 сек",
          "Logout → login → данные на месте",
          "Скрины >1 MB хранятся в Storage, не в БД",
          "RLS: пользователь не видит чужие проекты",
        ],
      },
    ],
  },
  {
    id: "S3",
    name: "Updates & Capture",
    versionRange: "v0.1.19 → v0.1.21",
    status: "pending",
    tasks: [
      {
        id: "P1-1",
        priority: "P1",
        status: "pending",
        title: "Auto-update через Tauri updater",
        description: "tauri-plugin-updater + signing key + latest.json манифест на GitHub releases",
        estimateHours: [6, 10],
        acceptance: [
          "Пользователи v1.0.0 получают toast 'New version available'",
          "Клик 'Update' → скачка → перезапуск с новой версией",
          "Локальные данные не ломаются",
        ],
      },
      {
        id: "P1-2",
        priority: "P1",
        status: "pending",
        title: "Multi-screenshot per task (полноценно)",
        description: "Произвольное количество скриншотов в задачу + slideshow + миниатюры",
        estimateHours: [4, 6],
        acceptance: [
          "Можно добавить 3+ скриншота в одну задачу",
          "Slideshow показывает все по порядку",
          "Каждый можно открыть в lightbox с отдельными комментариями",
        ],
      },
    ],
  },
  {
    id: "S4",
    name: "Collaboration",
    versionRange: "v0.1.22 → v0.1.25",
    status: "pending",
    tasks: [
      {
        id: "P1-3",
        priority: "P1",
        status: "pending",
        title: "Real-time чат (Supabase Realtime)",
        description: "Realtime для comments + image_comments + toast + badge + typing indicator",
        estimateHours: [6, 10],
        acceptance: [
          "Два пользователя обмениваются сообщениями в реальном времени",
          "Без перезагрузки видят новые сообщения",
        ],
      },
      {
        id: "P1-4",
        priority: "P1",
        status: "pending",
        title: "Project sharing / Team workspaces",
        description: "Invite link + project_members table + roles (owner / editor / viewer)",
        estimateHours: [12, 20],
        acceptance: [
          "Owner может пригласить юзера, тот видит проект в списке",
          "Viewer видит, но не редактирует (UI disabled)",
        ],
      },
    ],
  },
  {
    id: "S5",
    name: "Reporting",
    versionRange: "v0.1.26 → v0.1.27",
    status: "pending",
    tasks: [
      {
        id: "P1-5",
        priority: "P1",
        status: "pending",
        title: "Export задач в PDF report",
        description: "PDF с titlebar + projects title + tasks с before/after + аннотациями. Фильтры по статусам/периоду.",
        estimateHours: [6, 10],
        acceptance: [
          "PDF генерится за <10 сек для проекта с 50 задачами",
          "Аннотации на скриншотах сохраняются",
          "Можно отправить клиенту как отчёт",
        ],
      },
    ],
  },
  {
    id: "S6",
    name: "Polish (P2)",
    versionRange: "v0.1.28 → v0.1.32",
    status: "pending",
    tasks: [
      { id: "P2-1", priority: "P2", status: "pending", title: "Webhooks / Slack / Telegram интеграции" },
      { id: "P2-2", priority: "P2", status: "pending", title: "Customizable keyboard shortcuts" },
      { id: "P2-3", priority: "P2", status: "pending", title: "Dark mode (CSS vars + toggle + system preference)" },
      { id: "P2-4", priority: "P2", status: "pending", title: "Localization RU / EN (i18n.json + auto-detect)" },
      { id: "P2-5", priority: "P2", status: "pending", title: "CSV import / bulk task creation" },
      { id: "P2-6", priority: "P2", status: "pending", title: "Time tracking (timer per task + reports)" },
    ],
  },
  {
    id: "S7",
    name: "Tech Debt",
    versionRange: "v0.1.33 → v0.1.35",
    status: "pending",
    tasks: [
      { id: "TD-1", priority: "TD", status: "pending", title: "Разбить index.html на модули (vite + esbuild)" },
      { id: "TD-2", priority: "TD", status: "pending", title: "Покрыть main.rs unit + integration tests (tauri-driver)" },
      { id: "TD-3", priority: "TD", status: "pending", title: "Sentry (rust + js) + Posthog аналитика (opt-in)" },
    ],
  },
  {
    id: "S8",
    name: "Launch v1.0",
    versionRange: "v1.0.0",
    status: "pending",
    tasks: [
      { id: "L-01", priority: "L", status: "pending", title: "Все 4 артефакта подписаны (.dmg ARM/Intel + .exe + .msi)" },
      { id: "L-02", priority: "L", status: "pending", title: "Notarization прошла (spctl assess accepted)" },
      { id: "L-03", priority: "L", status: "pending", title: "Auto-update проверен на тестовом релизе (v0.99 → v1.0)" },
      { id: "L-04", priority: "L", status: "pending", title: "Supabase RLS audit — один юзер не видит данные другого" },
      { id: "L-05", priority: "L", status: "pending", title: "10 тестировщиков прошли scenario без багов" },
      { id: "L-06", priority: "L", status: "pending", title: "Бенчмарк: 50 задач + 100 скринов + аннотации работает плавно" },
      { id: "L-07", priority: "L", status: "pending", title: "Экспорт PDF проекта 50 задач <10 сек" },
      { id: "L-08", priority: "L", status: "pending", title: "Документация: install guide + user manual + FAQ" },
      { id: "L-09", priority: "L", status: "pending", title: "Landing page (engiboard.app или подобный домен)" },
      { id: "L-10", priority: "L", status: "pending", title: "Privacy Policy + Terms of Service" },
      { id: "L-11", priority: "L", status: "pending", title: "Тарифы (free / paid plans)" },
    ],
  },
];

export const MEETINGS: Meeting[] = [
  {
    id: "M-1",
    title: "Демо-сессия (UI разбор)",
    date: "2026-05-01",
    participants: ["Roman", "Anton", "Dmitry"],
    summary:
      "Демо десктоп-приложения. Roman показал реализацию, Anton + Dmitry дали развёрнутую обратную связь по UI/UX. 7 запросов на изменение — все вне ТЗ §15.",
    decisions: [
      "Чат — слева, не справа",
      "Функция раскрытия задачи через 'коммент' отменяется — «Ни в коем случае»",
      "Выбор проектов убирается с постоянного отображения — сворачиваемый",
      "Поле недели/ID — маленькое, над/под статусом",
    ],
    promises: [
      "Roman: реализую чат в превью-режиме",
      "Roman: причешу шрифты",
      "Антон: после подтверждения Дмитрия подготовлю финальную версию договора",
    ],
  },
];

export const OUT_OF_SCOPE: OutOfScopeItem[] = [
  {
    id: "OOS-01",
    title: "Перенести чат с правой стороны на левую",
    description:
      "Решение клиента на демо. Текущая реализация (B-16) — чат справа. Требует UI redesign + проверка drag-and-drop совместимости.",
    relatedTzItem: "B-16",
    category: "ui",
    source: "Демо-сессия 2026-05-01 (Anton + Dmitry)",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-02",
    title: "Убрать дублирование имени пользователя (текст + аватар)",
    description: "Сейчас показывается и текст, и аватар — клиент считает избыточным. UI cleanup.",
    relatedTzItem: "B-16",
    category: "ui",
    source: "Демо-сессия 2026-05-01",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-03",
    title: "Сжать поле статуса + поле недели",
    description: "Сейчас занимают ~25% экрана. Сделать компактным, разместить над/под статусом.",
    relatedTzItem: "B-13",
    category: "ui",
    source: "Демо-сессия 2026-05-01",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-04",
    title: "Выбор проектов — сворачиваемый, не постоянное отображение",
    description:
      "При 20+ проектах постоянный список съедает рабочее пространство. Сворачивать/раскрывать по клику.",
    relatedTzItem: "B-11",
    category: "ux",
    source: "Демо-сессия 2026-05-01",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-05",
    title: "Убрать раскрытие задачи через 'коммент'",
    description:
      "Клиент: «Ни в коем случае». Чат только в превью-режиме или при прямом клике. Удаление поведения + рефакторинг.",
    category: "removal",
    source: "Демо-сессия 2026-05-01",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-06",
    title: "Реализовать чат в превью-режиме (slideshow)",
    description:
      "Превью работает (B-18), но чат в нём не реализован. Roman обещал. Расширяет slideshow + связано с P1-3 Real-time chat.",
    relatedTzItem: "B-18",
    category: "feature",
    source: "Демо-сессия 2026-05-01 — обещание Roman",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
  {
    id: "OOS-07",
    title: "Привести шрифты в порядок (косметика)",
    description: "Клиент явно обозначил как cosmetic, не в приоритете. Roman: «Шрифты я причешу».",
    category: "cosmetic",
    source: "Демо-сессия 2026-05-01 — обещание Roman",
    meetingId: "M-1",
    raisedAt: "2026-05-01",
    status: "pending_estimate",
  },
];

export function computeStats(sprints: Sprint[]) {
  const all = sprints.flatMap((s) => s.tasks);
  const done = all.filter((t) => t.status === "done").length;
  const inProgress = all.filter((t) => t.status === "in_progress").length;
  const total = all.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, inProgress, pending: total - done - inProgress, percent };
}

export function computeSprintStats(sprint: Sprint) {
  const total = sprint.tasks.length;
  const done = sprint.tasks.filter((t) => t.status === "done").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, percent };
}

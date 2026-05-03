export type TaskStatus = "done" | "in_progress" | "pending" | "blocked" | "review";
export type Priority = "P0" | "P1" | "P2" | "TD" | "L" | "B" | "DM";

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
  inScopeCount?: number;
  outOfScopeCount?: number;
  movedToSprint?: string;
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
    id: "S0.5",
    name: "Demo Polish",
    versionRange: "v0.1.13",
    status: "done",
    updates: [
      {
        id: "U-S05-01",
        date: "2026-05-01",
        kind: "decision",
        text: "Демо-сессия выявила 7 правок UI/UX. Решено делать сразу как часть основной работы (не out-of-scope).",
      },
      {
        id: "U-S05-02",
        date: "2026-05-03",
        kind: "milestone",
        text: "Sprint S0.5 открыт: 7 задач из транскрипта M-1, оценка 11.5–25h",
      },
      {
        id: "U-S05-03",
        date: "2026-05-03",
        kind: "deploy",
        text: "Все 7 DM коммитнуты + bump v0.1.13 + tag pushed → GitHub Actions сборка запущена (Mac arm64/x64 + Windows .exe/.msi)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/actions",
      },
      {
        id: "U-S05-04",
        date: "2026-05-03",
        kind: "milestone",
        text: "Sprint S0.5 ЗАКРЫТ. Все 7 правок с демо-сессии 2026-05-01 — done за один заход.",
      },
    ],
    tasks: [
      {
        id: "DM-1",
        priority: "DM",
        status: "done",
        title: "Перенести чат с правой стороны на левую",
        description: "Текущая реализация (B-16) — чат справа. Клиент: «чат слева» (явное решение).",
        estimateHours: [2, 4],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/73e168d",
        acceptance: [
          "Чат-панель занимает левую часть экрана",
          "Drag-to-reorder задач не сломан",
          "Resize высоты задач работает",
          "Lightbox с pin-комментариями совместим",
        ],
      },
      {
        id: "DM-2",
        priority: "DM",
        status: "done",
        title: "Убрать дублирование имени пользователя (текст + аватар)",
        description: "Сейчас показывается и текст, и аватар — клиент считает избыточным.",
        estimateHours: [0.5, 1],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/4717d50",
        acceptance: ["Только аватар или только текст в начале сообщения"],
      },
      {
        id: "DM-3",
        priority: "DM",
        status: "done",
        title: "Сжать поле статуса + поле недели",
        description: "Сейчас занимают ~25% экрана. Сделать компактным, разместить над/под статусом.",
        estimateHours: [1, 3],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/d6bac5b",
        acceptance: [
          "Поле недели и статус занимают ≤8% экрана",
          "Информативность сохраняется",
          "Не пересекается с drag-region",
        ],
      },
      {
        id: "DM-4",
        priority: "DM",
        status: "done",
        title: "Сделать выбор проектов сворачиваемым",
        description:
          "При 20+ проектах постоянный список съедает рабочее пространство. Сворачивать/раскрывать по клику.",
        estimateHours: [2, 4],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/2509bdc",
        acceptance: [
          "Кнопка свёртки/разворота",
          "Состояние сохраняется в localStorage",
          "Smooth animation",
          "+ Collapse all / Expand all buttons",
        ],
      },
      {
        id: "DM-5",
        priority: "DM",
        status: "done",
        title: "Убрать раскрытие задачи через 'коммент'",
        description: "Клиент: «Ни в коем случае». Чат только в превью-режиме или при прямом клике.",
        estimateHours: [1, 3],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/538036f",
        acceptance: [
          "Клик на коммент-иконке НЕ раскрывает задачу",
          "Чат открывается только из превью или по кнопке",
        ],
      },
      {
        id: "DM-6",
        priority: "DM",
        status: "done",
        title: "Реализовать чат в превью-режиме (slideshow)",
        description:
          "Превью работает (B-18), но чат в нём не реализован. Roman обещал. Использует pin-систему B-17.",
        estimateHours: [4, 8],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/fa4d386",
        acceptance: [
          "Чат-панель видна в режиме slideshow",
          "Comments синхронизируются с lightbox pin-системой",
          "Можно писать новые комменты прямо из превью",
        ],
      },
      {
        id: "DM-7",
        priority: "DM",
        status: "done",
        title: "Привести шрифты в порядок",
        description: "Косметика. Roman: «причешу». Клиент явно — не приоритет.",
        estimateHours: [1, 2],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/564571f",
        acceptance: [
          "Единая иерархия размеров (h1/h2/h3/body)",
          "Согласованные веса (400/500/600)",
          "Не конфликтует с system-ui для drag-region",
        ],
      },
    ],
  },
  {
    id: "S1",
    name: "Distribution Trust",
    versionRange: "v0.1.14 → v0.1.15",
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
    versionRange: "deferred → v2.0",
    status: "pending",
    updates: [
      {
        id: "U-S2-01",
        date: "2026-05-03",
        kind: "milestone",
        text: "Step 1: SQL миграции (5 таблиц + RLS + Storage bucket) написаны и закоммичены",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/0dda328",
      },
      {
        id: "U-S2-02",
        date: "2026-05-03",
        kind: "milestone",
        text: "Step 2: Supabase JS client + db.* CRUD wrappers + OAuth integration в index.html",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/d4562a8",
      },
      {
        id: "U-S2-03",
        date: "2026-05-03",
        kind: "blocker",
        text: "Step 3-6 заблокирован: anon-ключ не может выполнять DDL (CREATE/DROP TABLE).",
      },
      {
        id: "U-S2-04",
        date: "2026-05-03",
        kind: "decision",
        text: "ADR: пользователь дал sb_secret_* (admin Storage/CRUD), но обнаружено что в БД уже есть данные другого приложения (web app engiboard-deploy.vercel.app) с богатой engineering team схемой (role/department/checklist/cad_software). Конфликт моделей. RLS policies для Storage всё ещё требуют DDL.",
      },
      {
        id: "U-S2-05",
        date: "2026-05-03",
        kind: "milestone",
        text: "S2 ОТЛОЖЕН до v2.0 architectural decision. localStorage остаётся primary для desktop. См. supabase/ARCHITECTURE_DECISION.md в репо.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/blob/main/supabase/ARCHITECTURE_DECISION.md",
      },
    ],
    tasks: [
      {
        id: "P0-3",
        priority: "P0",
        status: "blocked",
        title: "Real Supabase persistence — DEFERRED to v2.0",
        description: "Step 1+2 done (миграции написаны + JS client). Step 3-6 deferred: existing Supabase project уже занят web-app схемой (engineering team model). Конфликт моделей. См. ADR в репо.",
        estimateHours: [16, 24],
        prUrl: "https://github.com/mag8888/engiboard-desktop/blob/main/supabase/ARCHITECTURE_DECISION.md",
        acceptance: [
          "v2.0: architectural decision (isolated tables vs full schema unification)",
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
    versionRange: "v0.1.14 → v0.1.21",
    status: "in_progress",
    updates: [
      {
        id: "U-S3-01",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.14 — P1-2 Multi-screenshot shipped",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.14",
      },
    ],
    tasks: [
      {
        id: "P1-1",
        priority: "P1",
        status: "blocked",
        title: "Auto-update через Tauri updater",
        description: "Заблокирован Sprint S1 (нужны Apple Developer + Windows code signing — пропущены пользователем).",
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
        status: "done",
        title: "Multi-screenshot per task",
        description: "Реализован через slideshow: capture button + drag-drop + paste mode → t.shots[] массив. Бэкенд из v0.1.12 переиспользуется.",
        estimateHours: [4, 6],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/f6c8968",
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
    versionRange: "v0.1.15",
    status: "done",
    updates: [
      {
        id: "U-S5-01",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.15 — P1-5 PDF export shipped (jsPDF, cover + per-task pages with before/after + comments)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.15",
      },
      {
        id: "U-S5-02",
        date: "2026-05-03",
        kind: "milestone",
        text: "Sprint S5 ЗАКРЫТ за один заход",
      },
    ],
    tasks: [
      {
        id: "P1-5",
        priority: "P1",
        status: "done",
        title: "Export задач в PDF report",
        description: "PDF с cover + per-task pages: title, status pip, before/after images (75mm), extra screenshots paginated 2-up, comments list. Honors active filter chip + currentProject.",
        estimateHours: [6, 10],
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/308862b",
        acceptance: [
          "PDF генерится за <10 сек для проекта с 50 задачами",
          "Аннотации на скриншотах сохраняются (PNG embed)",
          "Можно отправить клиенту как отчёт",
        ],
      },
    ],
  },
  {
    id: "S6",
    name: "Polish (P2)",
    versionRange: "v0.1.16 → v0.1.21",
    status: "done",
    updates: [
      {
        id: "U-S6-01",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.16 — P2-3 Dark mode (CSS vars + sun/moon + ⌘⇧T)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.16",
      },
      {
        id: "U-S6-02",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.17 — P2-5 CSV import (header-driven + 8 status aliases)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.17",
      },
      {
        id: "U-S6-03",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.18 — P2-6 Time tracking (timer per task + localStorage + PDF integration)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.18",
      },
      {
        id: "U-S6-04",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.19 — P2-4 Localization RU/EN (toggle + ~30 strings + auto-detect from navigator.language)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.19",
      },
      {
        id: "U-S6-05",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.20 — P2-1 Slack webhook (notify on Done/Problem transitions)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.20",
      },
      {
        id: "U-S6-06",
        date: "2026-05-03",
        kind: "deploy",
        text: "v0.1.21 — P2-2 Customizable shortcuts (4 editable bindings, capture mode, conflict detect, reset)",
        prUrl: "https://github.com/mag8888/engiboard-desktop/releases/tag/v0.1.21",
      },
      {
        id: "U-S6-07",
        date: "2026-05-03",
        kind: "milestone",
        text: "🎉 Sprint S6 ЗАКРЫТ — все 6 P2 задач shipped за один autonomy-burst.",
      },
    ],
    tasks: [
      {
        id: "P2-1",
        priority: "P2",
        status: "done",
        title: "Slack webhook integration",
        description: "Profile card с URL input + Save/Test/Clear. Notifications на Done(1)/Problem(5) transitions. CORS fallback на no-cors. Telegram — будущее.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/f085ad0",
      },
      {
        id: "P2-2",
        priority: "P2",
        status: "done",
        title: "Customizable keyboard shortcuts",
        description: "4 editable bindings (sidebar/search/new task/dark mode) + DEFAULT_SHORTCUTS + matchShortcut() helper + capture mode с ✏️ button + Esc cancel + conflict detect + reset.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/0097c65",
      },
      {
        id: "P2-3",
        priority: "P2",
        status: "done",
        title: "Dark mode (CSS vars + toggle + system preference)",
        description: "60+ хардкод цветов заменены на var(--bg)/var(--surf). Sun/moon icon. ⌘⇧T + localStorage + prefers-color-scheme fallback.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/a5e4319",
      },
      {
        id: "P2-4",
        priority: "P2",
        status: "done",
        title: "Localization RU / EN",
        description: "I18N map ~30 строк, T() function, language toggle в sidebar, navigator.language auto-detect, html lang attribute.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/33bdb17",
      },
      {
        id: "P2-5",
        priority: "P2",
        status: "done",
        title: "CSV import / bulk task creation",
        description: "Парсер с quoted-полями. Header: title (required) + project/status/week/notes. 8 status name aliases.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/808f9fb",
      },
      {
        id: "P2-6",
        priority: "P2",
        status: "done",
        title: "Time tracking (timer per task)",
        description: "t.timeMin + t.timerStart fields. Start/stop chip с pulsing red dot. localStorage 'eb_timers'. Auto-update в UI каждые 30s. Время в PDF.",
        prUrl: "https://github.com/mag8888/engiboard-desktop/commit/60c4f00",
      },
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
      "Демо десктоп-приложения. Anton + Dmitry дали развёрнутую обратную связь по UI/UX. 7 запросов на изменение классифицированы как minor → решено сделать как часть основной работы (Sprint S0.5 Demo Polish).",
    decisions: [
      "Чат — слева, не справа",
      "Функция раскрытия задачи через 'коммент' отменяется — «Ни в коем случае»",
      "Выбор проектов убирается с постоянного отображения — сворачиваемый",
      "Поле недели/ID — маленькое, над/под статусом",
      "Все 7 правок — как minor в основной скоп (S0.5), не доп.договор",
    ],
    promises: [
      "Roman: реализую чат в превью-режиме",
      "Roman: причешу шрифты",
      "Антон: после подтверждения Дмитрия подготовлю финальную версию договора",
    ],
    inScopeCount: 7,
    outOfScopeCount: 0,
    movedToSprint: "S0.5",
  },
];

// Все 7 запросов с демо-сессии M-1 перенесены в Sprint S0.5 Demo Polish (in-scope).
// OUT_OF_SCOPE остаётся для будущих запросов клиента, которые НЕ войдут в основной договор.
export const OUT_OF_SCOPE: OutOfScopeItem[] = [];

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

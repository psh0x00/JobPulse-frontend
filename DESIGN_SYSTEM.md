# JobPulse Frontend — Design System & UI/UX Rules

> This document governs all visual and interaction decisions in the JobPulse frontend.
> AI agents and human developers MUST follow these rules without exception.

---

## 1. Design Tokens (TailwindCSS v4 — CSS-First)

All design tokens are defined in `src/index.css` using Tailwind v4's `@theme` directive.
**Never hardcode raw color values in components.** Always use semantic token names.

### Color Palette

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-brand-primary: oklch(0.55 0.18 250);     /* Blue — primary actions, links */
  --color-brand-secondary: oklch(0.45 0.15 250);    /* Darker blue — hover states */

  /* Surfaces */
  --color-bg-app: oklch(0.97 0 0);                  /* Page background — near-white */
  --color-bg-card: oklch(1 0 0);                     /* Card/panel background — white */
  --color-bg-sidebar: oklch(0.15 0.02 250);          /* Sidebar — dark navy */

  /* Text */
  --color-text-primary: oklch(0.20 0 0);             /* Headings, body — near-black */
  --color-text-secondary: oklch(0.45 0 0);           /* Labels, captions — gray */
  --color-text-on-dark: oklch(0.95 0 0);             /* Text on dark backgrounds */

  /* Status (Application Pipeline) */
  --color-status-saved: oklch(0.65 0.15 250);        /* Blue — Saved */
  --color-status-applied: oklch(0.65 0.18 280);      /* Purple — Applied */
  --color-status-interview: oklch(0.70 0.17 85);     /* Amber — Interview */
  --color-status-offer: oklch(0.65 0.20 145);        /* Green — Offer */
  --color-status-rejected: oklch(0.60 0.20 25);      /* Red — Rejected */
  --color-status-withdrawn: oklch(0.55 0.05 0);      /* Gray — Withdrawn */

  /* Feedback */
  --color-success: oklch(0.65 0.20 145);
  --color-warning: oklch(0.75 0.15 85);
  --color-error: oklch(0.60 0.22 25);
  --color-info: oklch(0.65 0.15 250);

  /* Borders & Dividers */
  --color-border: oklch(0.88 0 0);
  --color-border-focus: oklch(0.55 0.18 250);

  /* Spacing Scale */
  --spacing-page: 1.5rem;        /* Page padding */
  --spacing-card: 1.25rem;       /* Card internal padding */
  --spacing-section: 2rem;       /* Between major sections */

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-card: 0.75rem;

  /* Shadows */
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.06);
  --shadow-modal: 0 10px 25px oklch(0 0 0 / 0.15);
}
```

---

## 2. Typography

| Element        | Tailwind Classes                        | Usage                        |
|---------------|----------------------------------------|------------------------------|
| Page Title     | `text-2xl font-bold text-text-primary` | Top of each page             |
| Section Title  | `text-lg font-semibold text-text-primary` | Card headers, section starts |
| Body Text      | `text-sm text-text-primary`            | Regular content              |
| Caption/Label  | `text-xs text-text-secondary`          | Form labels, timestamps      |
| Table Header   | `text-xs font-medium uppercase tracking-wide text-text-secondary` | Column headers |

### Rules
- **One `<h1>` per page.** Use `<h2>` for sections within the page.
- **Never skip heading levels.** (`h1` → `h3` is forbidden; must go `h1` → `h2` → `h3`).
- **Minimum font size:** `text-sm` (14px). Never go below for readable content.

---

## 3. Component Patterns

### 3.1 Cards
Cards are the primary content container in the dashboard.

```
Outer:  bg-bg-card rounded-card shadow-card p-card border border-border
Header: text-lg font-semibold text-text-primary mb-4
```

### 3.2 Buttons

| Variant    | Classes                                                                 | Usage               |
|-----------|-------------------------------------------------------------------------|----------------------|
| Primary    | `bg-brand-primary text-white px-4 py-2 rounded-md font-medium hover:bg-brand-secondary transition-colors` | Main CTA (Submit, Create) |
| Secondary  | `bg-transparent border border-border text-text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors` | Cancel, Back |
| Danger     | `bg-error text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors` | Delete, Reject |
| Ghost      | `text-brand-primary hover:underline font-medium`                       | Inline links, navigation |

### Rules
- Every button **must** have `transition-colors` for smooth hover feedback.
- Every button **must** have a visible `focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:outline-none` for keyboard users.
- Disabled buttons: add `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Never use a `<div>` as a button.** Use `<button>` or `<a>` with proper roles.

### 3.3 Form Inputs

```
Input:  w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary
        focus:border-border-focus focus:ring-2 focus:ring-brand-primary/20 focus:outline-none
        placeholder:text-text-secondary
Label:  block text-sm font-medium text-text-secondary mb-1.5
Error:  text-xs text-error mt-1
```

### Rules
- Every `<input>` **must** have a corresponding `<label>` with `htmlFor` matching the input's `id`.
- Error messages appear **below** the input, not as alerts/toasts.
- Use `type="email"`, `type="password"`, `type="url"` for proper mobile keyboards.

### 3.4 Status Badges

```tsx
const statusStyles: Record<string, string> = {
  SAVED:      'bg-status-saved/15 text-status-saved',
  APPLIED:    'bg-status-applied/15 text-status-applied',
  INTERVIEW:  'bg-status-interview/15 text-status-interview',
  OFFER:      'bg-status-offer/15 text-status-offer',
  REJECTED:   'bg-status-rejected/15 text-status-rejected',
  WITHDRAWN:  'bg-status-withdrawn/15 text-status-withdrawn',
};
```

### Rules
- **Never use color alone to convey status.** Always include the status text alongside the colored badge.
- Badge shape: `px-2.5 py-0.5 rounded-full text-xs font-medium`.

### 3.5 Tables

```
Table:      w-full border-collapse
Header Row: bg-gray-50 border-b border-border
Header Cell: text-xs font-medium uppercase tracking-wide text-text-secondary px-4 py-3 text-left
Body Row:   border-b border-border hover:bg-gray-50 transition-colors cursor-pointer
Body Cell:  px-4 py-3 text-sm text-text-primary
```

### Rules
- Rows **must** have `hover:bg-gray-50` for visual feedback.
- Clickable rows **must** have `cursor-pointer`.
- Empty state: display a centered message with an icon, never an empty table.

### 3.6 Modals

```
Overlay:  fixed inset-0 bg-black/50 z-40 flex items-center justify-center
Content:  bg-bg-card rounded-lg shadow-modal p-6 w-full max-w-md z-50
Title:    text-lg font-semibold text-text-primary mb-4
```

### Rules
- Modals **must** trap focus (Tab cycles only through modal elements).
- Pressing `Escape` **must** close the modal.
- Clicking the overlay backdrop **must** close the modal.

---

## 4. Layout Rules

### 4.1 Page Structure
```
┌──────────────────────────────────────────────────┐
│ Sidebar (w-64, fixed left, dark bg)              │
│  ┌───────────────────────────────────────────┐   │
│  │ Main Content (ml-64, p-page, bg-bg-app)   │   │
│  │  ┌─────────────────────────────────────┐  │   │
│  │  │ Page Title + Actions               │  │   │
│  │  ├─────────────────────────────────────┤  │   │
│  │  │ Content (Cards, Tables, Charts)    │  │   │
│  │  └─────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### 4.2 Responsive Breakpoints
| Breakpoint | Width   | Behavior                               |
|-----------|---------|----------------------------------------|
| Mobile    | < 768px | Sidebar hidden (hamburger menu), single column |
| Tablet    | ≥ 768px | Sidebar collapsed (icons only), 2-column grid |
| Desktop   | ≥ 1024px | Full sidebar, 3-4 column grid           |

### Rules
- **Mobile-first:** Write base styles for mobile, then add `md:` and `lg:` overrides.
- Dashboard stat cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`.
- **Never use horizontal scrolling** on mobile. Tables must stack or scroll within a container.

---

## 5. Accessibility (WCAG 2.1 AA)

These are **non-negotiable** requirements:

### 5.1 Keyboard Navigation
- [ ] Every interactive element is reachable via `Tab`.
- [ ] Tab order follows visual reading order (top-to-bottom, left-to-right).
- [ ] All buttons, links, and inputs have a visible `focus` ring.
- [ ] Modals trap focus. `Escape` closes them.

### 5.2 Screen Readers
- [ ] Use semantic HTML: `<nav>`, `<main>`, `<header>`, `<section>`, `<article>`.
- [ ] Every `<img>` has `alt` text. Decorative images use `alt=""`.
- [ ] Every form input has a `<label>` with `htmlFor`.
- [ ] Icon-only buttons have `aria-label` (e.g., `<button aria-label="Delete application">`).
- [ ] Status changes announced via `aria-live="polite"` regions.

### 5.3 Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 against background (WCAG AA).
- [ ] UI component contrast ratio ≥ 3:1 (borders, icons).
- [ ] Never use color alone to convey information. Always pair with text, icons, or patterns.

### 5.4 Motion
- [ ] Respect `prefers-reduced-motion`. Wrap animations in `motion-safe:` (Tailwind).
- [ ] No auto-playing animations longer than 5 seconds.

---

## 6. UX Interaction Rules

### 6.1 Loading States
- Every page that fetches data **must** show a spinner or skeleton while loading.
- Never show a blank page while an API call is in progress.
- Spinner component: centered, with `animate-spin` and an `aria-label="Loading"`.

### 6.2 Empty States
- When a list has zero items, show a **friendly message + call to action**.
- Example: "No applications yet. Click 'New Application' to get started!"
- Include an illustrative icon or subtle graphic.

### 6.3 Error States
- API errors show a **toast notification** (top-right, auto-dismiss after 5 seconds).
- Form validation errors show **inline below the field**, not as alerts.
- Never show raw error messages from the API. Map them to user-friendly text.

### 6.4 Success Feedback
- After creating, updating, or deleting a resource, show a **success toast**.
- Redirect or update the UI immediately — don't make the user refresh.

### 6.5 Destructive Actions
- Delete actions **must** show a confirmation modal: "Are you sure you want to delete this application?"
- Use a `Danger` button in the modal, with `Cancel` as the default focus.

---

## 7. Anti-Patterns (Forbidden)

| ❌ Don't                                    | ✅ Do                                        |
|---------------------------------------------|----------------------------------------------|
| Inline `style={{ color: 'red' }}`           | Use Tailwind classes: `text-error`           |
| `<div onClick={...}>`                       | `<button onClick={...}>`                     |
| Color alone for status                      | Color + text label                           |
| Raw API errors shown to user                | User-friendly error messages                 |
| Empty tables with no explanation             | Empty state with icon + CTA                  |
| Modals without Escape-to-close              | Keyboard-accessible modals                   |
| Hardcoded colors like `bg-[#3b82f6]`        | Semantic tokens: `bg-brand-primary`          |
| Unlabelled form inputs                      | `<label htmlFor="email">Email</label>`       |
| Missing focus indicators                    | `focus:ring-2 focus:ring-brand-primary`      |
| Horizontal scroll on mobile                 | Responsive layouts that stack                |

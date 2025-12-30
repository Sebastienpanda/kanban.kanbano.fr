# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project Overview

This is a Kanban board application built with Angular 21, featuring drag-and-drop functionality for tasks and columns using Angular CDK. The application uses standalone components, signals for state management, and is styled with Tailwind CSS and DaisyUI.

## Development Commands

**Package Manager:** This project uses `pnpm` (version 10.24.0). Always use `pnpm` instead of `npm`.

```bash
# Start development server (runs on http://localhost:4200)
pnpm start

# Build for production (outputs to dist/)
pnpm build

# Build with watch mode for development
pnpm run watch

# Run unit tests with Vitest
pnpm test
```

## Architecture

**Component Structure:**

- `App` (root component at `src/app/app.ts`) - Main application container
- `Kanban` (at `src/app/kanban.ts`) - Kanban board with drag-and-drop functionality
    - Uses Angular CDK's DragDropModule for drag-and-drop
    - Manages columns and items with signals
    - Supports column reordering and cross-column item movement

**State Management:**

- Local component state uses signals (`signal()`, `computed()`)
- No global state management library - signals are sufficient for this application
- Drag-and-drop state is managed through Angular CDK events

**Drag-and-Drop Implementation:**

- Columns are horizontally draggable to reorder
- Items are draggable within the same column or between columns
- Uses `moveItemInArray()` for same-column movement
- Uses `transferArrayItem()` for cross-column movement
- Connected drop lists enable cross-column dragging

## Testing

- **Test Framework:** Vitest (configured to replace Karma/Jasmine)
- **Test Environment:** jsdom for DOM simulation
- Test files use `.spec.ts` extension
- TypeScript configuration for tests: `tsconfig.spec.json`

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
    - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

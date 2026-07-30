# Aura AI — CLAUDE.md

## Project Context

Aura AI is a desktop AI operating system built with Electron + React 19 + TypeScript.
It is NOT a chatbot wrapper — it is an intelligent software engineering platform.

## Architecture Overview

### Core Engine (`src/electron/`)
- **AuraEngine.ts** V2 — Application-facing AI boundary. Orchestrates the full response pipeline: AdaptiveContext → Understand → Research → Plan → Reason → Execute → Verify → Reflect → Improve → Output
- **AuraInferenceEngine.ts** — Request scheduler with session management (max 4 concurrent)
- **AuraModelRegistry.ts** — Canonical catalog of 7 built-in Aura models (Nano, Fast, Smart, Pro, Code, Vision, Agent)
- **TemporaryServingModel.ts** — Adapter that delegates to real provider APIs via providers.ts
- **AuraModelRuntime.ts** — Interface contracts: generate, stream, embed, reason, tools
- **AuraReasoningPipeline.ts** — Multi-stage structured reasoning pipeline. Each stage (understand→research→plan→reason→execute→verify→reflect→improve→output) is a focused reasoning step with typed state.
- **AgentCoordinator.ts** — Multi-agent intelligence coordinator with 16 specialist agents (architect, backend, frontend, security, performance, testing, ux, documentation, research, planning, debugging, memory, retriever, reflection, coordinator, coder). Auto-selects agents based on task.
- **SelfReflectionEngine.ts** — Quality self-assessment across 7 dimensions (understanding, completeness, correctness, context, clarity, alternatives, actionability). Produces revised responses when quality is low.
- **AdaptiveIntelligence.ts** — Auto-detects project type, language, framework, dev experience, and task urgency. Adapts response mode and style accordingly.
- **memory.ts** — Memory system with Neon (serverless Postgres) and local JSON backends. Types: short_term, long_term, preference, project, coding, learning, goal.
- **conversationEngine.ts** — Task classification, response planning, self-review, output cleanup.
- **modelRouter.ts** — Intelligent provider routing with failover chains, retry with exponential backoff.
- **aiConfig.ts** — Multi-profile system, AES-256-GCM encrypted API key storage, smart routing per task type.

### Agent Services (`src/electron/services/`)
- **CodingAgent.ts** — Full autonomous coding agent with 7 stages (Analyze→Discover→Architect→Execute→Verify→Iterate→Finalize), 8 tools, token budget management.
- **AgentCoordinator.ts** — 16 specialist agents for multi-agent intelligence.
- **ProjectManager.ts** — Complete file operations, file indexing, symbol extraction, content search, workspace context building.
- **BackgroundWatchers.ts** — Filesystem, git, and build status monitoring.
- **DiagnosticsService.ts** — TypeScript (tsc --noEmit), ESLint, and build error detection.
- **ProjectAwareness.ts** — Architect-level project understanding: trends, evolution history, quality insights, code health Q&A.
- **CodeIntelligence.ts** — Deep code analysis: symbol indexing, dead code detection, duplicate detection, architectural smell detection, circular dependency detection.
- **ResearchEngine.ts** — Multi-source knowledge synthesis: memory + workspace + semantic search + codebase graph.
- **EnhancedMemory.ts** — Structured knowledge base with entity extraction, relationship tracking, pattern detection, importance decay, and consolidation.
- **LocalSemanticIndex.ts** — Offline semantic search with sparse feature embeddings.
- **CodebaseKnowledgeGraph.ts** — Import/export graph with impact analysis.
- **ASTParser.ts** — TypeScript/JavaScript AST symbol extraction.
- **PostEditVerifier.ts** — Verification after file edits.
- **PermissionService.ts** — Risk-based permission system.
- **ShellService.ts** — Shell command execution.
- **VCSManager.ts** — Git branch management.
- **AgentStartup.ts** — Automatic project detection and initialization.

### Key Design Principles
1. **Intelligence First** — Every feature must make Aura smarter, not larger
2. **Multi-Stage Reasoning** — Never answer immediately; always go through the full pipeline
3. **Multi-Source Knowledge** — Never answer from one source alone
4. **Self-Reflection** — Every response is reviewed and improved before delivery
5. **Adaptive Behavior** — Automatically adapt to project type, dev experience, and urgency

### New File Locations
- Reasoning pipeline: `src/electron/AuraReasoningPipeline.ts`
- Agent coordinator: `src/electron/AgentCoordinator.ts`
- Self-reflection: `src/electron/SelfReflectionEngine.ts`
- Adaptive intelligence: `src/electron/AdaptiveIntelligence.ts`
- Code intelligence: `src/electron/services/CodeIntelligence.ts`
- Research engine: `src/electron/services/ResearchEngine.ts`
- Project awareness: `src/electron/services/ProjectAwareness.ts`
- Enhanced memory: `src/electron/services/EnhancedMemory.ts`

### Build Commands
```bash
npm run dev          # Development mode (Vite + Electron)
npm run build        # Build both renderer and main process
npm run start        # Start Electron after build
```

### Type System
Types are in `src/types/index.ts` — includes `AuraAPI` (window.aura) interface declarations.
Path alias: `@/*` maps to `src/*`.

### State Management
Single Zustand store (`src/store/index.ts`) with 30+ actions. Conversations, projects, memories, preferences, AI config, profiles, virtual models, dev dashboard, voice, plugins.

### IPC Architecture
- `main.ts` registers 100+ IPC handlers across 15+ modules
- `preload.ts` exposes `window.aura` via contextBridge
- Channel names follow `module:action` pattern (e.g., `chat:start`, `projects:list`)

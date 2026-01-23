# Technical Specification and Architectural Blueprint  
## AI-Powered Interactive Roadmap Platform

---

## Executive Summary

This document serves as a comprehensive architectural specification and implementation guide for the development of an **AI-powered Interactive Roadmap Maker**. The initiative addresses a fundamental disconnect in modern self-directed learning and project planning: the gap between abstract intent (e.g., *"I want to learn system design"*) and concrete, structural execution.

While Large Language Models (LLMs) have democratized access to information, they lack the capacity for rigorous plan adherence and long-term progress visualization. Their outputs—typically linear text or static lists—fail to capture the non-linear, dependency-driven nature of complex learning curves, leading to cognitive overload and loss of global context.

The proposed solution introduces a **Dual-Modality Interface** combining:

- A conversational AI agent  
- A dynamic, node-based visualization engine  

Using **Next.js**, **React Flow**, **Vercel AI SDK**, and **Supabase**, ephemeral chat interactions are transformed into persistent, interactive **Directed Acyclic Graphs (DAGs)**.

---

## 1. Introduction and Problem Space Analysis

### 1.1 Limitations of Linear Interfaces in Learning Planning

Most AI interfaces produce linear outputs (lists, tables). This format is inadequate for complex, branching domains like software engineering, research, or design.

Key issues:
- Context window limitations
- Catastrophic forgetting
- Hidden prerequisite chains
- No visibility into critical paths

### 1.2 Cognitive Load of Unstructured Learning

According to **Cognitive Load Theory**, working memory is limited. When learners must mentally track dependencies while learning, efficiency drops.

Static roadmaps help but:
- Are rigid
- Do not adapt to prior knowledge
- Reintroduce mental filtering overhead

### 1.3 Node-Based Visualization Solution

Knowledge is represented as a **Directed Acyclic Graph (DAG)**:

- **Nodes** → Learning modules or milestones  
- **Edges** → Dependency relationships  
- **Layout** → Logical progression  

This acts as an external cognitive scaffold, freeing mental resources for learning itself.

---

## 2. User Journey and Experience Design

### 2.1 Phase 1: Intent Capture and Skeleton Generation

- Split UI: Chat (left) + Canvas (right)
- User enters high-level goal
- AI infers topology (parallel & sequential paths)
- Streams structured JSON
- Auto-layout via ELK/Dagre

### 2.2 Phase 2: Interactive Refinement

- User selects nodes
- Chat context becomes node-aware
- AI performs graph mutations (add/replace/delete)
- Layout updates without disrupting structure

### 2.3 Phase 3: Drill-Down and Execution

- Node expansion into subgraphs
- JIT resource retrieval via RAG
- Progress tracking and visual unlocking of next steps

### 2.4 UX Patterns for Complex Graphs

| Pattern | Description | Benefit |
|------|------------|--------|
| Progressive Disclosure | Expand nodes on demand | Lower cognitive load |
| Focus Mode | Dim unrelated nodes | Context clarity |
| Semantic Zoom | Detail changes with zoom | Readability |
| MiniMap | Viewport navigation | Large-graph usability |

---

## 3. System Architecture and Technology Stack

### 3.1 Technology Selection Rationale

**Framework:** Next.js (App Router)  
- Streaming support
- Server Actions
- Full-stack orchestration

**AI:** Vercel AI SDK  
- Structured output
- Streaming JSON
- Provider-agnostic

**Visualization:** React Flow  
- HTML/React-based nodes
- Rich interactivity
- Custom UI embedding

**State:** Zustand  
- High-performance transient updates
- Global coordination

**Database:** Supabase (PostgreSQL + JSONB)  
- Auth + RLS
- Flexible graph storage

---

## 4. Frontend Engineering: Visual Canvas

### 4.1 React Flow Configuration

- Custom nodes & edges
- Smoothstep edges
- Grid snapping
- Minimap + controls

### 4.2 Custom Node Design

- Shadcn UI cards
- Status-based styling
- Toolbars for actions
- Memoized for performance

### 4.3 Automatic Layout (ELK.js)

Why ELK:
- Handles complex DAGs
- Port constraints
- Nested layouts

Process:
1. Measure node dimensions
2. Convert graph → ELK format
3. Compute layout
4. Animate transitions

---

## 5. Generative AI Engineering

### 5.1 Structured Output (Zod Schema)

- Nodes (id, label, difficulty, time)
- Edges (source, target)
- Flat JSON structure

Coordinates handled by UI, **not LLM**.

### 5.2 Prompt Engineering

Key constraints:
- DAG only
- No cycles
- Parallel learning paths
- Actionable granularity

### 5.3 Streaming & Ghost Nodes

- Stream partial JSON
- Render placeholder nodes
- Animate layout incrementally

---

## 6. Interactive Editing via Tool Calling

### 6.1 Available Tools

| Tool | Purpose |
|----|-------|
| add_node | Insert topic |
| delete_node | Remove topic |
| merge_nodes | Combine topics |
| search_resources | Fetch learning links |
| suggest_project | Generate project ideas |

### 6.2 Client-Side Tool Execution

- LLM decides tool call
- Client executes mutation
- Result fed back to AI

---

## 7. Data Persistence (Supabase)

### 7.1 Hybrid Schema Design

Graph stored as JSONB:
- Atomic saves
- No join overhead
- Flexible evolution

### 7.2 Row Level Security

- Owner-only access
- Public read option

### 7.3 Auto-Save Strategy

- Debounced updates
- Optimistic UI
- Server Actions

---

## 8. Content Enrichment (RAG)

### 8.1 Lazy Resource Retrieval

- Triggered per node
- Uses Exa/Tavily
- Summarized & attached

### 8.2 Semantic Search (pgvector)

- Node embeddings
- Natural language navigation
- Graph auto-focus

---

## 9. Zustand Store Design

- Nodes, edges, viewport
- Selection state
- Layout triggers
- Controller-based mutations

---

## 10. Mobile Responsiveness

- Desktop: Full graph
- Mobile: Recursive list view
- Same underlying data model

---

## 11. Security, Testing & Deployment

### Security
- Server-side AI calls
- Rate limiting
- Prompt sanitization

### Testing
- Unit (Vitest)
- Integration (API mocks)
- E2E (Playwright canvas tests)

### Deployment
- Vercel Edge Functions
- Background jobs for long runs

---

## 12. Future Roadmap

- Real-time collaboration (Yjs)
- GitHub project linking
- Public roadmap marketplace

---

**This document provides a complete, production-ready blueprint for building an AI-native roadmap planning platform.**

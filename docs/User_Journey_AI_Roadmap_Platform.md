# User Journey Document  
## AI-Powered Interactive Roadmap Platform

This document presents the **end-to-end user journey** with **vertical box-style diagrams** for clear visual flow in Markdown viewers (GitHub, GitLab, Obsidian, Notion with Mermaid support).

---

## 1. User Persona

**User:** Self-directed learner / developer / professional  
**Goal:** Convert abstract intent into a structured, executable roadmap  
**Pain Point:** Linear plans do not capture dependencies or progress clearly

---

## 2. End-to-End User Journey (Vertical Flow)

```mermaid
flowchart TD
    A[Open Platform]
    B[Login / Signup]
    C[Dashboard]
    D[Create New Roadmap]
    E[Enter High-Level Goal]
    F[AI Analyzes Intent]
    G[Roadmap Skeleton Generated]
    H[Interactive Refinement]
    I[Expand & Add Resources]
    J[Track Progress]
    K[Resume Later]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
```

---

## 3. Intent Capture & AI Understanding

```mermaid
flowchart TD
    U[User Types Goal]
    C[Chat Interface]
    AI[AI Agent]
    T[Topology Analysis]

    U --> C
    C --> AI
    AI --> T
```

---

## 4. Skeleton Roadmap Generation (Graph Creation)

```mermaid
flowchart TD
    R[Root Topic]
    F1[Frontend Track]
    B1[Backend Track]
    D1[Database Track]

    R --> F1
    R --> B1
    R --> D1
```

---

## 5. Chat ↔ Graph Interaction Loop (Core Feature)

```mermaid
flowchart TD
    N[User Selects Node]
    C2[Chat Context Updates]
    Q[User Requests Change]
    AI2[AI Tool Decision]
    G2[Graph Mutation]
    L[Auto Layout]
    V[Visual Update]

    N --> C2
    C2 --> Q
    Q --> AI2
    AI2 --> G2
    G2 --> L
    L --> V
    V --> N
```

---

## 6. Drill-Down & Expansion Flow

```mermaid
flowchart TD
    HN[High-Level Node]
    SG[Generate Subgraph]
    N1[Subtopic 1]
    N2[Subtopic 2]
    N3[Subtopic 3]

    HN --> SG
    SG --> N1
    SG --> N2
    SG --> N3
```

---

## 7. Resource Enrichment (RAG Flow)

```mermaid
flowchart TD
    S[Selected Node]
    RQ[Resource Request]
    API[External Search API]
    AI3[AI Synthesis]
    AT[Attach Resources]

    S --> RQ
    RQ --> API
    API --> AI3
    AI3 --> AT
```

---

## 8. Learning Progress State Transitions

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> InProgress
    InProgress --> Completed
    Completed --> [*]
```

---

## 9. Persistence & Resume Flow

```mermaid
flowchart TD
    A1[User Action]
    AS[Auto Save]
    DB[(Database)]
    RL[Reload Session]
    RS[Restore Graph]

    A1 --> AS
    AS --> DB
    DB --> RL
    RL --> RS
```

---

## 10. Desktop vs Mobile Experience

```mermaid
flowchart TD
    D[Desktop Device]
    M[Mobile Device]
    GV[Graph View]
    LV[List / Accordion View]

    D --> GV
    M --> LV
```

---

## 11. Journey Summary

✔ Intent-first design  
✔ Visual-first planning  
✔ Continuous AI + User feedback loop  
✔ Persistent, resumable learning  

The system acts as a **learning co-pilot**, not a static roadmap generator.

---

**End of User Journey Document**

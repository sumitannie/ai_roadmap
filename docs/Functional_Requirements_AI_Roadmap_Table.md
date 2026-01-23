# Functional Requirements (Tabular Format)
## AI-Powered Interactive Roadmap Platform

This table lists the **functional requirements** of the system in a concise, traceable format suitable for SRS, PRD, and implementation mapping.

---

## 1. User Account & Authentication

| ID | Requirement Description |
|----|-------------------------|
| FR-1.1 | The system shall allow users to sign up and log in using secure authentication mechanisms. |
| FR-1.2 | The system shall support OAuth and email-based authentication methods. |
| FR-1.3 | The system shall restrict roadmap access based on ownership and visibility settings. |
| FR-1.4 | The system shall allow users to mark roadmaps as public or private. |
| FR-1.5 | The system shall maintain authenticated sessions across browser reloads. |
| FR-1.6 | The system shall invalidate user sessions securely on logout. |

---

## 2. Roadmap Creation & Management

| ID | Requirement Description |
|----|-------------------------|
| FR-2.1 | The system shall allow users to create a roadmap by providing a high-level learning or project goal. |
| FR-2.2 | The system shall automatically generate a roadmap title and summary. |
| FR-2.3 | The system shall persist roadmap data without requiring manual save actions. |
| FR-2.4 | The system shall auto-save roadmap changes with debounce control. |
| FR-2.5 | The system shall load previously saved roadmaps on user request. |
| FR-2.6 | The system shall restore graph layout and viewport state when loading a roadmap. |
| FR-2.7 | The system shall allow users to delete roadmaps they own. |
| FR-2.8 | The system shall prevent users from deleting roadmaps owned by others. |

---

## 3. AI-Powered Roadmap Generation

| ID | Requirement Description |
|----|-------------------------|
| FR-3.1 | The system shall generate learning roadmaps as Directed Acyclic Graphs (DAGs). |
| FR-3.2 | The system shall represent learning topics as nodes and dependencies as edges. |
| FR-3.3 | The system shall stream roadmap generation incrementally to the client. |
| FR-3.4 | The system shall render placeholder (ghost) nodes during generation. |
| FR-3.5 | The system shall enforce the absence of circular dependencies. |
| FR-3.6 | The system shall generate parallel learning paths where applicable. |
| FR-3.7 | The system shall allow regeneration of selected roadmap sections without full reset. |

---

## 4. Interactive Graph Editing

| ID | Requirement Description |
|----|-------------------------|
| FR-4.1 | The system shall allow users to select individual nodes within the roadmap graph. |
| FR-4.2 | The system shall display detailed node information upon selection. |
| FR-4.3 | The system shall allow users to add new nodes manually or via AI assistance. |
| FR-4.4 | The system shall allow users to update node content and metadata. |
| FR-4.5 | The system shall allow users to delete nodes and re-route dependencies intelligently. |
| FR-4.6 | The system shall allow users to merge multiple nodes into a single node. |
| FR-4.7 | The system shall allow users to create dependency edges between nodes. |
| FR-4.8 | The system shall validate edge direction and prevent cyclic graphs. |
| FR-4.9 | The system shall automatically re-layout the graph after structural changes. |
| FR-4.10 | The system shall animate layout transitions smoothly. |

---

## 5. Chat–Graph Interaction Loop

| ID | Requirement Description |
|----|-------------------------|
| FR-5.1 | The system shall adapt chat context based on the currently selected node(s). |
| FR-5.2 | The system shall allow users to issue graph modification requests through chat. |
| FR-5.3 | The system shall allow the AI to invoke predefined graph-editing tools. |
| FR-5.4 | The system shall execute AI-requested graph mutations on the client side. |
| FR-5.5 | The system shall reflect AI-driven graph changes immediately in the UI. |
| FR-5.6 | The system shall confirm completed actions in the chat interface. |

---

## 6. Learning Progress Tracking

| ID | Requirement Description |
|----|-------------------------|
| FR-6.1 | The system shall allow users to mark nodes as pending, in-progress, or completed. |
| FR-6.2 | The system shall visually distinguish node states. |
| FR-6.3 | The system shall highlight nodes that become available after prerequisite completion. |
| FR-6.4 | The system shall guide users along the critical learning path visually. |

---

## 7. Content Enrichment & Resources

| ID | Requirement Description |
|----|-------------------------|
| FR-7.1 | The system shall allow users to request learning resources for a selected node. |
| FR-7.2 | The system shall retrieve resources using external search APIs. |
| FR-7.3 | The system shall attach curated resources to roadmap nodes. |
| FR-7.4 | The system shall display attached resources on demand. |
| FR-7.5 | The system shall support semantic search across roadmap nodes. |
| FR-7.6 | The system shall navigate and focus the graph based on semantic matches. |

---

## 8. Visualization & Usability

| ID | Requirement Description |
|----|-------------------------|
| FR-8.1 | The system shall support zooming, panning, and centering of the roadmap graph. |
| FR-8.2 | The system shall provide a minimap for large-graph navigation. |
| FR-8.3 | The system shall highlight directly connected nodes on selection. |
| FR-8.4 | The system shall visually de-emphasize unrelated nodes. |
| FR-8.5 | The system shall support collapsing and expanding node groups. |
| FR-8.6 | The system shall hide low-level details by default to reduce cognitive load. |

---

## 9. Mobile & Responsive Behavior

| ID | Requirement Description |
|----|-------------------------|
| FR-9.1 | The system shall adapt interaction patterns based on device screen size. |
| FR-9.2 | The system shall switch to a list-based roadmap view on mobile devices. |
| FR-9.3 | The system shall preserve roadmap data and progress across devices. |
| FR-9.4 | The system shall synchronize user progress across sessions. |

---

## 10. Data Integrity & Security

| ID | Requirement Description |
|----|-------------------------|
| FR-10.1 | The system shall enforce row-level security for all roadmap data. |
| FR-10.2 | The system shall prevent unauthorized access or modification of roadmaps. |
| FR-10.3 | The system shall apply rate limits to AI-powered operations. |
| FR-10.4 | The system shall notify users when usage limits are exceeded. |

---

## 11. Performance & Reliability

| ID | Requirement Description |
|----|-------------------------|
| FR-11.1 | The system shall maintain responsive interaction for large roadmap graphs. |
| FR-11.2 | The system shall prevent UI blocking during AI generation. |
| FR-11.3 | The system shall handle partial AI failures gracefully. |
| FR-11.4 | The system shall recover safely from interrupted sessions. |

---

## 12. Future-Readiness & Extensibility

| ID | Requirement Description |
|----|-------------------------|
| FR-12.1 | The system shall support future real-time collaboration capabilities. |
| FR-12.2 | The system shall resolve concurrent roadmap edits safely. |
| FR-12.3 | The system shall support adding new node types without breaking existing data. |
| FR-12.4 | The system shall support integration with external platforms and tools. |

---

**This tabular functional requirements document is suitable for traceability, implementation planning, and validation.**

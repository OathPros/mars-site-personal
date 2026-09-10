/**
 * AUTHORITATIVE SOURCE
 * -----------------------------------------------------------------------
 * This is the original Mermaid definition of the MARS Idea-to-Production
 * process, provided as the business-logic source of truth. All structured
 * data in `process.ts` (nodes, edges, requirements, lifecycle mapping) is
 * derived from this diagram. If the process changes, update this file
 * first, then reconcile `process.ts` to match.
 * -----------------------------------------------------------------------
 */
export const mermaidSource = `flowchart TD

    %% =========================================================
    %% 1. IDEA
    %% =========================================================

    A["💡 I HAVE A PROBLEM"]

    A --> D["🗂️ CHECK AI INVENTORY<br/><br/>The problem might already be solved<br/>or someone might already be working<br/>on a solution<br/><br/>• Existing capabilities<br/>• Plugins in development<br/>• Problem being solved<br/>• Owner / unit<br/>• Lifecycle status"]

    D --> B{"🚀 I WANT TO CREATE A NEW SOLUTION?"}

    %% =========================================================
    %% 2. GET STARTED
    %% =========================================================
    B -->|"YES"| F["⬇️ DOWNLOAD / INSTALL MARS"]
    F --> G["🎓 COMPLETE MARS TRAINING"]
    F --> GI["💡 COMPLETE IDEATION GUIDE"]
    F --> GC["🤝 CONSULT AI COMMITTEE"]
    G --> H["➕ CREATE A NEW PLUGIN"]
    GI --> H
    GC --> H

    %% =========================================================
    %% 3. BUILD
    %% =========================================================

    H --> I["🧪 BUILD / VIBE-CODE PLUGIN IN MARS"]
    I --> J{"👥 Do I need York resources, support or involvement outside normal MARS use to continue development?"}

    %% =========================================================
    %% 4A. NEED YORK RESOURCES
    %% =========================================================

    J -->|"YES"| R["🏛️ GO TO IPPM"]
    R --> S["📄 NOTICE OF INTENT / IPPM INTAKE"]
    S --> T["🏗️ CONTINUE DEVELOPMENT AS A FORMAL INITIATIVE"]
    T --> U{"🚦 Is the solution ready to move toward production?"}
    U -->|"YES"| V

    %% =========================================================
    %% 4B. CONTINUE IN MARS
    %% =========================================================

    J -->|"NO"| K["🛠️ CONTINUE PROTOTYPING"]
    K --> L{"🚦 Ready to promote to production?"}
    L -->|"NO"| I

    %% =========================================================
    %% 5. AI DEVELOPMENT COMMITTEE
    %% =========================================================

    L -->|"YES"| M["🤖 AI DEVELOPMENT COMMITTEE"]
    M --> N{"🧭 COMMITTEE RECOMMENDATION"}

    %% =========================================================
    %% 5A. STOP / REDIRECT
    %% =========================================================

    N -->|"Conflict or insufficient value"| O["⛔ STOP / REDIRECT"]

    %% =========================================================
    %% 5B. OPERATIONAL PATH
    %% =========================================================

    N -->|"Operational resources are sufficient"| P["📝 REGULAR CHANGE REQUEST"]
    P --> Q["🛠️ OPERATIONAL RESOURCES OR SUPPORT PROVIDED"]
    Q --> V

    %% =========================================================
    %% 5C. FORMAL PROJECT PATH
    %% =========================================================

    N -->|"Formal initiative required"| R

    %% =========================================================
    %% 6. REQUEST PRODUCTION
    %% =========================================================

    V["📄 REQUEST TO MOVE TO PRODUCTION"]

    %% =========================================================
    %% 7. PRODUCTION REVIEW
    %% =========================================================

    V --> W["🏛️ ITAC / REQUIRED PRODUCTION REVIEW"]
    W --> X{"✅ APPROVED TO MOVE TO PRODUCTION?"}
    X -->|"NO"| Y["🔧 ADDRESS OUTSTANDING PRODUCTION REQUIREMENTS"]
    Y --> V

    %% =========================================================
    %% 8. CHANGE MANAGEMENT
    %% =========================================================

    X -->|"YES"| Z["📝 PRODUCTION CHANGE REQUEST"]

    %% =========================================================
    %% 9. PRODUCTION
    %% =========================================================

    Z --> AA["🚀 DEPLOY TO PRODUCTION"]
    AA --> AB["⚙️ OPERATE & SUPPORT"]

    classDef hero fill:#E31837,color:#FFFFFF,stroke:#B5122B,stroke-width:3px;
    classDef action fill:#FFFFFF,color:#202020,stroke:#E31837,stroke-width:2px;
    classDef form fill:#FFF4F5,color:#202020,stroke:#E31837,stroke-width:3px;
    classDef decision fill:#F4F4F4,color:#202020,stroke:#686868,stroke-width:2px;
    classDef reference fill:#F7F7F7,color:#333333,stroke:#A7A7A7,stroke-width:1.5px;
    classDef governance fill:#202020,color:#FFFFFF,stroke:#202020,stroke-width:3px;
    classDef stop fill:#F1F1F1,color:#333333,stroke:#686868,stroke-width:2px;
    classDef production fill:#E31837,color:#FFFFFF,stroke:#B5122B,stroke-width:3px;
    classDef remediation fill:#F4F4F4,color:#333333,stroke:#686868,stroke-width:1.5px;

    class A hero;
    class F,G,H,I,K,Q,T action;
    class S,P,V,Z form;
    class B,J,L,N,U,X decision;
    class D reference;
    class M,R,W governance;
    class O stop;
    class Y remediation;
    class AA,AB production;

    linkStyle default stroke:#686868,stroke-width:2px;
`;

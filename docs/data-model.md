# Prototype data model

`SolutionRecord` is the stable record used by ideation, inventory and AIDE intake. Its five independent status dimensions are lifecycle stage, review state, governance route, disposition and service state. The model also captures identity, need, value, organizational ownership, platform and MARS details, users, data, integrations, resources, related work, conditions, support, costs, risks, measures, next action and timestamps.

The `PrototypeRepository` interface isolates persistence from React. `IndexedDbRepository` is the default adapter and uses schema version 1. Demonstration records are immutable source data kept separately from user-created IndexedDB records. A one-time migration recognizes only versioned records in known former localStorage keys and never deletes legacy values.

Browser-local creation surfaces display the required prototype notice. Reset removes user records and AIDE drafts, not demonstration source data. JSON repository import/export methods provide a future data-portability seam. No sensitive or confidential information should be entered.

const STUDY_TOPICS = [
  {
    title: "Complexity analysis",
    children: [
      { title: "Definitions: Big-O, Big-Theta, Big-Omega" },
      { title: "Worst vs average case, dominant-operation counting" },
      { title: "Recurrences and solving methods" },
      { title: "Master Theorem applications and edge cases" }
    ]
  },
  {
    title: "C programming foundations for ADS questions",
    children: [
      { title: "Dynamic memory: malloc, calloc, realloc, free" },
      { title: "Pointers and pointer arithmetic" },
      { title: "Arrays and strings, common bugs and idioms" }
    ]
  },
  {
    title: "Linear data structures",
    children: [
      { title: "Arrays: sorted vs unsorted, search/insert/delete costs" },
      { title: "Linked lists: singly vs doubly linked, sentinel tricks" },
      { title: "Abstract data types: stacks and queues, typical ops and costs" }
    ]
  },
  {
    title: "Trees and balanced search trees",
    children: [
      { title: "Binary Search Trees: invariants, traversal orders, costs" },
      { title: "AVL trees: rotations, rebalancing logic, height bounds" },
      { title: "Multiway trees: 2-3-4 trees concepts and operations" }
    ]
  },
  {
    title: "Hash tables and maps",
    children: [
      { title: "Hash functions, load factor, expected performance" },
      { title: "Collision resolution: chaining, linear probing, double hashing" },
      { title: "Deletion strategies and resizing" }
    ]
  },
  {
    title: "Searching",
    children: [
      { title: "Map lookups with balanced trees vs hashing trade-offs" },
      { title: "Cost models and when to choose each structure" }
    ]
  },
  {
    title: "Sorting",
    children: [
      { title: "Distribution counting sort: when it applies, stability, O(n+K)" },
      { title: "Quicksort: partition schemes, average vs worst case, in-place" },
      { title: "Mergesort: split-merge logic, stability, extra space" },
      { title: "Choosing O(n log n) vs O(n+K) based on constraints" }
    ]
  },
  {
    title: "Priority queues and heaps",
    children: [
      { title: "Binary heap representation and invariants" },
      { title: "push, pop, peek complexities" },
      { title: "Heapsort properties" }
    ]
  },
  {
    title: "Disjoint sets (union-find)",
    children: [
      { title: "Representations: arrays vs trees" },
      { title: "Union by rank or size, path compression" },
      { title: "Amortised complexity intuition" }
    ]
  },
  {
    title: "Directed acyclic graphs",
    children: [
      { title: "Topological sort via source removal (Kahn's algorithm)" },
      { title: "Cycle detection ideas and typical pitfalls" }
    ]
  },
  {
    title: "Graphs: core toolkit",
    children: [
      { title: "Representations: adjacency list vs matrix, memory vs speed trade-offs" },
      { title: "Traversals: BFS and DFS use-cases, tree, forward, back, cross edges" },
      { title: "Connectivity: components, strongly connected components basics" },
      { title: "Path finding styles: DFS, BFS, iterative deepening, A* concepts" },
      { title: "Shortest paths: Dijkstra's algorithm requirements and steps" },
      { title: "All-pairs shortest paths: what to know conceptually" },
      { title: "Minimum spanning trees: Prim's algorithm mechanics" }
    ]
  },
  {
    title: "Algorithm design playbook",
    children: [
      { title: "Divide-and-conquer patterns and recurrences" },
      { title: "Greedy choice checks and proving correctness" },
      { title: "Dynamic programming: memoisation example with Fibonacci" },
      { title: "Problem-to-graph modeling patterns" },
      { title: "Choosing the right data structure to meet time and space limits" }
    ]
  },
  {
    title: "Operations and cost summaries",
    children: [
      { title: "Tables for ops on arrays, lists, BSTs, AVL, heaps, hash tables" },
      { title: "Graph op costs under list vs matrix representations" }
    ]
  },
  {
    title: "Exam-style preparation targets",
    children: [
      { title: "Write short C functions that manipulate the above structures" },
      { title: "Step-through runs: execute algorithms on given inputs" },
      { title: "Adjust a classic structure for a variant requirement" },
      { title: "Justify complexity and choose an approach given constraints" }
    ]
  }
];

const STATUS_CYCLE = ["grey", "red", "orange", "yellow", "green"];

function getTargetDate() {
  const targetString = "2025-11-03T13:30:00";
  const targetDate = new Date(targetString);
  const offset = 11 * 60;
  const localOffset = targetDate.getTimezoneOffset();
  const adjustedTime = targetDate.getTime() + (offset + localOffset) * 60 * 1000;
  return new Date(adjustedTime);
}

function updateCountdown() {
  const now = new Date();
  const target = getTargetDate();
  const diff = target - now;

  const countdownEl = document.getElementById("countdown");

  if (diff <= 0) {
    countdownEl.textContent = "EXAM TIME";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 1) {
    countdownEl.textContent = `${days} days`;
  } else {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    countdownEl.textContent = `${hh} hours ${mm} minutes ${ss} seconds`;
  }
}

function buildChecklist(topics, parentPath = "") {
  const ul = document.createElement("ul");

  topics.forEach((topic, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = topic.title;
    span.className = "topic-item";
    span.tabIndex = 0;
    span.setAttribute("role", "button");

    const path = parentPath ? `${parentPath}.${index}` : String(index);
    span.dataset.path = path;

    const savedStatus = localStorage.getItem(`topic-${path}`);
    const initialStatus = savedStatus || "grey";
    span.dataset.status = initialStatus;
    span.setAttribute("aria-pressed", initialStatus !== "grey");

    span.addEventListener("click", () => toggleStatus(span));
    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleStatus(span);
      }
    });

    li.appendChild(span);

    if (topic.children && topic.children.length > 0) {
      const childUl = buildChecklist(topic.children, path);
      li.appendChild(childUl);
    }

    ul.appendChild(li);
  });

  return ul;
}

function toggleStatus(element) {
  const currentStatus = element.dataset.status;
  const currentIndex = STATUS_CYCLE.indexOf(currentStatus);
  const nextIndex = (currentIndex + 1) % STATUS_CYCLE.length;
  const nextStatus = STATUS_CYCLE[nextIndex];

  element.dataset.status = nextStatus;
  element.setAttribute("aria-pressed", nextStatus !== "grey");

  const path = element.dataset.path;
  localStorage.setItem(`topic-${path}`, nextStatus);
}

document.addEventListener("DOMContentLoaded", () => {
  const checklistContainer = document.getElementById("checklist");
  const checklist = buildChecklist(STUDY_TOPICS);

  while (checklist.firstChild) {
    checklistContainer.appendChild(checklist.firstChild);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

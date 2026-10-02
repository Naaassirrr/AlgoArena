const grid = document.getElementById("grid");
const result = document.getElementById("result");
const algorithm = document.getElementById("algorithm");
const gridSize = document.getElementById("gridSize");
const findButton = document.getElementById("findPath");
const resetButton = document.getElementById("reset");

let rows = 18;
let cols = 18;
let start = 0;
let end = rows * cols - 1;
let walls = new Set();
let busy = false;

function createGrid() {
rows = Number(gridSize.value);
cols = rows;
start = 0;
end = rows * cols - 1;
walls.clear();
grid.innerHTML = "";
grid.style.gridTemplateColumns =
`repeat(${cols}, minmax(0, 1fr))`;

for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;

    if (i === start) cell.classList.add("start");
    if (i === end) cell.classList.add("end");

    cell.addEventListener("click", function () {
        if (busy || i === start || i === end) return;

        if (walls.has(i)) {
            walls.delete(i);
            cell.classList.remove("wall");
        } else {
            walls.add(i);
            cell.classList.add("wall");
        }

        result.textContent =
            "Grid updated. Click Find Shortest Path.";
    });

    grid.appendChild(cell);
}

result.textContent =
    "Grid ready. Add walls or find a path.";


}

function getNeighbors(node) {
const r = Math.floor(node / cols);
const c = node % cols;
const neighbors = [];

if (r > 0) neighbors.push(node - cols);
if (r < rows - 1) neighbors.push(node + cols);
if (c > 0) neighbors.push(node - 1);
if (c < cols - 1) neighbors.push(node + 1);

return neighbors.filter(n => !walls.has(n));


}

function heuristic(a, b) {
const ar = Math.floor(a / cols);
const ac = a % cols;
const br = Math.floor(b / cols);
const bc = b % cols;

return Math.abs(ar - br) + Math.abs(ac - bc);


}

function findRoute(useAStar) {
const total = rows * cols;
const distances = Array(total).fill(Infinity);
const previous = Array(total).fill(-1);
const visited = Array(total).fill(false);
const queue = [];

distances[start] = 0;
queue.push({
    node: start,
    priority: useAStar ? heuristic(start, end) : 0
});

let explored = 0;

while (queue.length > 0) {
    queue.sort((a, b) => b.priority - a.priority);

    const current = queue.pop();
    const node = current.node;

    if (visited[node]) continue;
    visited[node] = true;
    explored++;

    if (node === end) break;

    for (const next of getNeighbors(node)) {
        if (visited[next]) continue;

        const newDistance = distances[node] + 1;

        if (newDistance < distances[next]) {
            distances[next] = newDistance;
            previous[next] = node;

            queue.push({
                node: next,
                priority: newDistance +
                    (useAStar ? heuristic(next, end) : 0)
            });
        }
    }
}

const path = [];

if (distances[end] !== Infinity) {
    let current = end;

    while (current !== -1) {
        path.unshift(current);
        current = previous[current];
    }
}

return {
    path: path,
    explored: explored,
    distance: distances[end]
};


}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualize() {
if (busy) return;


busy = true;
findButton.disabled = true;
resetButton.disabled = true;
gridSize.disabled = true;
algorithm.disabled = true;

try {
    const cells = Array.from(grid.children);

    cells.forEach(cell => {
        cell.classList.remove("visited", "path");
    });

    result.textContent = "Searching for the shortest path...";

    const useAStar = algorithm.value === "astar";
    const name = useAStar ? "A* Search" : "Dijkstra's Algorithm";
    const startedAt = performance.now();

    const answer = findRoute(useAStar);
    const elapsed = performance.now() - startedAt;

    for (const node of answer.path) {
        if (node !== start && node !== end) {
            cells[node].classList.add("path");
            await sleep(12);
        }
    }

    if (answer.distance === Infinity) {
        result.textContent =
            `No path found. Explored ${answer.explored} nodes.`;
    } else {
        result.textContent =
            `${name} | Path length: ${answer.distance} steps | ` +
            `Explored: ${answer.explored} nodes | ` +
            `Search time: ${elapsed.toFixed(3)} ms`;
    }
} catch (error) {
    console.error(error);
    result.textContent = "An error occurred. Check the browser Console.";
} finally {
    busy = false;
    findButton.disabled = false;
    resetButton.disabled = false;
    gridSize.disabled = false;
    algorithm.disabled = false;
}


}

findButton.addEventListener("click", visualize);
resetButton.addEventListener("click", function () {
if (!busy) createGrid();
});
gridSize.addEventListener("change", createGrid);

createGrid();

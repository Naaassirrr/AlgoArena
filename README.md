# AlgoArena — Interactive Pathfinding Visualizer

AlgoArena is a web-based visualization tool that demonstrates how pathfinding algorithms find routes through a grid containing obstacles.

## Features

* Interactive grid with start and destination nodes
* Add and remove obstacles by clicking grid cells
* Visualize shortest paths
* Compare Dijkstra's Algorithm and A* Search
* Adjustable grid size
* Path length, explored nodes, and search-time metrics
* Responsive dark-themed interface

## Algorithms

### 1. Dijkstra's Algorithm

Explores nodes according to their shortest known distance from the starting node. It finds an optimal path when edge weights are non-negative.

### 2. A* Search

Uses path cost and a heuristic to guide the search toward the destination. This project uses Manhattan distance for a four-directional grid.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Git and GitHub

## How to Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/Naaassirrr/AlgoArena.git
   ```

2. Open the project folder in VS Code.

3. Open `index.html` using the Live Server extension.

## How to Use

1. Choose Dijkstra's Algorithm or A* Search.
2. Select a grid size.
3. Click grid cells to create obstacles.
4. Select **Find Shortest Path**.
5. Review the resulting path and performance metrics.
6. Select **Reset Grid** to start again.

## Learning Objectives

This project demonstrates graph traversal, shortest-path algorithms, heuristic search, interactive visualization, and basic performance measurement.

## Future Improvements

* Step-by-step exploration animation
* Weighted terrain and diagonal movement
* Automated test cases
* Repeatable algorithm benchmarks

---

Created by **Nasir Alam**

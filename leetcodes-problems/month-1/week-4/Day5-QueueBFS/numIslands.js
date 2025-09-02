/************************************
 * Day 5: Queue in BFS
 *        LeetCode #200: Number of Islands
 ***********************************/

const numIslands = function (grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  const bfsTraversal = (r, c) => {
    const queue = [[r, c]];
    grid[r][c] = "0"; // mark as visited

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      // Directions: up, down, left, right
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          grid[newRow][newCol] === "1"
        ) {
          grid[newRow][newCol] = "0"; // mark as visited
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        bfsTraversal(r, c);
      }
    }
  }

  return islands;
};

// 🌍 Real-World Analogy Solution
// Problem Analogy: Fire spreading in a forest
// 'T' = tree, 'E' = empty space, 'F' = fire starting point
// We want to count how many separate fires start (like islands).

const countFires = function (forest) {
  if (!forest || forest.length === 0) return 0;

  const rows = forest.length;
  const cols = forest[0].length;
  let fires = 0;

  const bfsFireSpread = (r, c) => {
    const queue = [[r, c]];
    forest[r][c] = "E"; // mark burned tree as empty (visited)

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          forest[newRow][newCol] === "T" // if there's a tree
        ) {
          forest[newRow][newCol] = "E"; // burn it
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  // Traverse the forest
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (forest[r][c] === "F") {
        fires++;
        bfsFireSpread(r, c);
      }
    }
  }

  return fires;
};

// 🧪 Example
let forest = [
  ["F", "T", "E", "E"],
  ["T", "E", "E", "F"],
  ["E", "E", "T", "T"],
  ["E", "E", "E", "E"]
];

console.log(countFires(forest)); // Output: 2
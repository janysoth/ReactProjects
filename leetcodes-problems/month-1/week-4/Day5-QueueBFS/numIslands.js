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
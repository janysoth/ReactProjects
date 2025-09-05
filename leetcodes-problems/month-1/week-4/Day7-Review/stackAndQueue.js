/****************************************************
 * 🗓 Day 7: Mock Interview & Recap 
 *
 * Problems Covered:
 * 1. Valid Parentheses (#20)
 * 2. Daily Temperatures (#739)
 * 3. Sliding Window Maximum (#239)
 * 4. Number of Islands (#200)
 ****************************************************/


/****************************************************
 * 1. Valid Parentheses (#20)
 *
 * Use stack + hash map to ensure correct order
 ****************************************************/
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (let char of s) {
    if (char in pairs) {
      // If closing bracket doesn't match last opening → invalid
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

// Example
console.log("Valid Parentheses:", isValid("()[]{}")); // true
console.log("Valid Parentheses:", isValid("(]"));     // false



/****************************************************
 * 2. Daily Temperatures (#739)
 *
 * Monotonic decreasing stack to track next warmer day
 ****************************************************/
function dailyTemperatures(temperatures) {
  const res = Array(temperatures.length).fill(0);
  const stack = []; // stores indices

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      let prevIndex = stack.pop();
      res[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return res;
}

// Example
console.log("Daily Temperatures:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1,1,4,2,1,1,0,0]



/****************************************************
 * 3. Sliding Window Maximum (#239)
 *
 * Deque to maintain indices of maximums in window
 ****************************************************/
function maxSlidingWindow(nums, k) {
  const res = [];
  const deque = []; // store indices in decreasing order of values

  for (let i = 0; i < nums.length; i++) {
    // Remove smaller values from back
    while (deque.length && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(i);

    // Remove front if it's outside the window
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // Record max once window has at least k elements
    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }

  return res;
}

// Example
console.log("Sliding Window Max:", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// [3,3,5,5,6,7]



/****************************************************
 * 4. Number of Islands (#200)
 *
 * BFS with queue to explore islands
 ****************************************************/
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function bfs(r, c) {
    const queue = [[r, c]];
    grid[r][c] = '0'; // mark visited

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const newX = x + dx, newY = y + dy;
        if (
          newX >= 0 && newX < rows &&
          newY >= 0 && newY < cols &&
          grid[newX][newY] === '1'
        ) {
          grid[newX][newY] = '0';
          queue.push([newX, newY]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        bfs(r, c);
      }
    }
  }

  return count;
}

// Example
let grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];
console.log("Number of Islands:", numIslands(grid)); // 1
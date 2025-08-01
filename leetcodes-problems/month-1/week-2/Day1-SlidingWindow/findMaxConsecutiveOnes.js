// Day 1
// Max Consecutive Ones
// Find the maximum number of consecutive 1s in a binary array

function findMaxConsecutiveOnes(nums) {
  let maxCount = 0;
  let currentCount = 0;

  for (let num of nums) {
    if (num === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }

  return maxCount;
};

console.log(findMaxConsecutiveOnes([])); // 0 — Empty array
console.log(findMaxConsecutiveOnes([0, 0, 0])); // 0 — No 1s
console.log(findMaxConsecutiveOnes([1, 1, 1, 1])); // 4 — All 1s
console.log(findMaxConsecutiveOnes([1, 0, 1, 0, 1])); // 1 — Only isolated 1s

/**
 🌍 Real-World Analogy:**

📶 Imagine tracking the **longest streak of uninterrupted mobile signal**.

- When you have **full bars (1)**, your streak continues.
- When you hit a **dead zone (0)**, the streak breaks.
- Your goal is to **remember the longest uninterrupted time** you had full bars.

Just like you mentally track how long your signal lasts before cutting out, the sliding window here tracks how long a series of 1s lasts before being interrupted by a 0.

 */

function maxSignalStreak(signalBars) {
  let maxCount = 0;
  let currentCount = 0;

  for (let bar of signalBars) {
    if (bar === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }

  return maxCount;
}

console.log(maxSignalStreak([1, 1, 0, 1, 1, 1])); // Output: 3
/**********************************************
 * Day 6: Queue + Sliding Window
 *        LeetCode #239: Sliding Window Maximum
 *********************************************/

function maxSlidingWindow(nums, k) {
  let deque = []; // stores indices
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove indices from front if they’re out of this window
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // 2. Remove smaller values from back
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // 3. Add current index
    deque.push(i);

    // 4. Record result once window is valid
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Example test
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]

/********************************************************
 * 🌍 Real-World Analogy Problem
 * A group of friends is walking together. 
 * At any time, only k friends can fit inside a “selfie frame.”
 * We want to know: Who is the tallest friend in each selfie frame as the group moves step by step.
 *******************************************************/

function tallestInSelfieFrame(heights, k) {
  let deque = []; // store indices of friends
  let result = [];

  for (let i = 0; i < heights.length; i++) {
    // 1. Remove out-of-frame friends (older than k steps back)
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // 2. Remove shorter friends from the back
    while (deque.length && heights[deque[deque.length - 1]] < heights[i]) {
      deque.pop();
    }

    // 3. Add current friend’s index
    deque.push(i);

    // 4. Record tallest once frame is filled
    if (i >= k - 1) {
      result.push(heights[deque[0]]);
    }
  }

  return result;
}

// Example test
let heights = [150, 180, 165, 170, 190, 175, 200];
let k = 3;
console.log(tallestInSelfieFrame(heights, k));
// Output: [180, 180, 190, 190, 200]

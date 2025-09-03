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

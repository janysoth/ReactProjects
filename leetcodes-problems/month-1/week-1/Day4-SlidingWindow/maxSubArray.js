//🗓 Day 4: Sliding Window
const maxSubArray = (numbers) => {
  // Edge case: if the array is empty
  if (numbers.length === 0) return 0;

  // Initialize both currentSum and maxSum with the first element
  let currentSum = numbers[0];
  let maxSum = numbers[0];

  // Start from the second element (if any)
  for (let i = 1; i < numbers.length; i++) {
    // At each position, decide whether to: 
    // 1. Start a new subarray (take just the current element)
    // 2. Extend the previous subarray (add current element to previous sum)
    currentSum = Math.max(numbers[i], currentSum + numbers[i]);

    // Update maxSum if the current subarray sum is larger
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

// Kadane's Algorithm with Subarray Tracking
const maxSubArrayWithDetails = numbers => {
  if (numbers.length === 0)
    return {
      maxSum: 0,
      subarray: []
    };

  let currentSum = numbers[0];
  let maxSum = numbers[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > currentSum + numbers[i]) {
      currentSum = numbers[i];
      tempStart = i;
    } else {
      currentSum += numbers[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return {
    maxSum,
    subarray: numbers.slice(start, end + 1)
  };
};

// Test cases:
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([1])); // 1
console.log(maxSubArray([-1])); // -1
console.log(maxSubArray([-2, -1])); // -1

console.log(maxSubArrayWithDetails([5, 4, -1, 7, 8])); // 23
console.log(maxSubArrayWithDetails([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/* ****************************** */

// 🧠 Real-World Analogy:
function maxTemperatureWindow(numbers, k) {
  const result = [];
  const deque = []; // Store indexes

  for (let i = 0; i < numbers.length; i++) {
    // Remove indexes out of current window
    while (deque.length && deque[0] < i - k + 1)
      deque.shift();

    // Remove smaller values in k range as they are useless
    while (deque.length && numbers[deque[deque.length - 1]] < numbers[i])
      deque.pop();

    // Push current index
    deque.push(i);

    // Push max in window to result
    if (i >= k - 1)
      result.push(numbers[deque[0]]);
  };

  return result;
};

// Example usages: 
const temperatures = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;

console.log(maxTemperatureWindow(temperatures, k));
/**
 * LeetCode #209: Minimum Size Subarray Sum -> Classic Sliding Window
 */

function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
};

/**
 * 🌍 Real-World Analogy:
 */

function minStopsForTargetWeight(targetWeight, stops) {
  let left = 0;
  let totalWeight = 0;
  let minStops = Infinity;
  let bestRoute = [];

  for (let right = 0; right < stops.length; right++) {
    totalWeight += stops[right];

    // Shrink window when total weight meets or exceeds target
    while (totalWeight >= targetWeight) {
      if (right - left + 1 < minStops) {
        minStops = right - left + 1;
        bestRoute = stops.slice(left, right + 1);
      }
      totalWeight -= stops[left];
      left++;
    }
  }

  return minStops === Infinity
    ? { minStops: 0, route: [] }
    : { minStops, route: bestRoute };
};

console.log(minStopsForTargetWeight(7, [2, 3, 1, 2, 4, 3]));
// { minStops: 2, route: [4, 3] }

console.log(minStopsForTargetWeight(15, [1, 2, 3, 4, 5]));
// { minStops: 5, route: [1, 2, 3, 4, 5] }

console.log(minStopsForTargetWeight(20, [2, 3, 1, 2]));
// { minStops: 0, route: [] }
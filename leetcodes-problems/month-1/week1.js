// 🗓 Day 6: Prefix Sum

const subarraySum = (numbers, k) => {
  // Create a map to store prefix sum frequencies
  // Initialize with {0: 1} to handle subarrays starting from index 0
  const prefixSumMap = new Map([[0, 1]]);

  let count = 0;        // Counter for subarrays with sum = k
  let prefixSum = 0;     // Running sum

  for (let i = 0; i < numbers.length; i++) {
    // Update the running sum
    prefixSum += numbers[i];

    // If (prefixSum - k) exists in the map, it means there are 
    // subarrays ending at current position with sum = k
    if (prefixSumMap.has(prefixSum - k))
      count += prefixSumMap.get(prefixSum - k);

    // Update prefix sum frequency
    prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);
  };

  return count;
};

// Test cases: 
console.log(subarraySum([1, 1, 1], 2));        // 2
console.log(subarraySum([1, 2, 3], 3));        // 2
console.log(subarraySum([1, -1, 0], 0));       // 3
console.log(subarraySum([4, 2, -1, 5, -3], 1)); // 2
console.log(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7)); // 4

// 🗓 Day 7: Review + Extra

const productExceptSelf = (numbers) => {
  const n = numbers.length;
  const prefix = Array(n).fill(1);
  const suffix = Array(n).fill(1);
  const result = Array(n);

  for (let i = 1; i < n; i++)
    prefix[i] = prefix[i - 1] * numbers[i - 1];

  for (let i = n - 2; i >= 0; i--)
    suffix[i] = suffix[i + 1] * numbers[i + 1];

  for (let i = 0; i < n; i++)
    result[i] = prefix[i] * suffix[i];

  return result;
};

// Test cases:
console.log(productExceptSelf([1, 2, 3, 4]));       // [24, 12, 8, 6]
console.log(productExceptSelf([4, 3, 2, 1]));       // [6, 8, 12, 24]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 2, 2, 2]));
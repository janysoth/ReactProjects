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

// 🌍 Real-World Analogy:

function getSalesBetweenDays(sales, startDay, endDay) {
  // Step 1: Build the prefix sum array
  const prefix = Array(sales.length).fill(0);
  prefix[0] = sales[0];

  for (let i = 1; i < sales.length; i++) {
    prefix[i] = prefix[i - 1] + sales[i];
  }

  // Step 2: Define the query logic inside the function
  if (startDay === 0) {
    return prefix[endDay]; // If starting from the beginning
  } else {
    return prefix[endDay] - prefix[startDay - 1]; // Difference gives range sum
  }
}

// Example usage:
const sales = [100, 200, 150, 300, 250, 100, 400];
const total = getSalesBetweenDays(sales, 2, 5);
console.log("Total sales from day 2 to day 5:", total); // Output: 800
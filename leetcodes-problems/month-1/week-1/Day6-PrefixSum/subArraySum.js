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

const buildPrefixSum = (sales) => {
  const prefix = Array(sales.length).fill(0);
  prefix[0] = sales[0];

  for (let i = 1; i < sales.length; i++) {
    prefix[i] = prefix[i - 1] + sales[i];
  }

  return prefix;
};

const querySales = (prefix, i, j) => {
  if (i === 0) return prefix[j];
  return prefix[j] - prefix[i - 1];
};

const sales = [100, 200, 150, 300, 250, 100, 400];
const prefix = buildPrefixSum(sales);


const total = querySales(prefix, 2, 5);
console.log("Total sales from day 2 to 5:", total); 
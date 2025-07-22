// 🗓 Day 3: Set Usage
// Input: [1, 2, 3, 1] → 1 is seen again → return true
const containsDuplicate = (numbers) => {
  // Create a Set to track unique values
  const set = new Set();

  // Loop through each number in the array
  for (let number of numbers) {
    // If we've seen this number before, return true
    if (set.has(number)) return true;

    // Otherwise, if we've not seen it, add it to the Set
    set.add(number);
  }

  // If we get through the entire array without finding duplicates
  return false;
};

// Alternative one-liner using Set size comparison
function containsDuplicateOneLiner(numbers) {
  return new Set(numbers).size !== numbers.length;
}
// Test cases
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicateOneLiner([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
console.log(containsDuplicate([])); // false - edge case: empty array
console.log(containsDuplicate([1])); // false - edge case: single element

/* ****************************** */

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

// 🗓 Day 5: Hash Map Practice (Group Anagrams)
const groupAnagrams = (strings) => {
  // Create a map to store groups of anagrams
  const map = new Map();

  // Process each string in the input array
  for (const string of strings) {
    // Sort the characters to create a key
    const sortedString = string.split('').sort().join('');

    // If we've seen this sorted string before, add the current string to it
    if (map.has(sortedString))
      map.get(sortedString).push(string);

    // Otherwise, create a new group with this string
    else
      map.set(sortedString, [string]);
  }

  // Convert the map values (the groups to an array of arrays)
  return Array.from(map.values());
};

// Test cases:
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams([""]));
// [[""]]

console.log(groupAnagrams(["a"]));
// [["a"]]

console.log(groupAnagrams(["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc", "cod"]));
// [["cab"], ["tin"], ["pew"], ["duh"], ["may"], ["ill"], ["buy"], ["bar"], ["max"], ["doc"]]

/* ****************************** */

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
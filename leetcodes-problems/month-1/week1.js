// ✅ Day 1 – Two Sum
function twoSum(numbers, target) {
  // Create a hash map to store values and their indices
  const map = new Map();

  // Loop through the array
  for (let i = 0; i < numbers.length; i++) {
    // Calculate the complement (the value we need to find)
    let complement = target - numbers[i];

    // Check if the complete exists in the map
    if (map.has(complement))
      // If found, return both indices
      return [map.get(complement), i];

    // Otherwise, store the current value and its index  
    map.set(numbers[i], i);
  }

  // If no solution is found (though problem guarantees one exits)
  return null;
}

// Alternative Using Object: 
function twoSum2(numbers, target) {
  const map = {}; // Value -> index mapping

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    // Check if complement exists in the map (object)
    if (complement in map)
      return [map[complement], i];

    // Add current number to the map object
    map[numbers[i]] = i;
  }

  // No solution found
  return null;
}

const numbers = [2, 7, 11, 15];
console.log(twoSum(numbers, 9));
console.log(twoSum2(numbers, 9));

/* ****************************** */

// ✅ Day 2 – Valid Anagram

// Using Hash Map
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  for (let char of s)
    count[char] = (count[char] || 0) + 1;

  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}

// Using Sorting
const isAnagramSorting = (s, t) => {
  return s.split('').sort().join('') === t.split('').sort().join('');
};

/* ****************************** */

// 🗓 Day 3: Set Usage
// Input: [1, 2, 3, 1] → 1 is seen again → return true
const containsDuplicate = (numbers) => {
  const set = new Set();

  for (let number of numbers) {
    if (set.has(number)) return true;
    set.add(number);
  }

  return false;
};

//🗓 Day 4: Sliding Window
const maxSubArray = (numbers) => {
  let currentSum = numbers[0];
  let maxSum = numbers[0];

  for (let i = 0; i < numbers.length; i++) {
    currentSum = Math.max(numbers[i], currentSum + numbers[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

// 🗓 Day 5: Hash Map Practice (Group Anagrams)
const groupAnagrams = (strings) => {
  const map = new Map();

  for (let string of strings) {
    const key = string.split('').sort().join('');

    if (!map.has(key))
      map.set(key, []);

    map.get(key).push(string);
  }

  return [...map.values()];
};
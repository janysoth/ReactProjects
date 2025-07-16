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
  // Early return if lengths are different
  if (s.length !== t.length) return false;

  // Create frequency counter object
  const count = {};

  // Count frequency of characters in s
  for (let char of s)
    count[char] = (count[char] || 0) + 1;

  // Decrement count fo each character in t
  for (let char of t) {
    // If character doesn't exist or count becomes negative, not an anagram
    if (!count[char]) return false;

    count[char]--;
  }

  // All counts should be zero if it's an anagram
  return true;
}

// Using Sorting
const isAnagramSorting = (s, t) => {
  return s.split('').sort().join('') === t.split('').sort().join('');
};

// Test Cases
console.log(isAnagram("", "")); // true - empty strings
console.log(isAnagram("a", "a")); // true - same single char
console.log(isAnagram("rat", "car")); // false - different chars
console.log(isAnagram("anagram", "nagaram")); // true - standard case
console.log(isAnagram("hello", "elloh")); // true - rearranged
console.log(isAnagram("aacc", "ccac")); // false - different frequency
console.log(isAnagram("texttwisttime", "timetwisttext")); // true - longer strings
console.log(isAnagram("a", "ab")); // false - different lengths
console.log(isAnagram("💻", "💻")); // true - unicode characters

/* ****************************** */

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
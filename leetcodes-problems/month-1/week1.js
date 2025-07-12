// ✅ Day 1 – Two Sum
function twoSum(numbers, target) {
  const map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    let complement = target - numbers[i];

    if (map.has(complement))
      return [map.get(complement), i];

    map.set(numbers[i], i);
  }
}

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
const isAnagram (s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('');
};

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

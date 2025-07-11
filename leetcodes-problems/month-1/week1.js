// ✅ Day 1 – Two Sum
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (map.has(complement))
      return [map.get(complement), i];

    map.set(nums[i], i);
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

// -------------------------
// 1. Contains Duplicate
// -------------------------
const containsDuplicate = function (nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
};

// Example
console.log("Contains Duplicate:", containsDuplicate([1, 2, 3, 1])); // true
console.log("Contains Duplicate:", containsDuplicate([1, 2, 3, 4])); // false



// -------------------------
// 2. Valid Anagram
// -------------------------
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const map = {};

  for (let char of s) {
    map[char] = (map[char] || 0) + 1;
  }
  for (let char of t) {
    if (!map[char]) return false;
    map[char]--;
  }
  return true;
};

// Example
console.log("Valid Anagram:", isAnagram("anagram", "nagaram")); // true
console.log("Valid Anagram:", isAnagram("rat", "car"));         // false



// -------------------------
// 3. Group Anagrams
// -------------------------
const groupAnagrams = function (strs) {
  const map = new Map();

  for (let word of strs) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }

  return Array.from(map.values());
};

// Example
console.log("Group Anagrams:", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]



// -------------------------
// 4. Top K Frequent Elements
// -------------------------
const topKFrequent = function (nums, k) {
  const freqMap = new Map();
  for (let n of nums) {
    freqMap.set(n, (freqMap.get(n) || 0) + 1);
  }

  const bucket = Array(nums.length + 1).fill().map(() => []);
  for (let [num, freq] of freqMap) {
    bucket[freq].push(num);
  }

  const result = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...bucket[i]);
  }

  return result.slice(0, k);
};

// Example
console.log("Top K Frequent:", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]
console.log("Top K Frequent:", topKFrequent([1], 1));           // [1]
// Week 3 HashMap / Set Solutions
/****************************************************************
🗓 Week 3: HashMap / Set Solutions
****************************************************************/

/****************************************************************
 🗓 Question 1: Contains Duplicate (#217)
 Problem: Check if any number appears at least twice in an array. 
****************************************************************/

// O(n) using Set
const containsDuplicate = function (nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
};

// Short version
const containsDuplicateShort = function (nums) {
  return new Set(nums).size !== nums.length;
};


/****************************************************************
 🗓 Question 2: Valid Anagram (#242)
 Problem: Check if two strings are anagrams.
****************************************************************/

// O(n) frequency counter
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
};


/****************************************************************
 🗓 Question 3: Top K Frequent Elements (#347)
 Problem: Find the k most frequent elements in an array.
****************************************************************/

// O(n log n) approach
var topKFrequentSort = function (nums, k) {
  const freq = new Map();
  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
};

// O(n) bucket sort approach
var topKFrequentBucket = function (nums, k) {
  const freq = new Map();
  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets = Array(nums.length + 1).fill().map(() => []);
  for (let [num, count] of freq.entries()) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
};

/****************************************************************
 🗓 Question 4: Group Anagrams (#49)
 Problem: Group words that are anagrams of each other.
****************************************************************/

// O(n * k log k) where k = word length
var groupAnagrams = function (strs) {
  const map = new Map();

  for (let word of strs) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }

  return Array.from(map.values());
};
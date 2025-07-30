// Week 2 Day 1
// Sliding Window
// Problem LeetCode 3
// Goal: Find the length of the longest substring with no repeating characters
// Key Concepts:
// // Use a set or hashmap to track seen characters.
// // Move the left pointer when a duplicate is found

const lengthOfLongestSubstring = (s) => {
  let set = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};

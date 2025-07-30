// Week 2 Day 1
// Sliding Window
// Problem LeetCode 3
// Goal: Find the length of the longest substring with no repeating characters
// Key Concepts:
// // Use a set or hashmap to track seen characters.
// // Move the left pointer when a duplicate is found

const lengthOfLongestSubstring = (strings) => {
  let set = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < strings.length; right++) {
    while (set.has(strings[right])) {
      set.delete(strings[left]);
      left++;
    }
    set.add(strings[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

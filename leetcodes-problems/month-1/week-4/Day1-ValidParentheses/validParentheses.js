/************************************
 Day 1: Stack Basics LeetCode #20
 ***********************************/

// Solution 1: Using Stack
var isValid = function (s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let char of s) {
    if (char in map) {
      const top = stack.pop();
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};

// Solution 2: Using Counter (only works with parentheses "()")
var isValidParenthesesOnly = function (s) {
  let count = 0;

  for (let char of s) {
    if (char === '(') count++;
    else if (char === ')') {
      count--;
      if (count < 0) return false;
    }
  }

  return count === 0;
};
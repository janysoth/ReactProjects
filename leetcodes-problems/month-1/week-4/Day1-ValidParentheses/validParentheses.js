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

// Real-World Analogy: Plate Dispenser (Stack Simulation)

function isValidPlates(order) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let plate of order) {
    if (plate in map) {
      // Someone tries to take a plate
      const top = stack.pop(); // take last plate
      if (top !== map[plate]) {
        console.log("❌ Wrong plate taken! Invalid order.");
        return false;
      } else {
        console.log(`✅ Correct plate matched: ${map[plate]} with ${plate}`);
      }
    } else {
      // Someone puts a plate on the dispenser
      stack.push(plate);
      console.log(`🍽️ Plate added: ${plate}`);
    }
  }

  if (stack.length === 0) {
    console.log("✅ All plates matched correctly! Dispenser is empty.");
    return true;
  } else {
    console.log("❌ Plates left in dispenser. Invalid order.");
    return false;
  }
}

// Example runs
console.log(isValidPlates("({[]})"));   // true
console.log(isValidPlates("([)]"));     // false
console.log(isValidPlates("((()))"));   // true
console.log(isValidPlates("((())"));    // false
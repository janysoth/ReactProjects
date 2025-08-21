/************************************
 🗓 Day 6: HashMap/Set Variations
************************************/

/* 
🔹 Problem 1: Two Sum
Goal: Use HashMap to find two numbers that add to target
*/
const twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};

// Example
console.log("Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0,1]


/* 
🔹 Problem 2: Intersection of Two Arrays
Goal: Use Set to find common elements
*/
const intersection = function (nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  return [...result];
};

// Example
console.log("Intersection:", intersection([1, 2, 2, 1], [2, 2])); // [2]


/* 
🔹 Problem 3: Happy Number
Goal: Use Set to detect cycles
*/
const isHappy = function (n) {
  const seen = new Set();

  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      let digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }

  return n === 1;
};

// Example
console.log("Is Happy (19):", isHappy(19)); // true
console.log("Is Happy (2):", isHappy(2));   // false


/* 
🔹 Extra: Modify Contains Duplicate to return duplicates
Goal: Use two Sets to track seen and duplicate values
*/
const findDuplicates = function (nums) {
  const seen = new Set();
  const duplicates = new Set();

  for (let num of nums) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }

  return [...duplicates];
};

// Example
console.log("Find Duplicates:", findDuplicates([1, 2, 3, 1, 2, 4])); // [1,2]
console.log("Find Duplicates:", findDuplicates([1, 1, 1])); // [1]
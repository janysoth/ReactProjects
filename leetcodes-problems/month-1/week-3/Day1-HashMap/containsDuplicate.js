// --- Approach 1: Using Set ---
const containsDuplicate = function (nums) {
  const seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
};

// --- Approach 2: Sorting ---
const containsDuplicateSort = function (nums) {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }

  return false;
};
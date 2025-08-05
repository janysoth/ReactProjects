/**
 * Given an integer array nums and an integer k, return the number of subarrays with exactly k different integers.
 * LeetCode #992
 */

function subarraysWithKDistinct(nums, k) {
  const countAtMostK = (k) => {
    let left = 0, count = 0;
    const freq = new Map();

    for (let right = 0; right < nums.length; right++) {
      const num = nums[right];
      freq.set(num, (freq.get(num) || 0) + 1);

      while (freq.size > k) {
        const leftNum = nums[left];
        freq.set(leftNum, freq.get(leftNum) - 1);
        if (freq.get(leftNum) === 0) freq.delete(leftNum);
        left++;
      }

      count += right - left + 1;
    }

    return count;
  };

  return countAtMostK(k) - countAtMostK(k - 1);
};

// Examples:
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // Output: 7

/**
 * Real World Analogy
 * You manage a shopping analytics system. You are given a list of items each customer adds to their cart during a session. You want to find **how many consecutive periods (subsessions)** of shopping contain **exactly** K **different product types**.

 * Think of each session as a timeline (an array), and each product added is a number (or ID). You want to analyze **how many such time slices** had customers looking at **exactly K different product types**.
 */

function countShoppingPeriodsWithKProductTypes(cartTimeline, k) {
  return countAtMostK(cartTimeline, k) - countAtMostK(cartTimeline, k - 1);
}

function countAtMostK(cartTimeline, k) {
  let left = 0;
  let productFreq = {};
  let uniqueProducts = 0;
  let validPeriods = 0;

  for (let right = 0; right < cartTimeline.length; right++) {
    const product = cartTimeline[right];

    if (!productFreq[product]) {
      productFreq[product] = 0;
      uniqueProducts++;
    }
    productFreq[product]++;

    while (uniqueProducts > k) {
      const leftProduct = cartTimeline[left];
      productFreq[leftProduct]--;
      if (productFreq[leftProduct] === 0) {
        delete productFreq[leftProduct];
        uniqueProducts--;
      }
      left++;
    }

    validPeriods += right - left + 1;
  }

  return validPeriods;
};

// Examples:
const cart = [101, 102, 101, 102, 103]; // Product IDs
const k = 2;

console.log(countShoppingPeriodsWithKProductTypes(cart, k));
// Output: 7
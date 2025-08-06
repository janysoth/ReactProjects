/**
 * Given a string s, return the length of the longest substring that contains **at most two distinct characters**.

- **LeetCode #159 – Longest Substring with At Most Two Distinct Characters**
 */

const lengthOfLongestSubstringTwoDistinct = function (s) {
  let left = 0, maxLength = 0;
  const counts = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    counts.set(char, (counts.get(char) || 0) + 1);

    // shrink window if more than 2 distinct characters
    while (counts.size > 2) {
      const leftChar = s[left];
      counts.set(leftChar, counts.get(leftChar) - 1);
      if (counts.get(leftChar) === 0) {
        counts.delete(leftChar);
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

/**
 * **🌍 Real-World Analogy:**

Imagine tracking the types of drinks someone orders in a day.

You want to find the **longest continuous time** where they only ordered **at most two different drinks**. As soon as they order a third type, you start “forgetting” the earliest orders until only two types remain.
 */

function longestTwoDrinkSequence(orders) {
  let left = 0;
  let maxLen = 0;
  let maxStart = 0;
  const drinkCounts = new Map();

  for (let right = 0; right < orders.length; right++) {
    const drink = orders[right];
    drinkCounts.set(drink, (drinkCounts.get(drink) || 0) + 1);

    while (drinkCounts.size > 2) {
      const leftDrink = orders[left];
      drinkCounts.set(leftDrink, drinkCounts.get(leftDrink) - 1);
      if (drinkCounts.get(leftDrink) === 0) {
        drinkCounts.delete(leftDrink);
      }
      left++;
    }

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      maxStart = left;
    }
  }

  return orders.slice(maxStart, maxStart + maxLen);
}

// Example usage:
const orders = ["coffee", "tea", "coffee", "juice", "tea", "tea", "coffee"];
console.log(longestTwoDrinkSequence(orders));
// Output: ["coffee", "tea", "coffee"] or ["tea", "tea", "coffee"]
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


// Real World Analogy

/**
 * Imagine you're walking through a busy street market where each stall sells a unique item. 
 * You want to collect items from as many unique stalls as possible without visiting any stall twice. 
 * The moment you revisit a stall, you stop and count how many unique items you’ve collected.
 * You then start again, this time skipping the first stall you visited previously, 
 * and repeat the process to see if you can find a longer sequence of unique stalls.
 * Your goal? Find the longest continuous stretch of unique stalls you can walk past without repeating any.
 */

function mostUniqueStallItems(marketStalls) {
  let visitedStalls = new Set();
  let walkStart = 0;
  let longestWalk = 0;
  let longestSubstring = "";
  let logs = [];

  for (let currentStall = 0; currentStall < marketStalls.length; currentStall++) {
    const item = marketStalls[currentStall];

    while (visitedStalls.has(item)) {
      visitedStalls.delete(marketStalls[walkStart]);
      walkStart++;
    }

    visitedStalls.add(item);

    const currentLength = currentStall - walkStart + 1;
    if (currentLength > longestWalk) {
      longestWalk = currentLength;
      longestSubstring = marketStalls.slice(walkStart, currentStall + 1);
    }

    logs.push(
      `Walked to stall "${item}" → Current unique stalls: [${[...visitedStalls].join(', ')}] | Longest so far: ${longestWalk}`
    );
  }

  return { longestWalk, longestSubstring, logs };
};

const result = mostUniqueStallItems("pwwkew");

console.log("=== Walk Log for 'pwwkew' ===");
for (let log of result.logs) {
  console.log(log);
};

console.log("✅ Longest Unique Walk Length:", result.longestWalk);
console.log("✅ Longest Unique Substring:", `"${result.longestSubstring}"`);

/**
 * LeetCode #567: Permutation in String using Sliding Window + Frequency Map
 */

const checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  const s1Count = new Array(26).fill(0);
  const s2Count = new Array(26).fill(0);

  // Fill s1 frequency
  for (let char of s1) {
    s1Count[char.charCodeAt(0) - 97]++;
  }

  let matches = 0;

  // Initialize the first window
  for (let i = 0; i < s1.length; i++) {
    let index = s2.charCodeAt(i) - 97;
    s2Count[index]++;
  }

  // Count initial matches
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] === s2Count[i]) matches++;
  }

  // Slide the window
  let left = 0;
  for (let right = s1.length; right < s2.length; right++) {
    if (matches === 26) return true;

    let indexRight = s2.charCodeAt(right) - 97;
    s2Count[indexRight]++;
    if (s1Count[indexRight] === s2Count[indexRight]) {
      matches++;
    } else if (s1Count[indexRight] + 1 === s2Count[indexRight]) {
      matches--;
    }

    let indexLeft = s2.charCodeAt(left) - 97;
    s2Count[indexLeft]--;
    if (s1Count[indexLeft] === s2Count[indexLeft]) {
      matches++;
    } else if (s1Count[indexLeft] - 1 === s2Count[indexLeft]) {
      matches--;
    }

    left++;
  }

  return matches === 26;
};

/**
 * 🌍 Real-World Analogy:
 * 
 * You have a **lock pattern** (pattern) — e.g., "ab" — which is the combination of button presses you use to unlock your phone.

You also have a **log of button presses** from the phone’s history (log).

We want to check if **any consecutive presses** in the log match the lock pattern **in any order** (a permutation).
 */

function lockPatternDetected(pattern, log) {
  if (pattern.length > log.length) return false;

  const patternCount = new Array(26).fill(0);
  const logCount = new Array(26).fill(0);

  // Count each button press in the pattern
  for (let press of pattern) {
    patternCount[press.charCodeAt(0) - 97]++;
  }

  let matches = 0;

  // Initialize the first window in the log
  for (let i = 0; i < pattern.length; i++) {
    logCount[log.charCodeAt(i) - 97]++;
  }

  // Count initial matches
  for (let i = 0; i < 26; i++) {
    if (patternCount[i] === logCount[i]) matches++;
  }

  // Slide the window over the log
  let left = 0;
  for (let right = pattern.length; right < log.length; right++) {
    if (matches === 26) return true;

    // Add the new press (right side of window)
    let idxRight = log.charCodeAt(right) - 97;
    logCount[idxRight]++;
    if (patternCount[idxRight] === logCount[idxRight]) {
      matches++;
    } else if (patternCount[idxRight] + 1 === logCount[idxRight]) {
      matches--;
    }

    // Remove the old press (left side of window)
    let idxLeft = log.charCodeAt(left) - 97;
    logCount[idxLeft]--;
    if (patternCount[idxLeft] === logCount[idxLeft]) {
      matches++;
    } else if (patternCount[idxLeft] - 1 === logCount[idxLeft]) {
      matches--;
    }

    left++;
  }

  return matches === 26;
}

// Example usage:
console.log(lockPatternDetected("ab", "eidbaooo")); // true
console.log(lockPatternDetected("abc", "eidbaooo")); // false
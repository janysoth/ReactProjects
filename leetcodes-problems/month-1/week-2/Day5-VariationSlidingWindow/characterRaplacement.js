/**
 * LeetCode #424: Longest Repeating Character Replacement
 */

function characterReplacement(s, k) {
  let left = 0;
  let maxCount = 0;
  const freq = Array(26).fill(0);

  for (let right = 0; right < s.length; right++) {
    const index = s.charCodeAt(right) - 65;
    freq[index]++;
    maxCount = Math.max(maxCount, freq[index]);

    if (right - left + 1 - maxCount > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }
  }

  return s.length - left;
}

/**
 * Real World Analogy
 * 
 * Imagine you’re formatting a text document where you want a paragraph with a consistent style (e.g. bold). You can fix up to k style mismatches.
 */

function longestFormattedSegment(styles, k) {
  let left = 0;
  let maxCount = 0;
  const freq = new Map();
  let maxLen = 0;
  let bestSegment = "";

  for (let right = 0; right < styles.length; right++) {
    const char = styles[right];
    freq.set(char, (freq.get(char) || 0) + 1);

    maxCount = Math.max(maxCount, freq.get(char));

    while ((right - left + 1 - maxCount) > k) {
      const leftChar = styles[left];
      freq.set(leftChar, freq.get(leftChar) - 1);
      left++;
    }

    const windowLen = right - left + 1;
    if (windowLen > maxLen) {
      maxLen = windowLen;
      bestSegment = styles.slice(left, right + 1);
    }
  }

  return { length: maxLen, segment: bestSegment };
};

console.log(longestFormattedSegment("BIUBIUBI", 1));
// Output: { length: 2, segment: 'BI' }

console.log(longestFormattedSegment("BBIIBBUIB", 2));
// Output: { length: 5, segment: 'BBUIB' }

console.log(longestFormattedSegment("UUUUBBBBUUU", 3));
// Output: { length: 7, segment: 'UBBBBUU' }
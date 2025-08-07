/**
 * LeetCode #1004: Max Consecutive Ones III
 */

const longestOnes = function (nums, k) {
  let left = 0;
  let maxLength = 0;
  let zeroCount = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;

    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

/**
 * 🌍 Real-World Analogy:
 */

function longestWatchableSegment(feedFrames, maxFixes) {
  let left = 0;
  let maxSegment = 0;
  let badFrames = 0;

  for (let right = 0; right < feedFrames.length; right++) {
    if (feedFrames[right] === 0) {
      badFrames++;
    }

    while (badFrames > maxFixes) {
      if (feedFrames[left] === 0) {
        badFrames--;
      }
      left++;
    }

    maxSegment = Math.max(maxSegment, right - left + 1);
  }

  return maxSegment;
}

const cameraFeed = [1, 1, 0, 0, 1, 1, 1, 0, 1, 1]; // 0 = bad frame, 1 = good frame
const maxFixesAllowed = 2;

const longestWatchable = longestWatchableSegment(cameraFeed, maxFixesAllowed);
console.log("📹 Longest watchable segment (after fixing up to 2 bad frames):", longestWatchable);

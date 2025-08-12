// Day 7 Review

// Fixed Size Widow
const fixedWindow = (arr, k) => {
  let sum = 0;
  let maxSum = -Infinity;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];  // Add new element

    // When the window size hits size k
    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, sum);
      sum -= arr[left]; // Remove left element
      left++;
    };
  };

  return maxSum;
};

// Variable Size Window
const variableWindow = (s, target) => {
  let left = 0, count = 0, maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    count += s[right];  // Add new element

    // Condition fails -> shrink
    while (count > target) {
      count -= s[left];
      left++;
    };

    maxLength = Math.max(maxLength, right - left + 1);
  };

  return maxLength;
};

// Frequency Map (String Matching)
const slidingWindowFreq = (s1, s2) => {
  if (s1.length > s2.length) return false;

  const map1 = {}, map2 = {};

  for (let char of s1)
    map1[char] = (map1[char] || 0) + 1;

  let left = 0;

  for (let right = 0; right < s2.length; right++) {
    map2[s2[right]] = (map2[s2[right]] || 0) + 1;

    if (right - left + 1 > s1.length) {
      map2[s2[left]]--;

      if (map2[s2[left]] === 0)
        delete map2[s2[left]];

      left++;
    };

    if (right - left + 1 === s1.length && mapsEqual(map1, map2))
      return true;
  }

  return false;
};

const mapsEqual = (m1, m2) => {
  if (Object.keys(m1).length !== Object.keys(m2).length) return false;

  for (let key in m1)
    if (m1[key] !== m2[key])
      return false;

  return true;
};
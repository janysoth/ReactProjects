// ✅ Day 2 – Valid Anagram

// Using Hash Map
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  for (let char of s)
    count[char] = (count[char] || 0) + 1;

  for (let char of t) {

    if (!count[char]) return false;

    count[char]--;
  }

  return true;
}

// Using Sorting
const isAnagramSorting = (s, t) => {
  return s.split('').sort().join('') === t.split('').sort().join('');
};

// Test Cases
console.log(isAnagram("", "")); // true - empty strings
console.log(isAnagram("a", "a")); // true - same single char
console.log(isAnagram("rat", "car")); // false - different chars
console.log(isAnagram("anagram", "nagaram")); // true - standard case
console.log(isAnagram("hello", "elloh")); // true - rearranged
console.log(isAnagram("aacc", "ccac")); // false - different frequency
console.log(isAnagram("texttwisttime", "timetwisttext")); // true - longer strings
console.log(isAnagram("a", "ab")); // false - different lengths
console.log(isAnagram("💻", "💻")); // true - unicode characters

/* ****************************** */
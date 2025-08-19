// Sorting 
const groupAnagrams = function (strs) {
  const map = new Map();

  for (let str of strs) {
    // Sort string to form key
    let key = str.split("").sort().join("");
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
};

// Frequency Key
const groupAnagramsFrequency = function (strs) {
  const map = new Map();

  for (let str of strs) {
    // Get frequency key
    let key = getCharFrequencyKey(str);

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
};

function getCharFrequencyKey(str) {
  let freq = new Array(26).fill(0);

  for (let char of str) {
    freq[char.charCodeAt(0) - 97]++; // 'a' → index 0
  }

  // Join with '#' to avoid ambiguity
  return freq.join('#');
}
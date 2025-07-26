// 🗓 Day 5: Hash Map Practice (Group Anagrams)
const groupAnagrams = (strings) => {
  const map = new Map();

  for (const string of strings) {
    const sortedString = string.split('').sort().join('');

    if (map.has(sortedString))
      map.get(sortedString).push(string);

    else
      map.set(sortedString, [string]);
  }

  return Array.from(map.values());
};

// Test cases:

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams([""]));
// [[""]]

console.log(groupAnagrams(["a"]));
// [["a"]]

console.log(groupAnagrams(["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc", "cod"]));
// [["cab"], ["tin"], ["pew"], ["duh"], ["may"], ["ill"], ["buy"], ["bar"], ["max"], ["doc"]]


//🌍 Real-World Analogy: Grouping Words by Same Letters (Scrabble Tiles)

function groupAnagrams(words) {
  const map = new Map();

  for (let word of words) {
    // Step 1: Sort the word's characters alphabetically
    const sorted = word.split('').sort().join('');

    // Step 2: Use the sorted word as the key in the map
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    // Step 3: Push the original word into the correct group
    map.get(sorted).push(word);
  }

  // Step 4: Return the grouped values as an array
  return [...map.values()];
}

// Example
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
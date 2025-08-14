// 🔹 Helper function for frequency map
function getFrequencyMap(str) {
  const freq = new Map();
  for (let char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  return freq;
}

// 🔹 Approach 1: Frequency Counting
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const freqS = getFrequencyMap(s);
  const freqT = getFrequencyMap(t);

  for (let [char, count] of freqS) {
    if (freqT.get(char) !== count) return false;
  }
  return true;
};

// 🔹 Approach 2: Sorting
var isAnagramSort = function (s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
};

// ✅ Test
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("rat", "car"));       // false
console.log(isAnagramSort("listen", "silent")); // true

/**
 * 🌍 Real-World Analogy:
 */

// 🧩 Helper: Count how many of each tile (letter) is in the bag
function getTileCount(bag) {
  const count = {};
  for (let tile of bag) {
    count[tile] = (count[tile] || 0) + 1;
  }
  return count;
}

// 🏆 Method 1: Frequency Counting (Counting tiles)
function compareScrabbleBags_Counting(myBag, friendBag) {
  if (myBag.length !== friendBag.length) {
    return "❌ The bags don't match — different number of tiles.";
  }

  const myCount = getTileCount(myBag);
  const friendCount = getTileCount(friendBag);

  for (let tile in myCount) {
    if (myCount[tile] !== friendCount[tile]) {
      return `❌ The bags don't match — tile '${tile}' count is different.`;
    }
  }

  return "✅ The bags match — same letters in the same quantities!";
}

// 🏆 Method 2: Sorting (Lining tiles up alphabetically)
function compareScrabbleBags_Sorting(myBag, friendBag) {
  if (myBag.length !== friendBag.length) {
    return "❌ The bags don't match — different number of tiles.";
  }

  const sortedMyBag = myBag.split('').sort().join('');
  const sortedFriendBag = friendBag.split('').sort().join('');

  if (sortedMyBag === sortedFriendBag) {
    return "✅ The bags match — same letters in the same quantities!";
  } else {
    return "❌ The bags don't match — letters differ.";
  }
}

// 🧪 Test both methods
console.log("🔹 Counting Method:");
console.log(compareScrabbleBags_Counting("listen", "silent")); // ✅
console.log(compareScrabbleBags_Counting("aab", "abb"));       // ❌
console.log(compareScrabbleBags_Counting("rat", "car"));       // ❌

console.log("\n🔹 Sorting Method:");
console.log(compareScrabbleBags_Sorting("listen", "silent")); // ✅
console.log(compareScrabbleBags_Sorting("aab", "abb"));       // ❌
console.log(compareScrabbleBags_Sorting("rat", "car"));       // ❌
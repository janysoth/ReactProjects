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

// 🌍 Real-World Analogy:

// Pantry Organizer by Sorting
function organizePantryBySorting(items) {
  const pantry = {};

  for (let item of items) {
    const recipe = item.split("").sort().join("");

    if (!pantry[recipe]) pantry[recipe] = [];
    pantry[recipe].push(item);
  }

  return Object.values(pantry);
}

// Pantry Organizer by Frequency
function organizePantryByFrequency(items) {
  const pantry = {};

  for (let item of items) {
    const recipe = getRecipeSignature(item);

    if (!pantry[recipe]) pantry[recipe] = [];
    pantry[recipe].push(item);
  }

  return Object.values(pantry);
}

function getRecipeSignature(item) {
  const freq = new Array(26).fill(0);

  for (let char of item) {
    freq[char.charCodeAt(0) - 97]++;
  }

  return freq.join("#");
}


// Example pantry items
const pantryItems = ["flour", "roulf", "sugar", "salt", "tals", "grasu"];

console.log("📦 Pantry grouped by sorting:");
printPantryGroups(organizePantryBySorting(pantryItems));

console.log("\n📦 Pantry grouped by frequency:");
printPantryGroups(organizePantryByFrequency(pantryItems));

// Pretty printer for pantry groups
function printPantryGroups(groups) {
  groups.forEach((group, idx) => {
    console.log(`🪣 Shelf ${idx + 1}: ${group.join(", ")}`);
  });
}
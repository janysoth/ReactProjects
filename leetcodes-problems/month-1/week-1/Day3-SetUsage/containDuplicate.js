// 🗓 Day 3: Set Usage
// Input: [1, 2, 3, 1] → 1 is seen again → return true
const containsDuplicate = (numbers) => {
  const set = new Set();

  for (let number of numbers) {
    if (set.has(number)) return true;

    set.add(number);
  }

  return false;
};


function containsDuplicateOneLiner(numbers) {
  return new Set(numbers).size !== numbers.length;
}

// Test cases
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicateOneLiner([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
console.log(containsDuplicate([])); // false - edge case: empty array
console.log(containsDuplicate([1])); // false - edge case: single element


// 🔍 Real-World Analogy: Guest List at a Wedding

function toTitleCase(name) {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function processGuestList(guestList) {
  const seen = new Map(); // key: normalized name, value: original name
  const duplicates = [];

  for (let fullName of guestList) {
    const normalized = fullName
      .toLowerCase()
      .split(' ')
      .sort()
      .join(' ');

    const titleCaseName = toTitleCase(fullName);

    if (seen.has(normalized)) {
      duplicates.push({
        original: toTitleCase(seen.get(normalized)),
        duplicate: titleCaseName
      });
    } else {
      seen.set(normalized, fullName);
    }
  }

  const cleanedList = Array.from(seen.values())
    .map(toTitleCase)
    .sort((a, b) => a.localeCompare(b));

  // ✅ Console output inside the function
  console.log("✅ Sorted & Cleaned Guest List (No Duplicates):");
  console.log(cleanedList);

  if (duplicates.length > 0) {
    console.log("\n❌ Detected Duplicates:");
    duplicates.forEach(pair =>
      console.log(`Duplicate: "${pair.duplicate}" (original: "${pair.original}")`)
    );
  } else {
    console.log("\n✅ No duplicate guests found.");
  }

  return { cleanedList, duplicates };
}

// 📦 Example Usage:

const guestList = [
  "alice johnson",
  "BOB SMITH",
  "Charlie Lee",
  "johnson alice",   // duplicate
  "Lee Charlie",     // duplicate
  "Diana Prince",
  "prince diana"     // duplicate
];

const { cleanedList, duplicates } = processGuestList(guestList);

console.log("✅ Cleaned Guest List (No Duplicates):");
console.log(cleanedList);

console.log("\n❌ Detected Duplicates:");
duplicates.forEach(pair =>
  console.log(`Duplicate: "${pair.duplicate}" (original: "${pair.original}")`)
);

console.log(processGuestList(guestList));
// --- Approach 1: Using Set ---
const containsDuplicate = function (nums) {
  const seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
};

// --- Approach 2: Sorting ---
const containsDuplicateSort = function (nums) {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }

  return false;
};

/**
 * 🌍 Real-World Analogy:
 */

function isDuplicateGuest(guestList) {
  const guestSet = new Set();

  for (let guest of guestList) {
    console.log(`🛎️ Checking ${guest} at the door...`);

    if (guestSet.has(guest)) {
      console.log(`🚨 Duplicate guest found: ${guest}`);
      return true; // Duplicate detected
    }

    console.log(`✅ Adding ${guest} to the guest list.`);
    guestSet.add(guest);
  }

  console.log("🎉 All guests are unique!");
  return false; // No duplicates
}

// Example run:
isDuplicateGuest(["Alice", "Bob", "Charlie", "Alice"]);
// Output:
// 🛎️ Checking Alice at the door...
// ✅ Adding Alice to the guest list.
// 🛎️ Checking Bob at the door...
// ✅ Adding Bob to the guest list.
// 🛎️ Checking Charlie at the door...
// ✅ Adding Charlie to the guest list.
// 🛎️ Checking Alice at the door...
// 🚨 Duplicate guest found: Alice
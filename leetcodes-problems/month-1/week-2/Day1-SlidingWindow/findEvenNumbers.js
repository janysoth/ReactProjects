// LeetCode #1295 
// Find Numbers with Even Number of Digits

function findEvenNumbers(nums) {
  let count = 0;

  for (let num of nums) {
    if (num.toString().length % 2 === 0) {
      count++;
    }
  }

  return count;
};

console.log(findEvenNumbers([])); // 0 – Empty array
console.log(findEvenNumbers([0])); // 0 – 0 has 1 digit (odd)
console.log(findNumbers([22, 4444, 1, 777777])); // 3 – 22 (2), 4444 (4), 777777 (6)
console.log(findNumbers([1, 3, 5, 7])); // 0 – All have 1 digit

/**
 * 🌍 Real-World Analogy:
 * 📦 Imagine sorting boxes based on their serial number lengths.
 * 📦 Imagine sorting boxes based on their serial number lengths.
 */

function countExpressShippingBoxes(boxIds) {
  let expressCount = 0;

  for (let id of boxIds) {
    const idLength = id.toString().length;

    if (idLength % 2 === 0) {
      expressCount++;
    }
  }

  return expressCount;
};

const boxIds = [123, 22, 4567, 1, 88, 999999];  // Express: 22, 4567, 88, 999999
const result = countExpressShippingBoxes(boxIds);

console.log(`Boxes eligible for express shipping: ${result}`); // Output: 4

console.log(countExpressShippingBoxes([])); // 0 — No boxes
console.log(countExpressShippingBoxes([7])); // 0 — 1 digit
console.log(countExpressShippingBoxes([10, 1000, 5005])); // 3 — All have even digits

// ✅ Alternative (Math-only version, no .toString()):
function countExpressShippingBoxes(boxIds) {
  let expressCount = 0;

  for (let id of boxIds) {
    const digits = Math.floor(Math.log10(id)) + 1;

    if (digits % 2 === 0) {
      expressCount++;
    }
  }

  return expressCount;
}
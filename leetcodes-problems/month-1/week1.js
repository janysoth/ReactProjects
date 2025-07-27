
// 🗓 Day 7: Review + Extra
const productExceptSelf = (numbers) => {
  const n = numbers.length;
  const prefix = Array(n).fill(1);
  const suffix = Array(n).fill(1);
  const result = Array(n);

  for (let i = 1; i < n; i++)
    prefix[i] = prefix[i - 1] * numbers[i - 1];

  for (let i = n - 2; i >= 0; i--)
    suffix[i] = suffix[i + 1] * numbers[i + 1];

  for (let i = 0; i < n; i++)
    result[i] = prefix[i] * suffix[i];

  return result;
};

// Test cases:
console.log(productExceptSelf([1, 2, 3, 4]));       // [24, 12, 8, 6]
console.log(productExceptSelf([4, 3, 2, 1]));       // [6, 8, 12, 24]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 2, 2, 2]));
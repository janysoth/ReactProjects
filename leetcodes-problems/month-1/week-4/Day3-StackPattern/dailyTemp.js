/*****************************************************
 * Day 3: Stack Pattern Applications + Real-World Analogy
 * Problems: 
 *   1. Daily Temperatures (LeetCode 739 - Medium)
 *   2. Next Greater Element (generalized)
 *   3. Real-World Analogy Simulation
 *****************************************************/

/* 
🔍 Problem 1: Daily Temperatures
*/
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // store indices

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      let prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
};

// ✅ Test Daily Temperatures
console.log("Daily Temperatures:");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// Output: [1,1,4,2,1,1,0,0]


/* 
🔍 Problem 2: Next Greater Element (Generalization)
*/
function nextGreaterElement(arr) {
  const n = arr.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      let prevIndex = stack.pop();
      result[prevIndex] = arr[i];
    }
    stack.push(i);
  }

  return result;
}

// ✅ Test Next Greater Element
console.log("\nNext Greater Element:");
console.log(nextGreaterElement([2, 1, 2, 4, 3]));
// Output: [4,2,4,-1,-1]


/* 
🔍 Problem 3: Real-World Analogy Simulation
🌍 Scenario: People waiting in line for a bus that is *less crowded*.
Each person sees if the next bus is less crowded (like finding the next warmer day).
We compute how long each person waits.
*/
function busWaitingTimes(busCrowds) {
  const n = busCrowds.length;
  const result = new Array(n).fill(0);
  const stack = []; // store indices of buses waiting for less crowded one

  for (let i = 0; i < n; i++) {
    while (stack.length && busCrowds[i] < busCrowds[stack[stack.length - 1]]) {
      let prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex; // waiting time
    }
    stack.push(i);
  }

  return result;
}

// ✅ Test Real-World Analogy
console.log("\nBus Waiting Times (less crowded bus analogy):");
console.log(busWaitingTimes([50, 55, 60, 40, 35, 45, 30]));
// Output example: [3,2,1,1,1,0,0]
// Meaning: Person at bus 0 waited 3 buses until less crowded, etc.
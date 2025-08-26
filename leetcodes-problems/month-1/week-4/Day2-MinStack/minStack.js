/************************************
 Day 2: Monotonic Stack Intro 
        LeetCode #155
 ***********************************/

class MinMaxStack {
  constructor() {
    this.stack = [];    // stores actual values
    this.minStack = []; // stores running minimums
    this.maxStack = []; // stores running maximums
  }

  // Push a new value and update min/max
  push(val) {
    this.stack.push(val);

    if (this.minStack.length === 0) {
      this.minStack.push(val);
      this.maxStack.push(val);
    } else {
      const currentMin = this.minStack[this.minStack.length - 1];
      const currentMax = this.maxStack[this.maxStack.length - 1];
      this.minStack.push(Math.min(val, currentMin));
      this.maxStack.push(Math.max(val, currentMax));
    }
  }

  // Remove last element
  pop() {
    if (this.stack.length === 0) return null;
    this.minStack.pop();
    this.maxStack.pop();
    return this.stack.pop();
  }

  // Get top element
  top() {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
  }

  // Get current minimum
  getMin() {
    if (this.minStack.length === 0) return null;
    return this.minStack[this.minStack.length - 1];
  }

  // Get current maximum
  getMax() {
    if (this.maxStack.length === 0) return null;
    return this.maxStack[this.maxStack.length - 1];
  }
}

// 🧪 Example Usage:
const stack = new MinMaxStack();
stack.push(3);
stack.push(5);
stack.push(2);

console.log(stack.getMin()); // 2
console.log(stack.getMax()); // 5

stack.pop(); // removes 2
console.log(stack.getMin()); // 3
console.log(stack.getMax()); // 5

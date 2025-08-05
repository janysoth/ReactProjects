function substrCountExactlyKDistinct(s, k) {
  return atMostK(s, k) - atMostK(s, k - 1);
}

function atMostK(s, k) {
  let left = 0, right = 0;
  let map = new Map();
  let count = 0;

  for (right = 0; right < s.length; right++) {
    let char = s[right];
    map.set(char, (map.get(char) || 0) + 1);

    while (map.size > k) {
      let leftChar = s[left];
      map.set(leftChar, map.get(leftChar) - 1);
      if (map.get(leftChar) === 0) map.delete(leftChar);
      left++;
    }

    count += right - left + 1;
  }

  return count;
}
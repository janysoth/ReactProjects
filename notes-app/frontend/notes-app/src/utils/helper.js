export const validateEmail = (email) => {

  const regex = /^[^\s@]+@[^\s@]+[^\s@]+$/;

  return regex.test(email);
};

export const getInitials = (name) => {

  if (!name) return "";

  const words = name.split(" "); // Split the name into words
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]; // Get the first character of each word
  }

  return initials.toUpperCase(); // Convert initials to uppercase
};
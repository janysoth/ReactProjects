import moment from "moment";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (number) => {
  if (number == null || isNaN(number)) return "";

  const [integerPart, fractionalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeChartData = (data = []) => {
  const chartData = data.map(item => ({
    name: item?.source,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareSortedIncomeChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment.utc(item?.date).format("MMM Do"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment.utc(item?.date).format("MMM Do"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};

export const getTodayDate = () => {
  const today = new Date();

  return today.toISOString().split("T")[0];
};

export const groupTransactionsByDate = (transactions) => {
  const groupedTransactions = {};

  transactions.forEach(transaction => {
    // Convert to UTC and format the date string
    const date = moment.utc(transaction.date).format('MMM Do, YYYY'); // Or any format you prefer

    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }

    groupedTransactions[date].push(transaction);
  });

  return Object.entries(groupedTransactions)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .map(([date, transactions]) => ({
      date,
      transactions,
    }));
};
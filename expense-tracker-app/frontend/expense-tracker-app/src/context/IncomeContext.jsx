import { createContext } from 'react';

const IncomeContext = createContext();

export default IncomeContext;

// const IncomeProvider = ({ children }) => {
//   const [incomeData, setIncomeData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchIncomeDetails = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
//       if (response.data) setIncomeData(response.data);
//     } catch (error) {
//       console.log('Error in fetchIncomeDetails:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddIncome = async ({ source, amount, date, icon }) => {
//     if (!source.trim()) {
//       toast.error("Please enter a valid income source");
//       return false;
//     }

//     if (!amount.trim() || Number(amount) <= 0) {
//       toast.error("Amount should be a valid number greater than 0");
//       return false;
//     }

//     if (!date) {
//       toast.error("Please select a valid date");
//       return false;
//     }

//     try {
//       await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
//         source, amount, date, icon,
//       });
//       toast.success("Income added successfully");
//       fetchIncomeDetails();
//       return true;
//     } catch (error) {
//       console.log("Error in handleAddIncome:", error.response?.data?.message || error.message);
//       toast.error("Error in adding income");
//       return false;
//     }
//   };

//   return (
//     <IncomeContext.Provider value={{ incomeData, loading, fetchIncomeDetails, handleAddIncome }}>
//       {children}
//     </IncomeContext.Provider>
//   );
// };

// export default IncomeProvider;
import { useContext } from "react";

import ExpenseContext from "../context/ExpenseContext";

const useExpense = () => useContext(ExpenseContext);

export default useExpense;
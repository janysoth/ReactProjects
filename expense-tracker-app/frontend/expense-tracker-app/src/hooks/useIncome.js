import { useContext } from 'react';
import IncomeContext from '../context/IncomeContext';

const useIncome = () => useContext(IncomeContext);

export default useIncome;
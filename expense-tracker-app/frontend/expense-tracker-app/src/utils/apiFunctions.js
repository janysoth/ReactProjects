import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from './apiPath';

export const deleteAllTransactions = async () => {
  return await axiosInstance.delete(API_PATHS.DASHBOARD.DELETE_ALL);
};
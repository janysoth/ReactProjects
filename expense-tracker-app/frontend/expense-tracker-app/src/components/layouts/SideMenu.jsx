import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
import { deleteAllTransactions } from '../../utils/apiFunctions';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { incomeData } = useIncome();
  const { expenseData } = useExpense();

  const hasTransactions = incomeData.length > 0 || expenseData.length > 0;

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all transactions?")) {
      try {
        await deleteAllTransactions();
        alert("All transactions deleted.");
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete transactions:", error);
        alert("Error deleting transactions.");
      }
    }
  };

  const onClickImg = () => navigate("/profile-page");

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white p-4 border-r border-gray-200/50 sticky top-[61px] z-20 flex flex-col justify-between">
      {/* Top Section: Avatar and Menu */}
      <div>
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 bg-slate-400 rounded-full cursor-pointer"
              onClick={onClickImg}
            />
          ) : (
            <div onClick={onClickImg}>
              <CharAvatar
                fullName={user?.fullName}
                width="w-20"
                height="h-20"
                style="text-xl"
              />
            </div>
          )}
          <h5 className="text-gray-950 font-medium leading-6">
            {user?.fullName || ""}
          </h5>
        </div>

        {/* Side Menu Items */}
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer
              ${activeMenu === item.label ? "text-white bg-primary" : "text-gray-700 hover:bg-gray-100"}`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>

      {hasTransactions && (
        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm cursor-pointer"
          onClick={handleDeleteAll}
        >
          Delete All Transactions
        </button>
      )}
    </div>
  );
};

export default SideMenu;
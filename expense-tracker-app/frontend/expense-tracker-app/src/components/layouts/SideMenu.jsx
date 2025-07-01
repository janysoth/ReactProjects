import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
import { deleteAllTransactions } from '../../utils/apiFunctions';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu, isOpen, setIsOpen }) => {
  const { user, clearUser } = useContext(UserContext);
  const { incomeData } = useIncome();
  const { expenseData } = useExpense();
  const navigate = useNavigate();

  const hasTransactions = incomeData.length > 0 || expenseData.length > 0;
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleClick = (route) => {
    if (route === 'logout') {
      localStorage.clear();
      clearUser();
      navigate('/login');
      return;
    }
    navigate(route);
    setIsOpen(false);
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Delete all transactions?")) {
      try {
        await deleteAllTransactions();
        alert("All transactions deleted.");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Failed to delete transactions.");
      }
    }
  };

  const onClickImg = () => {
    navigate('/profile-page');
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed top-[61px] left-0 z-40 h-[calc(100vh-61px)] w-64 bg-white p-4 border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col items-center gap-3 mt-4 mb-6">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full cursor-pointer"
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
            <h5 className="font-medium text-gray-900">
              {user?.fullName || ""}
            </h5>
          </div>

          {SIDE_MENU_DATA.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer
                ${activeMenu === item.label
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-700'}
              `}
            >
              <item.icon className="text-xl" />
              {item.label}
            </button>
          ))}
        </div>

        {hasTransactions && (
          <button
            onClick={handleDeleteAll}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm cursor-pointer"
          >
            Delete All Transactions
          </button>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
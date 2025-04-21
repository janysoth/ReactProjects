import {
  LuHandCoins,
  LuLayoutDashboard,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "1",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "2",
    label: "Income",
    icon: LuHandCoins,
    path: "/income",
  },
  {
    id: "3",
    label: "Expense",
    icon: LuWalletMinimal,
    path: "/expense",
  },
  {
    id: "6",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

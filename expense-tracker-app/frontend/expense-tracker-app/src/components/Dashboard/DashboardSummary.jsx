import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";

import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../Cards/InfoCard";

const DashboardSummary = ({
  totalIncome,
  totalExpense,
  totalBalance,
  navigate
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InfoCard
      icon={<LuWalletMinimal />}
      label="Total Income"
      value={addThousandsSeparator(totalIncome)}
      color="bg-green-500"
      onClick={() => navigate("/income")}
    />
    <InfoCard
      icon={<LuHandCoins />}
      label="Total Expense"
      value={addThousandsSeparator(totalExpense)}
      color="bg-red-500"
      onClick={() => navigate("/expense")}
    />
    <InfoCard
      icon={<IoMdCard />}
      label="Total Balance"
      value={addThousandsSeparator(totalBalance)}
      color="bg-primary"
      onClick={() => navigate("/all-transactions")}
    />
  </div>
);

export default DashboardSummary;
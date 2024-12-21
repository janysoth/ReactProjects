import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";

const NavBar = ({ userInfo }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {

  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {userInfo && <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />}

      {userInfo && <ProfileInfo
        userInfo={userInfo}
        onLogout={onLogout}
      />}
    </div>
  );
};

// Define PropTypes
NavBar.propTypes = {
  userInfo: PropTypes.object
};

export default NavBar;
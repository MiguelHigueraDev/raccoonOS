import { useState } from "react";
import classes from "./SearchBar.module.css";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={classes.searchWrapper}>
      <IconSearch className={classes.searchIcon} />
      <input
        className={classes.searchBar}
        type="text"
        value={searchValue}
        placeholder="Search apps, settings, documents..."
        onChange={updateInputValue}
      />
    </div>
  );
};

export default SearchBar;

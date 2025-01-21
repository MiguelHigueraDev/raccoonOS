import classes from "./SearchBar.module.css";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({
  searchTerm,
  updateInputValue,
}: {
  searchTerm: string;
  updateInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={classes.searchWrapper}>
      <IconSearch className={classes.searchIcon} />
      <input
        className={classes.searchBar}
        type="text"
        value={searchTerm}
        placeholder="Search apps, settings, and files..."
        onChange={updateInputValue}
        autoFocus
      />
    </div>
  );
};

export default SearchBar;

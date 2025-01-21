import classes from "./SearchBar.module.css";
import { IconSearch } from "@tabler/icons-react";

interface SearchBarProps {
  searchTerm: string;
  updateInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  updateInputValue,
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

import classes from './SearchBar.module.css';
import { IconSearch } from '@tabler/icons-react';

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
        placeholder="Search apps, settings, documents..."
        onChange={updateInputValue}
      />
    </div>
  );
};

export default SearchBar;

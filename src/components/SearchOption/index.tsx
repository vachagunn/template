import React from "react";

const SearchOption: React.FC<ISearchOptionProps> = ({
  changeHandler,
  title,
  children,
}) => {
  return (
    <div className="search_option">
      <label className="option_title">
        {title}: <br />
        <select
          defaultValue="none"
          className="select_option"
          onChange={changeHandler}
        >
          <option value="none" disabled>
            Select...
          </option>
          {children}
        </select>
      </label>
    </div>
  );
};

export default SearchOption;

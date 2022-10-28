import { useRef } from "react";

const Search = ({ searchedusername, isSuccessful }) => {

  const inputref = useRef();

  const searched = (e) => {
    e.preventDefault();
    const searchKeyword = inputref.current.value;
    searchedusername(searchKeyword);
  };

  return (
    <div className="search same">
      <form onSubmit={searched}>
        <h1>Search for Username</h1>
        <input type="text" ref={inputref} className={isSuccessful === false ? "incorrect-input" : ""} />
        <button>Search</button>
      </form>
      {isSuccessful === false ?
       <p className="invalid">Invalid Username</p>
       : false}
    </div>
  );
};

export default Search;

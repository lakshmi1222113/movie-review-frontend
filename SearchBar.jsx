function SearchBar({ query, setQuery }) {
  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
    </div>
  );
}

export default SearchBar;
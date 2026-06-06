function FilterBar({ region, onRegionChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="field">
        <label htmlFor="region-select">Filter by region</label>
        <select id="region-select" value={region} onChange={(e) => onRegionChange(e.target.value)}>
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort-select">Sort by</label>
        <select id="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">Name (A–Z)</option>
          <option value="population">Population (High–Low)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;

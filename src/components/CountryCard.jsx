import { useNavigate } from "react-router-dom";

function CountryCard({ country, isFavourite, onFavouriteToggle }) {
  const navigate = useNavigate();

  return (
    <article
      className="country-card"
      onClick={() => navigate(`/country/${country.cca3}`)}
      role="button"
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate(`/country/${country.cca3}`);
        }
      }}
    >
      <button
        type="button"
        className={`favourite-button ${isFavourite ? "saved" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          if (onFavouriteToggle) {
            onFavouriteToggle();
          }
        }}
      >
        {isFavourite ? "Remove" : "Save"}
      </button>

      <img src={country.flags?.png} alt={`Flag of ${country.name?.common}`} />

      <div className="country-card-body">
        <h3>{country.name?.common}</h3>
        <p>
          <strong>Population:</strong> {country.population?.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
        </p>
      </div>
    </article>
  );
}

export default CountryCard;

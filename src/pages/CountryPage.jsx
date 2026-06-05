import { useNavigate } from "react-router-dom";

function CountryCard({ country }) {
  const navigate = useNavigate();

  return (
    <div
      className="country-card"
      onClick={() => navigate(`/country/${country.cca3}`)}
    >
      <img
        src={country.flags?.png}
        alt={country.name?.common}
      />

      <h3>{country.name?.common}</h3>

      <p>
        <strong>Population:</strong>{" "}
        {country.population?.toLocaleString()}
      </p>

      <p>
        <strong>Region:</strong> {country.region}
      </p>

      <p>
        <strong>Capital:</strong>{" "}
        {country.capital?.[0] ?? "N/A"}
      </p>
    </div>
  );
}

export default CountryCard;
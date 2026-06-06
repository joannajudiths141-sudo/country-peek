import { Link, useParams } from "react-router-dom";
import useCountry from "../hooks/useCountry";

function CountryPage() {
  const { code } = useParams();
  const { country, loading, error } = useCountry(code);

  return (
    <main className="country-detail-page">
      <Link to="/" className="back-button">
        â† Back to list
      </Link>

      {loading ? (
        <p className="status-message">Loading country detailsï¿½</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : country ? (
        <section className="country-detail-card">
          <img
            src={country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
          />

          <div className="detail-content">
            <h2>{country.name?.common}</h2>
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
        </section>
      ) : (
        <p className="status-message">Country not found.</p>
      )}
    </main>
  );
}

export default CountryPage;


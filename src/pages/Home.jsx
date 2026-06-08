import { useEffect, useMemo, useState } from "react";
import CountryCard from "../components/CountryCard";
import FilterBar from "../components/FilterBar";
import { useFavourites } from "../context/FavouritesContext";

function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const favouriteIds = useMemo(
    () => new Set(favourites.map((country) => country.cca3)),
    [favourites]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital"
        );

        if (!response.ok) {
          throw new Error("Failed to load countries.");
        }

        const data = await response.json();

        if (isMounted) {
          setCountries(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load countries.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCountries = useMemo(() => {
    return [...countries]
      .filter((country) => {
        const name = country.name?.common?.toLowerCase() ?? "";
        const query = search.trim().toLowerCase();
        const matchesSearch = name.includes(query);
        const matchesRegion = region === "All" || country.region === region;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === "population") {
          return b.population - a.population;
        }

        return a.name.common.localeCompare(b.name.common);
      });
  }, [countries, region, search, sortBy]);

  return (
    <main className="home-page">
      <section className="page-header">
        <div>
          <h2>Explore Countries</h2>
          <p>Search by name, filter by region, and sort by name or population.</p>
        </div>
      </section>

      <div className="controls-row">
        <div className="search-field">
          <label htmlFor="country-search">Search countries</label>
          <input
            id="country-search"
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FilterBar
          region={region}
          onRegionChange={setRegion}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {loading ? (
        <p className="status-message">Loading countries…</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : (
        <>
          <p className="status-message">Showing {filteredCountries.length} countries</p>
          <section className="country-grid">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavourite={favouriteIds.has(country.cca3)}
                onFavouriteToggle={() => {
                  if (favouriteIds.has(country.cca3)) {
                    removeFavourite(country.cca3);
                  } else {
                    addFavourite(country);
                  }
                }}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default Home;


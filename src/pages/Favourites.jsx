import CountryCard from "../components/CountryCard";
import { useFavourites } from "../context/FavouritesContext";

function Favourites() {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <main className="home-page">
      <section className="page-header">
        <div>
          <h2>Saved Countries</h2>
          <p>Review the countries you have added to your favourites.</p>
        </div>
      </section>

      {favourites.length === 0 ? (
        <p className="status-message">No favourites yet. Save a country from the Home page.</p>
      ) : (
        <section className="country-grid">
          {favourites.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavourite
              onFavouriteToggle={() => removeFavourite(country.cca3)}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Favourites;

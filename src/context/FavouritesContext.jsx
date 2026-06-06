import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const FAVOURITES_KEY = "country-peek-favourites";

const FavouritesContext = createContext(null);

function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE": {
      const exists = state.favourites.some((country) => country.cca3 === action.payload.cca3);
      if (exists) {
        return state;
      }

      return {
        favourites: [...state.favourites, action.payload],
      };
    }
    case "REMOVE_FAVOURITE": {
      return {
        favourites: state.favourites.filter((country) => country.cca3 !== action.payload),
      };
    }
    default:
      return state;
  }
}

function loadInitialFavourites() {
  if (typeof window === "undefined") {
    return { favourites: [] };
  }

  try {
    const stored = window.localStorage.getItem(FAVOURITES_KEY);
    if (!stored) {
      return { favourites: [] };
    }

    const parsed = JSON.parse(stored);
    return {
      favourites: Array.isArray(parsed) ? parsed : [],
    };
  } catch {
    return { favourites: [] };
  }
}

export function FavouritesProvider({ children }) {
  const [state, dispatch] = useReducer(favouritesReducer, {}, loadInitialFavourites);

  useEffect(() => {
    window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(state.favourites));
  }, [state.favourites]);

  const value = useMemo(
    () => ({
      favourites: state.favourites,
      addFavourite: (country) => dispatch({ type: "ADD_FAVOURITE", payload: country }),
      removeFavourite: (code) => dispatch({ type: "REMOVE_FAVOURITE", payload: code }),
    }),
    [state.favourites]
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }

  return context;
}

export default FavouritesContext;

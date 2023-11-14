import { createContext, useReducer } from "react";
const INITIAL_STATE = {
  dates: [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
  guesthouseName: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    case "SEARCH_BY_NAME":
        return { ...state, guesthouseName: action.payload };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        dates: state.dates,
        options: state.options,
        guesthouseName:state.guesthouseName,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

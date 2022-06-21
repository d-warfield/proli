import React, { createContext, useContext, useReducer } from "react";

// create the data layer
export const StateContext = createContext();

// Build a provider so we can wrap entire app inside of provider so we access data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// This is where we use it in a component
export const useStateValue = () => useContext(StateContext);

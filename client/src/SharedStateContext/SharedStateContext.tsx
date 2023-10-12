// SharedStateContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define shared state
interface SharedState {
  selectedOption: string;
  isOpen: boolean;
  inputValue: string;
  enteredText: string;
  isSearchOpen: boolean;
  searchedValue: string;
  textToBeSearched: string;
  response: any;
}

// Define setters for shared state
interface SharedStateSetters {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setEnteredText: React.Dispatch<React.SetStateAction<string>>;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
  setTextToBeSearched: React.Dispatch<React.SetStateAction<string>>;
  setResponse: React.Dispatch<React.SetStateAction<any>>;
}

// Create contexts for shared state and setters
const SharedStateContext = createContext<SharedState | undefined>(undefined);
const SharedStateSettersContext = createContext<SharedStateSetters | undefined>(
  undefined
);

interface SharedStateProviderProps {
  children: ReactNode;
}

export function SharedStateProvider({ children }: SharedStateProviderProps) {
  // dropdown
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // video
  const [inputValue, setInputValue] = useState("");
  const [enteredText, setEnteredText] = useState("");

  // searchBar
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [textToBeSearched, setTextToBeSearched] = useState("");
  const [response, setResponse] = useState("");

  return (
    <SharedStateContext.Provider
      value={{
        selectedOption,
        isOpen,
        inputValue,
        enteredText,
        isSearchOpen,
        searchedValue,
        textToBeSearched,
        response,
      }}
    >
      <SharedStateSettersContext.Provider
        value={{
          setSelectedOption,
          setIsOpen,
          setInputValue,
          setEnteredText,
          setSearchOpen,
          setSearchedValue,
          setTextToBeSearched,
          setResponse,
        }}
      >
        {children}
      </SharedStateSettersContext.Provider>
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

export function useSharedStateSetters() {
  const context = useContext(SharedStateSettersContext);
  if (context === undefined) {
    throw new Error(
      "useSharedStateSetters must be used within a SharedStateProvider"
    );
  }
  return context;
}

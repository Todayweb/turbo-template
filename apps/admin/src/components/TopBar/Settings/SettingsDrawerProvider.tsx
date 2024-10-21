"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface SettingsDrawerProviderProps {
  children: ReactNode;
}

interface SettingsDrawerContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SettingsDrawerContext = createContext({} as SettingsDrawerContextProps);

export const SettingsDrawerProvider = ({ children }: SettingsDrawerProviderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SettingsDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </SettingsDrawerContext.Provider>
  );
};

export const useSettingsDrawerContext = () => {
  const context = useContext(SettingsDrawerContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};

"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

export type SettingsDrawerProviderProps = {
  children: ReactNode;
  triggerIconOnly?: boolean;
};

type SettingsDrawerContextProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  triggerIconOnly?: boolean;
};

const SettingsDrawerContext = createContext<SettingsDrawerContextProps | null>(null);

export const SettingsDrawerProvider = ({
  children,
  triggerIconOnly,
}: SettingsDrawerProviderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SettingsDrawerContext.Provider value={{ open, setOpen, triggerIconOnly }}>
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

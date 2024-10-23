"use client";

import type { User } from "@prisma/client";
import { type Key, createContext, useContext, useState } from "react";

type TableData = {
  key: string;
  email: string;
  role: string;
};

interface AdministrationProviderProps {
  children: React.ReactNode;
  data: Omit<User, "password">[];
}

interface AdministrationContextProps {
  selectedRowKeys: Key[];
  selectedRows: TableData[];
  onRowChange: (selectedKeys: Key[], selectedRows: TableData[]) => void;
  dataSource: TableData[];
}

export const AdministrationContext = createContext({} as AdministrationContextProps);

export const AdministrationProvider = ({ children, data }: AdministrationProviderProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<TableData[]>([]);

  const dataSource = data.map((user) => ({
    key: user.id,
    email: user.email,
    role: user.role,
  }));

  const onRowChange = (selectedKeys: Key[], selectedRows: TableData[]) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(selectedRows);
  };

  return (
    <AdministrationContext.Provider
      value={{ selectedRowKeys, selectedRows, onRowChange, dataSource }}
    >
      {children}
    </AdministrationContext.Provider>
  );
};

export const useAdministrationContext = () => {
  const context = useContext(AdministrationContext);
  if (!context) {
    throw new Error("useAdministrationContext must be used within a AdministrationProvider");
  }
  return context;
};

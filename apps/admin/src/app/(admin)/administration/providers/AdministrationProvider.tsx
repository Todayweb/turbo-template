"use client";

import type { User } from "@prisma/client";
import { type Key, createContext, useContext, useState } from "react";

export type UserTableData = {
  key: Key;
  email: string;
  role: string;
};

type AdministrationProviderProps = {
  children: React.ReactNode;
  data: Omit<User, "password">[];
};

type AdministrationContextProps = {
  selectedRowKeys: Key[];
  selectedRow?: UserTableData;
  onRowChange: (selectedKeys: Key[], selectedRows: UserTableData[]) => void;
  tableData: UserTableData[];
};

export const AdministrationContext = createContext({} as AdministrationContextProps);

export const AdministrationProvider = ({ children, data }: AdministrationProviderProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<UserTableData | undefined>();

  const tableData = data.map((user) => ({
    key: user.id,
    email: user.email,
    role: user.role,
  }));

  const onRowChange = (selectedKeys: Key[], selectedRows: UserTableData[]) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRow(selectedRows[0]);
  };

  return (
    <AdministrationContext.Provider
      value={{ selectedRowKeys, selectedRow, onRowChange, tableData }}
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

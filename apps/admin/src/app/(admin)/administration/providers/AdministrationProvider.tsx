"use client";

import { Role, User } from "@prisma/client";
import {
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type UserTableData = {
  key: string;
  email: string;
  role: Role;
};

type AdministrationProviderProps = {
  children: ReactNode;
  data: Pick<User, "id" | "email" | "role">[];
  userId: string;
};

type AdministrationContextProps = {
  userId: string;
  selectedRowKeys: Key[];
  selectedRow?: UserTableData;
  onRowChange: (selectedKeys: Key[], selectedRows: UserTableData[]) => void;
  tableData: UserTableData[];
  resetSelectedRows: VoidFunction;
  showAddUserModal: boolean;
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>;
  showUpdateUserModal: boolean;
  setShowUpdateUserModal: Dispatch<SetStateAction<boolean>>;
  showDeleteUserModal: boolean;
  setShowDeleteUserModal: Dispatch<SetStateAction<boolean>>;
};

const AdministrationContext = createContext<AdministrationContextProps | null>(null);

export const AdministrationProvider = ({ children, data, userId }: AdministrationProviderProps) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
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

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRow(undefined);
  };

  return (
    <AdministrationContext.Provider
      value={{
        userId,
        selectedRowKeys,
        selectedRow,
        onRowChange,
        tableData,
        showAddUserModal,
        setShowAddUserModal,
        showUpdateUserModal,
        setShowUpdateUserModal,
        showDeleteUserModal,
        setShowDeleteUserModal,
        resetSelectedRows,
      }}
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

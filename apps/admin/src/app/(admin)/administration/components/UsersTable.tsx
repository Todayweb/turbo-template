"use client";

import { Table, TableProps } from "antd";
import { useTranslations } from "next-intl";
import { UserTableData, useAdministrationContext } from "../providers/AdministrationProvider";

export const UsersTable = () => {
  const t = useTranslations("Administration");
  const { onRowChange, selectedRowKeys, tableData, userId } = useAdministrationContext();

  const columns: TableProps<UserTableData>["columns"] = [
    {
      title: t("userTable.email"),
      key: "email",
      dataIndex: "email",
    },
    {
      title: t("userTable.role"),
      key: "role",
      dataIndex: "role",
      responsive: ["md"],
    },
  ];

  return (
    <Table
      rowSelection={{
        type: "radio",
        onChange: onRowChange,
        selectedRowKeys,
        getCheckboxProps: (record: UserTableData) => ({
          disabled: record.key === userId,
        }),
      }}
      dataSource={tableData}
      columns={columns}
    />
  );
};

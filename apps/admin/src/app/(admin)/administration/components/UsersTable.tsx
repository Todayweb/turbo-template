"use client";

import { Table, type TableProps } from "antd";
import { useTranslations } from "next-intl";
import { type UserTableData, useAdministrationContext } from "../providers/AdministrationProvider";

const columnKeys = ["email", "role"] as const;

export default function UsersTable() {
  const t = useTranslations("Administration");
  const { onRowChange, selectedRowKeys, tableData } = useAdministrationContext();

  const columns: TableProps<UserTableData>["columns"] = columnKeys.map((key) => ({
    title: t(`userTable.${key}`),
    dataIndex: key,
    key: key,
  }));

  return (
    <Table
      rowSelection={{ type: "radio", onChange: onRowChange, selectedRowKeys }}
      dataSource={tableData}
      columns={columns}
    />
  );
}

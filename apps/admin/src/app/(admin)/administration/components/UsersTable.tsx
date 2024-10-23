"use client";

import { Table } from "antd";
import { useTranslations } from "next-intl";
import { useAdministrationContext } from "../providers/AdministrationProvider";

export default function UsersTable() {
  const t = useTranslations("UserTable");
  const { onRowChange, selectedRowKeys, dataSource } = useAdministrationContext();

  const columns = [
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <Table
      rowSelection={{ type: "radio", onChange: onRowChange, selectedRowKeys }}
      dataSource={dataSource}
      columns={columns}
    />
  );
}

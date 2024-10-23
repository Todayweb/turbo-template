"use client";
import { Table } from "antd";
import { useState } from "react";

export default function UsersTable({ dataSource, columns }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(
        selectedKeys.length > 1 ? [selectedKeys[selectedKeys.length - 1]] : selectedKeys,
      );
    },
  };

  return (
    <Table
      rowSelection={{ type: "radio", ...rowSelection }}
      dataSource={dataSource}
      columns={columns}
      onRow={(record) => ({
        onClick: () => {
          setSelectedRowKeys([record.key]);
        },
      })}
    />
  );
}

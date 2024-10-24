"use client";

import { Alert, AlertProps, Form } from "antd";

type Props = Omit<AlertProps, "message"> & {
  message?: string | null;
};

export const FormAlert = ({ showIcon = true, message = null, ...rest }: Props) => {
  if (!message) return null;

  return (
    <Form.Item>
      <Alert message={message} showIcon={showIcon} {...rest} />
    </Form.Item>
  );
};

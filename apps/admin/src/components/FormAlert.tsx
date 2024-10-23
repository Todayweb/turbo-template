"use client";

import { Alert, type AlertProps, Form } from "antd";
import React from "react";

type Props = Omit<AlertProps, "message"> & {
  message?: string | null;
};

export const FormAlert = ({ showIcon = true, message = null, type = "error", ...rest }: Props) => {
  if (!message) return null;

  return (
    <Form.Item>
      <Alert type={type} message={message} showIcon={showIcon} {...rest} />
    </Form.Item>
  );
};

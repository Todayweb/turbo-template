"use client";

import { cn } from "@/utils/cn";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, type ButtonProps } from "antd";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";

export const ActionBar = ({ className, ...rest }: ComponentProps<"div">) => {
  return (
    <div className={cn("flex items-center justify-between gap-2 py-4", className)} {...rest} />
  );
};

export const ActionItems = ({ className, ...rest }: ComponentProps<"div">) => (
  <div className={cn("flex items-center gap-2", className)} {...rest} />
);

export const ActionAddButton = ({
  size = "middle",
  variant = "solid",
  color = "primary",
  icon = <PlusOutlined />,
  ...rest
}: ButtonProps) => {
  const t = useTranslations("ActionBar");

  return (
    <Button size={size} variant={variant} color={color} icon={icon} {...rest}>
      {t("add")}
    </Button>
  );
};

export const ActionUpdateButton = ({
  size = "middle",
  variant = "outlined",
  color = "primary",
  icon = <EditOutlined />,
  ...rest
}: ButtonProps) => {
  const t = useTranslations("ActionBar");

  return (
    <Button size={size} variant={variant} color={color} icon={icon} {...rest}>
      {t("update")}
    </Button>
  );
};

export const ActionDeleteButton = ({
  size = "middle",
  variant = "text",
  color = "danger",
  icon = <DeleteOutlined />,
  ...rest
}: ButtonProps) => {
  const t = useTranslations("ActionBar");

  return (
    <Button size={size} variant={variant} color={color} icon={icon} {...rest}>
      {t("delete")}
    </Button>
  );
};

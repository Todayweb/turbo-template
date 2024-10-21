import { cn } from "@/utils/cn";
import { Typography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";

export const AuthHeading = ({ children, className }: TitleProps) => {
  return (
    <Typography.Title level={2} className={cn("mb-5 flex justify-center", className)}>
      {children}
    </Typography.Title>
  );
};

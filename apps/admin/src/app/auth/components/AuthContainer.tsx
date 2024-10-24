import { ComponentProps } from "react";

export const AuthContainer = (props: ComponentProps<"div">) => {
  return <div className="w-full space-y-4 px-4" {...props} />;
};

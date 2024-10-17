"use client";

import type { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	children: ReactNode;
	className?: string;
	appName: string;
}

export const Button = ({ children, className, appName, ...rest }: ButtonProps) => {
	return (
		<button
			className={className}
			onClick={() => alert(`Hello from your ${appName} app!`)}
			{...rest}
		>
			{children}
		</button>
	);
};

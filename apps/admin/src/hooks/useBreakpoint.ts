import { useWindowSize } from "usehooks-ts";

export const useBreakpoint = () => {
  const { width = 0 } = useWindowSize();

  return {
    isMobile: width < 640,
  };
};

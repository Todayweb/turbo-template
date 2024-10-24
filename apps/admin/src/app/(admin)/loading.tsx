import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="w-full h-full items-center flex justify-center">
      <Spin size="large" />
    </div>
  );
}

import { SettingsDrawer } from "./SettingsDrawer";
import { SettingsDrawerProvider, type SettingsDrawerProviderProps } from "./SettingsDrawerProvider";
import { TriggerButton } from "./TriggerButton";

export type SettingsProps = {
  triggerIconOnly?: SettingsDrawerProviderProps["triggerIconOnly"];
};

export const Settings = ({ triggerIconOnly }: SettingsProps) => {
  return (
    <SettingsDrawerProvider triggerIconOnly={triggerIconOnly}>
      <TriggerButton />
      <SettingsDrawer />
    </SettingsDrawerProvider>
  );
};

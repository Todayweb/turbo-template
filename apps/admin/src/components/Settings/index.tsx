import { SettingsDrawer } from "./components/SettingsDrawer";
import { TriggerButton } from "./components/TriggerButton";
import {
  SettingsDrawerProvider,
  SettingsDrawerProviderProps,
} from "./providers/SettingsDrawerProvider";

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

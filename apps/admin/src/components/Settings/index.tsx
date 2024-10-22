import { SettingsDrawer } from "./SettingsDrawer";
import { SettingsDrawerProvider } from "./SettingsDrawerProvider";
import { TriggerButton } from "./TriggerButton";

export type SettingsProps = {
  iconOnly?: boolean;
};

export const Settings = ({ iconOnly }: SettingsProps) => {
  return (
    <SettingsDrawerProvider>
      <TriggerButton iconOnly={iconOnly} />
      <SettingsDrawer />
    </SettingsDrawerProvider>
  );
};

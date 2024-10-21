import { getCurrentSession } from "@/utils/auth";
import { SettingsDrawer } from "./SettingsDrawer";
import { SettingsDrawerProvider } from "./SettingsDrawerProvider";
import { TriggerButton } from "./TriggerButton";

export const Settings = async () => {
  const { user } = await getCurrentSession();

  return (
    <SettingsDrawerProvider>
      <TriggerButton />
      <SettingsDrawer user={user} />
    </SettingsDrawerProvider>
  );
};

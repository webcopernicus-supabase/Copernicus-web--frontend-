import { getSettings } from "./actions"
import SettingsClient from "@/components/admin/settings-client"

export default async function Settings() {
  const settings = await getSettings()

  return <SettingsClient initialSettings={settings} />
}

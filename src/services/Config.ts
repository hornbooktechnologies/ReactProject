import i18n from '../translations/i18n'
const apiUrl = `${process.env.REACT_APP_API_URL}/dpm`
const plants = [
  { name: i18n.t("NAVIGATION.KAWASAKI") },
  { name: i18n.t("NAVIGATION.HITACHINAKA") },
  { name: i18n.t("NAVIGATION.SHIN_NAGOYA") },
  { name: i18n.t("NAVIGATION.HEKINAN") },
]

const SelectedPlant = { name: i18n.t("NAVIGATION.HEKINAN") }

export { SelectedPlant, apiUrl, plants }

import {  useTranslation } from 'react-i18next'
const LoadingError = () => {
  const { i18n } = useTranslation();
  
  return (
    <div className="d-table vh-100 w-100 loadData">
      <h2 >{i18n.t("LABELS.FAILED_LOAD_DATA")}</h2>
    </div>
  )
}
export default LoadingError;

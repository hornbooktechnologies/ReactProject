import AxiosHttpService from './AxiosHttpService'
import { URLConstants } from '../utils/AppConstants'

export const DpmService = {
  fetchCurrentStatus: (plantname: string, unit: string|null): Promise<any> => {
    const url = URLConstants.GET_CURRENT_STATUS_API_URL(plantname, unit)
    return AxiosHttpService().Get(url)
  },
  fetchAnnualTarget: (plantname: string,unit: string,epochSeconds: number): Promise<any> => {
    const url = URLConstants.GET_ANNUAL_TARGET_API_URL(plantname, unit, epochSeconds)
    return AxiosHttpService().Get(url)
  },
  fetchPowerPlantAssetGroup: (userid: string): Promise<any> => {
    const url = URLConstants.GET_USER_PREF_API_URL(userid)
    return AxiosHttpService().Get(url)
  },
  fetchStoppageData: (
    palntId: string,
    unitCode: string,
  ): Promise<any> => {
    const url = URLConstants.GET_STOPPAGE_API_URL(
      palntId,
      unitCode
    )
    return AxiosHttpService().Get(url)
  },
  fetchKPI_004Data: (plantId: string, unitId: string): Promise<any> => {
    const url = URLConstants.GET_KPI_004_API_URL(plantId, unitId);
    return AxiosHttpService().Get(url);
  },
  fetchKPI_005Data: (plantId: string, unitId: string): Promise<any> => {
    const url = URLConstants.GET_KPI_005_API_URL(plantId, unitId);
    return AxiosHttpService().Get(url);
  },
  fetchSalesData: (plantId: string, unitId: string): Promise<any> => {
    const url = URLConstants.GET_SALES_URL(plantId, unitId)
    return AxiosHttpService().Get(url)
  },
}

import React from 'react';
import { URLConstants } from '../utils/AppConstants'
import { UserPrefModelConstant } from '../utils/AppConstants'

const CurrentStatus = React.lazy(() => import('../components/currentStatus/CurrentStatus'));
const AnnualTarget = React.lazy(() => import('../components/annualTarget/Annualtarget'))
const Layout = React.lazy(() => import('../components/organisms/TheLayout'));
const OutageOutputlimit = React.lazy(() => import('../components/outageOutputlimit/OutageOutputlimit'));
const UnitOperation = React.lazy(() => import('../components/unitOperation/UnitOperation'));

export const Routes = {
  getAllRoutes: (userPreferance: any) => {
    const routes = [
      ...Routes.getFixedRoutes(),
      ...Routes.getDynamicRoutes(userPreferance.generators)
    ]
    return routes
  },
  getDynamicRoutes: (generators: any) => {
    let dynamicRoutesCurrentStatus = generators.map((item) => {
      let unitID = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      return { path:URLConstants.GET_ROUTE_CURRENT_STATUS_PATH(unitID), name: URLConstants.CurrentStatus, component: CurrentStatus }
    })

    let dynamicRoutesAnnualTarget = generators.map((item) => {
      let unitID = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      return { path:URLConstants.GET_ROUTE_ANNUAL_ROUTE_PATH(unitID), name: URLConstants.ANNUAL_TARGET, component: AnnualTarget }
    })

    let dynamicRoutesOutageOutputlimit = generators.map((item) => {
      let unitID = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      return { path:URLConstants.GET_ROUTE_OUTAGE_OUTPUT_LIMIT_PATH(unitID), name: URLConstants.OUTAGE_OUTPUT_LIMIT, component: OutageOutputlimit }
    })

    let dynamicRoutesUnitOperation = generators.map((item) => {
      let unitID = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      return { path:URLConstants.GET_ROUTE_UNIT_OPRATION_PATH(unitID), name: URLConstants.UNIT_OPERATION, component: UnitOperation }
    })

    let dynamicRoutes = [ ...dynamicRoutesCurrentStatus, ...dynamicRoutesAnnualTarget, ...dynamicRoutesOutageOutputlimit,...dynamicRoutesUnitOperation]
    return dynamicRoutes
  },
  getFixedRoutes: () => {
    let fixRoutes = [
      { path: URLConstants.ROUTE_ROOT_PATH, exact: true, name: 'Home' },
      //TODO delete if Home route is not needed 
      { path: URLConstants.ROUTE_HOME_PATH, name: 'Layout', component: Layout},
      { path: URLConstants.ROUTE_CURRENT_STATUS_PATH, name: URLConstants.CurrentStatus, component: CurrentStatus },
      { path: URLConstants.ROUTE_ANUAL_TARGET_PATH, name: URLConstants.ANNUAL_TARGET, component: AnnualTarget },
      { path: URLConstants.ROUTE_OUTAGE_OUTPUT_LIMIT_PATH, name: URLConstants.OUTAGE_OUTPUT_LIMIT, component: OutageOutputlimit },
      { path: URLConstants.ROUTE_UNIT_OPRATION_PATH, name: URLConstants.UNIT_OPERATION, component: UnitOperation },
    ];
    return fixRoutes
  }
}
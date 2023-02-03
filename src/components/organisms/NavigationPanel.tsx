import { NavConstant, AppConstant } from '../../utils/AppConstants'
import i18n from '../../translations/i18n'
import { UserPrefModelConstant, URLConstants } from '../../utils/AppConstants'
import { cssClassName } from '../../utils/CssConstants'
export const NavigationPanel = {
  generateNavigation: (navData: any) => {
    let navMenu
    navMenu = [
      ...NavigationPanel.getOverviewNav(navData.generators),
      ...NavigationPanel.getDynamicNav(navData.generators),
    ]
    return navMenu
  },

  getDynamicNav: (generators: any) => {
    let dynamicNav = generators.map((item) => {
      let generatorName = item[UserPrefModelConstant.GENERATOR_NAME_FOR_DISPLAY]
      let unitId = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      let unitName = item[UserPrefModelConstant.GENERATOR_NAME_FOR_KPI_API]
      let plantUnitId = item[UserPrefModelConstant.POWER_PLANT_UNIT_ID]
      return {
        _tag: NavConstant.SIDEBAR_NAV_DROPDOWN,
        name: generatorName,
        icon: cssClassName.JERA_LAMP_CHARGE,
        unitname: unitName,
        unitId: plantUnitId,
        _children: [
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.CURRENT_STATUS'),
            to: URLConstants.GET_ROUTE_CURRENT_STATUS_PATH(unitId),
            icon: cssClassName.JERA_GRAPH,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.ANNUAL_TARGET'),
            to: URLConstants.GET_ROUTE_ANNUAL_ROUTE_PATH(unitId),
            icon: cssClassName.JERA_GRAPH,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.OUTAGE_OUTPUT_LIMIT'),
            to: URLConstants.GET_ROUTE_OUTAGE_OUTPUT_LIMIT_PATH(unitId),
            icon: cssClassName.JERA_STATUS,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.SPREAD_OPERATING'),
            to: URLConstants.GET_ROUTE_UNIT_OPRATION_PATH(unitId),
            icon: cssClassName.JERA_BUILDING_4,
          },
        ],
      }
    })
    return dynamicNav
  },
  getOverviewNav: () => {
    let overViewNav = [
      {
        _tag: NavConstant.SIDEBAR_NAV_ITEM,
        name: i18n.t('NAVIGATION.OVERVIEW'),
        icon: cssClassName.JERA_HOME_TREND_UP,
        unitname: AppConstant.OVERVIEW,
        _children: [
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.CURRENT_STATUS'),
            to: URLConstants.ROUTE_CURRENT_STATUS_PATH,
            icon: cssClassName.JERA_GRAPH,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.ANNUAL_TARGET'),
            to: URLConstants.ROUTE_ANUAL_TARGET_PATH,
            icon: cssClassName.JERA_GRAPH,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.OUTAGE_OUTPUT_LIMIT'),
            to: URLConstants.ROUTE_OUTAGE_OUTPUT_LIMIT_PATH,
            icon: cssClassName.JERA_STATUS,
          },
          {
            _tag: NavConstant.SIDEBAR_NAV_ITEM,
            name: i18n.t('NAVIGATION.SPREAD_OPERATING'),
            to: URLConstants.ROUTE_UNIT_OPRATION_PATH,
            icon: cssClassName.JERA_BUILDING_4,
          },
        ],
      },
    ]
    return overViewNav
  },
}

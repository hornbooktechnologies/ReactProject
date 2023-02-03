import React from 'react'
import { NavigationPanel } from '../../components/organisms/NavigationPanel'
describe('Component: GetDonutChartSeriesAndValueForCurrentStatus', () => {
  it('getGeneratorDropdownData', () => {
      let navData = {
        "power-plant-id": "HE",
        "power-plant-name-for-display": "Hekinan",
        "power-plant-name-for-kpi-api": "Hekinan",
        "generators": [
            {
                "power-plant-unit-id": "A100",
                "generator-name-for-display": "Generator 1",
                "generator-name-for-kpi-api": "Unit1"
            },
            {
                "power-plant-unit-id": "A200",
                "generator-name-for-display": "Generator 2",
                "generator-name-for-kpi-api": "Unit2"
            },
            {
                "power-plant-unit-id": "A300",
                "generator-name-for-display": "Generator 3",
                "generator-name-for-kpi-api": "Unit3"
            },
            {
                "power-plant-unit-id": "A400",
                "generator-name-for-display": "Generator 4",
                "generator-name-for-kpi-api": "Unit4"
            },
            {
                "power-plant-unit-id": "A500",
                "generator-name-for-display": "Generator 5",
                "generator-name-for-kpi-api": "Unit5"
            }
        ]
    }
      let navMenu
      navMenu = [
        ...NavigationPanel.getOverviewNav(navData.generators),
        ...NavigationPanel.getDynamicNav(navData.generators),
      ]
    return expect(NavigationPanel.generateNavigation(navData)).toStrictEqual(navMenu)
  })
})

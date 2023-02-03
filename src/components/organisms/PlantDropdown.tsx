import React, { useState, useEffect, Fragment } from 'react'
import { UserPrefModelConstant, PlantDropDown } from '../../utils/AppConstants'
import { localStorageUtils } from '../../utils/LocalStorageUtils'
import '../../assets/scss/plantdropdown.scss'
import { cssClassName } from '../../utils/CssConstants'
const PlantDropdown = () => {
  const [plantlist, setPlantlist] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [selectedplantName, setSelectedplantName] = useState('')
  useEffect((): void => {
    let userPreferance = localStorageUtils.getUserPreferences()
    let selectedPlantUserPreferance = localStorageUtils.getSelectedPlantUserPreferance()
    if (userPreferance) {
      setSelectedplantName(
        selectedPlantUserPreferance[
          UserPrefModelConstant.POWER_PLANT_NAME_FOR_DISPLAY
        ]
      )
      setPlantlist(userPreferance)
    }
  }, [])
  const handlePlant = () => {
    let userPreferance = localStorageUtils.getUserPreferences()
    if (userPreferance) {
      setPlantlist(userPreferance)
    }
  }
  const onActivePlantClick = (e) => {
    setIsActive(!isActive)
    e.preventDefault()
  }
  const handlePlantclick = (plantkey: string, plantname: string, e) => {
    setIsActive(!isActive)
    setSelectedplantName(plantname)
    handlePlant()
    e.preventDefault()
    if (plantkey !== '') {
      let powerplantdata = plantlist.find(
        (item) =>
          item[UserPrefModelConstant.POWER_PLANT_NAME_FOR_KPI_API] === plantkey
      )
      localStorageUtils.setSelectedPlantUserPreferance(
        JSON.stringify(powerplantdata)
      )
      window.location.href = '/'
    }
  }
  return (
    <>
      <li className={`uk-dropdown-item ${isActive ? 'active' : ''}`}>
        <a href="false" onClick={(e) => onActivePlantClick(e)}>
          <i className="jera-building icn-18 mr-5" />
          <span>{PlantDropDown.PLANT}</span>
          <i
            className={`${cssClassName.JERA_ARROW_DOWN_1} uk-margin-auto-left`}
          />
        </a>
        <div className={`dropdown-list`}>
          <ul className="uk-dropdown-submenu">
            {plantlist.map((item, index) => {
              const plantkey =
                item[UserPrefModelConstant.POWER_PLANT_NAME_FOR_KPI_API]
              const plantname =
                item[UserPrefModelConstant.POWER_PLANT_NAME_FOR_DISPLAY]
              return (
                <Fragment key={index}>
                  <li
                    key={index}
                    className={`${
                      selectedplantName === plantname ? 'active' : ''
                    }`}
                  >
                    <a
                      href="false"
                      onClick={(e) => handlePlantclick(plantkey, plantname, e)}
                    >
                      <i className="jera-tick-circle icn-check" />
                      <span>{plantname}</span>
                    </a>
                  </li>
                </Fragment>
              )
            })}
          </ul>
        </div>
      </li>
    </>
  )
}

export default React.memo(PlantDropdown)

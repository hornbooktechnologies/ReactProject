  import React, { useState, useEffect, Fragment } from 'react';
import { localStorageUtils } from "../../utils/LocalStorageUtils";
import { NavigationPanel } from "./NavigationPanel";
import { Link } from "react-router-dom";
import { URLConstants, NavConstant } from "../../utils/AppConstants";
import "./../../assets/scss/sidebar.scss";
import { cssClassName } from "../../utils/CssConstants";
const TheSidebar = () => {
  const [navigation, setNavigation] = useState(NavigationPanel.getOverviewNav());
  const [ukShow, setUkShow] = useState(true);
  const [subnav, setSubnav] = useState();
  const [subchildpath, setSubChildPath] = useState(
        window.location.pathname === "/"
      ? URLConstants.ROUTE_CURRENT_STATUS_PATH
      : window.location.pathname
  );
  const [pathName, setPathName] = useState(window.location.pathname === "/"
  ? URLConstants.ROUTE_CURRENT_STATUS_PATH
  : window.location.pathname);

  useEffect((): void => {
    
    let userPreferences = localStorageUtils.getSelectedPlantUserPreferance();
    if (userPreferences) {
      let dynamicNavigation = NavigationPanel.generateNavigation(userPreferences);
      setNavigation(dynamicNavigation);
      dynamicNavigation.map((items)=>(
        items._children.map((children: { to: string; },index: any)=>(
       ( children.to === window.location.pathname) && 
    (
          localStorageUtils.setSelectedPlantUnitId(items && items.unitId && items.unitId.slice(0,3)),
          localStorageUtils.setSelectedUnit(items.unitname)
    )
        ))
      ))  
    }
  }, [subchildpath,ukShow]);
    
  const onSideDropDownClick = (items: any, index: number, e: any) => {
     if (e.target.id === NavConstant.SUBITEMID) {
      setUkShow(true);
    } else if (subnav === index) {
      setUkShow(!ukShow);
    } else {
      setUkShow(true);
    }
    setSubnav(index);
    setPathName("")
  };

  const handlesubItemClick = (children: { to: React.SetStateAction<string>; },i: number) => {
   setSubChildPath(children.to);
  }

  return (
    <>
     <div className="uk-sidebar sidebar-left">
       <ul
          className="uk-sidebar-nav h-100  uk-ps"
          uk-scrollspy="closest: li; scroll: true"
        >
          {navigation.map((items: any, index:number) => {
           return (
              <Fragment key={index}>
                <li
                  className={`uk-sidebar-nav-item uk-c-pointer uk-parent ${
                    items._children &&
                    `uk-sidebar-nav-dropdown ${
                      (subnav === index  || items._children.filter(element => element.to === pathName).length > 0 ) && ukShow ? "uk-show" : ""
                    }`
                  }`}
                  key={index.toString()}
                  onClick={(e) => {
                    onSideDropDownClick(items, index, e);
                  }}
                >
                  <a
                    href="false"
                    className="uk-sidebar-nav-link1"
                    uk-tooltip={`title:${items.name}; pos:left;`}
                    tabIndex={0}
                    onClick={(e)=> e.preventDefault()}
                    >
                    <i className={`${items.icon}`}></i>
                    <span>{items.name}</span>
                    <i className={`${cssClassName.JERA_ARROW_DOWN_1}`}></i>
                  </a>
                  {items._children && (
                    <ul
                      className="uk-sidebar-nav-dropdown-items uk-nav-sub"
                      id={NavConstant.SUBITEMID}
                    >
                      {items._children && items._children.length > 0 &&
                        items._children.map((children: any, i: any) => {
                          return (
                            <Fragment key={i}>
                              <li
                                className="uk-sidebar-nav-item "
                                key={i.toString()}
                                id={NavConstant.SUBITEMID}
                                onClick={() => {handlesubItemClick(children,i)}}
                              >
                                <Link
                                  to={`${children.to}`}
                                  uk-tooltip={`title:${children.name}; pos:left;`}
                                  id={NavConstant.SUBITEMID}
                                  className={`uk-sidebar-nav-link  ${
                                    subchildpath === children.to
                                      ? "uk-active"
                                      : `${cssClassName.COLOR_WHITE}`
                                  }`}
                                >
                                  <i
                                    id={NavConstant.SUBITEMID}
                                    className={`${children.icon}`}
                                  ></i>
                                  <span id={NavConstant.SUBITEMID}>{children.name}</span>
                                </Link>
                              </li>
                            </Fragment>
                          );
                        })}
                    </ul>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default React.memo(TheSidebar);

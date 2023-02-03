import React from "react";
import {  useTranslation } from 'react-i18next'
import icn_user from "../../assets/images/icn-user.svg";
import PlantDropdown from "./PlantDropdown";
import { useLogoutState } from "../../hooks/useLogoutState";
import "../../assets/scss/lang_dropdown.scss";
import { cssClassName } from "../../utils/CssConstants";

const TheUserInfoDropdwon = ({userName}:any) => {
  const { handleLogout } = useLogoutState();
  const { i18n } = useTranslation();

  return (
    <>
      <ul className="uk-nav uk-nav-default">
        <li className="uk-active">
          <a href="false" onClick={(e)=> e.preventDefault()}>
            <img
              src={icn_user}
              alt="icn_user"
              uk-img="true"
              className="icn-user"
            />
            <span className="font-16 ml-5 top-m1 for-w">{userName}</span>
            <i className={`${cssClassName.JERA_ARROW_DOWN_1}`} />
          </a>
          <div
            className="uk-light uk-arrow uk-arrow-bottom-right"
            uk-dropdown="pos:bottom-right; mode:click; offset:15;"
          >
            <ul className="uk-nav uk-navbar-dropdown-nav">
              <li className="uk-nav-header for-m">{userName}</li>
              <li className="uk-nav-divider for-m" />
              <PlantDropdown/>
              <li>
                <a 
                href="false"
                onClick={(e)=>handleLogout(e)}>
                  <i className="jera-logout icn-18 mr-5" />
                  {i18n.t("LOGOUT.LOGOUT_BTN")}
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
};

export default TheUserInfoDropdwon;

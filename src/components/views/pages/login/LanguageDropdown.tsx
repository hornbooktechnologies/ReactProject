import React  from 'react'
import { LanguageDropDown } from '../../../../utils/AppConstants'
import flagjapan from "../../../../assets/images/flag-japan.svg";
import flagusa from "../../../../assets/images/flag-usa.svg";
import {  useTranslation } from 'react-i18next'
import { cssClassName } from '../../../../utils/CssConstants';
import "../../../../assets/scss/lang_dropdown.scss"
const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  
  return (
  <div className="langDropdown uk-navbar-right uk-margin-auto-left">
    <ul className="uk-nav uk-nav-default mr-30">
      <li className="uk-active">
        <a href="false" onClick={(e)=> e.preventDefault()}>
          <i className="jera-global font-20"></i>
          <span className={`font-16 ${cssClassName.COLOR_GREY_BLUE_95} ml-5 for-w`}>
            {i18n.t("LABELS.LANGUAGE")}
          </span>
          <span className={`font-16 ${cssClassName.COLOR_GREY_BLUE_95} ml-5 for-m`}> {i18n.t("LABELS.LAN")} </span>
          <i className={`${cssClassName.JERA_ARROW_DOWN_1} font-14`}></i>
        </a>
        <div
          className="uk-light uk-arrow uk-arrow-bottom-right"
          uk-dropdown="pos:bottom-right; mode:click; offset:15;"
        >
          <ul className="uk-nav uk-navbar-dropdown-nav">
            <li>
              <a href="false" onClick={(e)=>e.preventDefault()} className='disabled'>
                <img 
                  src={flagjapan}
                  alt="flagJapan"
                  uk-img="true"
                  className="mr-5"
                />
                {i18n.t("LABELS.JAPANESE")}
              </a>
            </li>
            <li>
              <a href="false" onClick={(e)=>e.preventDefault()}>
                <img
                  src={flagusa}
                  alt="flagUSA"
                  uk-img="true"
                  className="mr-5"
                />
                {LanguageDropDown.LANG_ENGLISH}
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  )
}

export default LanguageDropdown
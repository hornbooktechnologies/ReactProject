import { useEffect, useState } from "react";
import LanguageDropdown from "../views/pages/login/LanguageDropdown";
import { localStorageUtils } from "../../utils/LocalStorageUtils";
import { UserInfo } from "../../data/types/UserInfo";
import TheUserInfoDropdwon from "./TheUserInfoDropdwon";
import logo from "../../assets/images/logo.svg";
import logo_sm from "../../assets/images/logo-sm.svg";
import "../../assets/scss/header.scss";

const TheHeader = ({handleClickSmSidebar,smsidebar} : any) => {
  const [userName, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    var userInfo: UserInfo | undefined = localStorageUtils.getUserInfo();
    if (userInfo?.profile?.displayName) {
      setUsername(userInfo?.profile?.displayName);
    }
    var loginInfo: boolean =  localStorageUtils.getIsLoggedIn();
    setIsLoggedIn(loginInfo)
  }, []);

  
  return (
    <>
    <div
       uk-sticky="true"
        className="dark-header uk-sticky uk-active uk-sticky-below uk-sticky-fixed sticky-header"
      >
        <div className="uk-container uk-container-expand">
          <nav uk-navbar="true" className="top-header uk-navbar">
            <div className="uk-navbar-left">
              <a
                href="/"
                id="uk-logo"
                className={`uk-navbar-item uk-padding-remove ${smsidebar ? "uk-logo-sm":"uk-logo"}`}
              >
                {smsidebar ? <img src={logo_sm} alt="logo_sm" uk-img="true"/> : 
                <img src={logo} alt="logo" uk-img="true"/>}
              </a>
            </div>
            {isLoggedIn === true && <a
              href="false"
              id="sidebar-toggle"
              className="uk-navbar-toggle uk-padding-remove ml-90 uk-mt-20"
              onClick={(e)=>handleClickSmSidebar(e)}
            >
              <i className="jera jera-menu-arrow uk-text-primary"></i>
            </a>}
            <div className="uk-navbar-right">
              <LanguageDropdown />
              {isLoggedIn === true &&  <TheUserInfoDropdwon userName={userName}/> }
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TheHeader;

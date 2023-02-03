import React, { useState } from "react";
import { TheContent, TheSidebar, TheHeader, TheFooter } from "./index";

const TheLayout = () => {
  const [smsidebar, setSmsidebar] = useState(false);

  const handleClickSmSidebar = (e) => {
    setSmsidebar(!smsidebar);
    e.preventDefault();
  };
  return (
    <>
      <div className={`uk-light dark-body ${smsidebar ? "sm-sidebar":""}`}>
        <TheHeader handleClickSmSidebar={(e)=>handleClickSmSidebar(e)} smsidebar={smsidebar}/>
        <div className="main-content">
          <TheSidebar />
          <div id="content-section" className="content">
            <div className="content-padder">
              <TheContent />
            </div>
          </div>
        </div>
        <TheFooter />
      </div>
    </>
  );
};

export default TheLayout;

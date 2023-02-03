import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomTabModel } from '../../models/CustomTabModel'

const CustomTabs = (tabObj: CustomTabModel) => {
  const { i18n } = useTranslation();
  return (
    <>
     <ul uk-tab="true" className={['uk-tab', tabObj.customCssClass].join(' ')}>
        { tabObj.tabs?.map((tab: { tabId: string, i8nCode: string }, index) => (
            <li
              key={index}
              className={`${tabObj.selectedTab === tab.tabId ? "uk-active" : ""}`}
              onClick={(e) => {
                  tabObj.onTabSelect.call(this, tab.tabId);
              }}
            >
                <a href="about:blank"> {i18n.t(tab.i8nCode)}</a>
            </li>
        ))}
      </ul>
    </>
  )
}

export default CustomTabs

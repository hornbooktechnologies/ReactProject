import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomTabModel } from '../../../models/CustomTabModel'
import { DurationOfSpreadTypeModel } from '../../../models/unitOperation/UnitOperationModel'
import { AppConstant } from '../../../utils/AppConstants'
import CustomTabs from '../../common/CustomTabs'
import DurationOfSpreadTable from './DurationOfSpreadTable'

const Top20DurationOfSpread = (top20DurationOfSpread: DurationOfSpreadTypeModel) => {
    const { i18n } = useTranslation()
    const [selectedTab, setSelectedTab] = useState(
        AppConstant.ACTUAL
    );
    
    const handleTabSelection = (selectedTab: string) => {
        setSelectedTab(selectedTab);
    };

    const tabData: CustomTabModel = {
        selectedTab: selectedTab,
        onTabSelect : handleTabSelection,
        tabs: [{
          tabId: 'Actual',
          i8nCode: 'LABELS.ACTUAL'
        }, {
          tabId: 'Forecast',
          i8nCode: 'LABELS.FORECAST'
        }]
    }
    return (
        <>
            <h5 className="mb-24 mt-24 font-18 uk-text-medium">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_HEADER')}</h5>
            <CustomTabs {...tabData} />
            <ul className="uk-switcher mt-24">
              {(() => {
                switch (selectedTab) {
                  case AppConstant.ACTUAL:
                    return <DurationOfSpreadTable {...top20DurationOfSpread.actual} />;
                  case AppConstant.FORECAST:
                    return <DurationOfSpreadTable {...top20DurationOfSpread.forecast} />;
                }
              })()}
            </ul>
        </>
    )
}

export default Top20DurationOfSpread

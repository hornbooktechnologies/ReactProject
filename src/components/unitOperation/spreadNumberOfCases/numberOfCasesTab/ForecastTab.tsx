import React from "react";
import BarRechart from "../../../common/AnnualBar";
import { TabDataModel } from "../../../../models/unitOperation/UnitOperationModel";
import { ChartColors, AppConstant } from "../../../../utils/AppConstants";
import { useTranslation } from 'react-i18next';

const ForecastTab = ({ numberOfCasesTab, spreadBarData }: TabDataModel) => {
  const { i18n } = useTranslation()

  const colorGradient ={
    gradientColor1: ChartColors._54AFDE,
    gradientColor2: ChartColors._007CBB
  }
  return (
    <>
      <li className={`${numberOfCasesTab === AppConstant.FORECAST ? "uk-active" : ""}`}>
        <div className="uk-card mt-24" uk-card="true">
          <h6 className="font-18 uk-text-medium">{i18n.t('LABELS.FORECAST')}</h6>
          <BarRechart data={spreadBarData} height={380} tickCount={6} colorGradient={colorGradient} type={AppConstant.FORECAST} barSize={12} disableBtn={true} roundedBar={true}/>
        </div>
      </li>
    </>
  );
};

export default ForecastTab;

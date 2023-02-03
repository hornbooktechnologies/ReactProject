import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Kpi_005ApiRes, UnitOperationBaseModel } from "../../models/unitOperation/UnitOperationModel";
import { unitOperationApiMockData, unitOperationMockData } from "../../models/unitOperation/_mockData";
import LoadingError from "../common/LoadingError";
import PageHeader from "../common/PageHeader";
import Spinner from "../common/Spinner";
import AmountOfOperatingTime from "./amountOfOperatingTime/AmountOfOperatingTime";
import AverageSpread from "./averageSpread/AverageSpread";
import SpreadNumberOfCases from "./spreadNumberOfCases/SpreadNumberOfCases";
import { spreadOperationMockData } from "../../models/unitOperation/_mockData";
import NegativeOperationGrossMargin from "./NegativeOperationGrossMargin/NegativeGrossMarginTable";
import ReferenceSpecificationOfSpreadOperation from "./specificationSpread/ReferenceSpecificationOfSpreadOperation";
import SpecificationSpread from "./specificationSpread/SpecificationSpread";
import Top20DurationOfSpread from "./top20DurationOfSpread/Top20DurationOfSpread";
import { getCutoffFractionTime } from "../../utils/utils";
import { negOperationAvrgSpreadApiResponse, negOperationGrossmarginApiResponse, negOperationTimeApiResponse } from "../../utils/unitOperation/UnitOperationUtils";
import { NegativeOperationTimeModel} from "../../models/unitOperation/NegOperationTimeModel";
import { NegativeOperationAvgSpreadModel } from "../../models/unitOperation/NegOperationAvgSpreadModel.ts";
import { NegativeGrossMarginTableModel } from "../../models/unitOperation/NegOperationGrossmarginModel";
import "../../assets/scss/annualTarget/_annualstatus.scss";
import '../../assets/scss/unitOperation/unitOperation.scss';
import { DpmService } from "../../services/DpmServices";
import { ApiParamUtils } from "../../utils/apiUtils/ApiParamUtils";

const UnitOperation = () => {
  const { i18n } = useTranslation();
  const [unitOperationData, setUnitOperationData] = useState({} as UnitOperationBaseModel);
  const [negOperationGrossMarginData, setNegOperationGrossMargin] = useState({} as NegativeGrossMarginTableModel)
  const [negOperationTimeData, setNegOperationTime] = useState([] as NegativeOperationTimeModel)
  const [negOperationAvrgSpreadData, setNegOperationAvrgSpread] = useState([] as NegativeOperationAvgSpreadModel)
  const [unitOperationApiData, setUnitOperationApiData] = useState({});
  const [errorThrown, seterrorThrown] = useState(null)
  const [kpiResponse, setKpiResponse] = useState(false)
  const [time, setNoDataDate] = useState(
    getCutoffFractionTime()
  )

  const noDataHandler = (val: number, selectValue: string) => {
    setNoDataDate(val)
  }
    
  useEffect(() => {
    DpmService.fetchKPI_005Data(ApiParamUtils.plantId(),ApiParamUtils.unitCode()) 
    .then((res)=>{
      res=res.data
      if (res.Success) {
        setKpiResponse(res.Success)
        let kpiResponse = res.Data as Kpi_005ApiRes;
        let mappedNegGrossMarginResponse = negOperationGrossmarginApiResponse( kpiResponse);
        let mappedNegOperationTimeResponse = negOperationTimeApiResponse(i18n, kpiResponse);
        let mappedNegAverageSpread = negOperationAvrgSpreadApiResponse(i18n , kpiResponse);
        setNegOperationGrossMargin(mappedNegGrossMarginResponse)
        setNegOperationTime(mappedNegOperationTimeResponse)
        setNegOperationAvrgSpread(mappedNegAverageSpread)
       }
    })
    .catch((error) => {
      setKpiResponse(false)
      seterrorThrown(error)
     })
    setUnitOperationData(unitOperationMockData)
    setUnitOperationApiData(unitOperationApiMockData)
  }, [i18n])

  if (kpiResponse === true && Object.entries(unitOperationData && unitOperationApiData).length > 0) { 
    return (
      <>
        <PageHeader
          title={i18n.t('UNIT_OPERATION.TITLE')}
          description={i18n.t('UNIT_OPERATION.DESCRIPTION')}
        />
        <NegativeOperationGrossMargin negativeGrossMargin = {negOperationGrossMarginData}/>
        <AmountOfOperatingTime negOperationTime = {negOperationTimeData} />
        <AverageSpread negOperationAvrgSpread = {negOperationAvrgSpreadData} />
        <SpecificationSpread spreadOperation={spreadOperationMockData} time = {time} noDataHandler={noDataHandler}/>
        <ReferenceSpecificationOfSpreadOperation {...unitOperationData.referenceSpecification} />
        <SpreadNumberOfCases spreadBarData={unitOperationData.spreadBarChart}/>
        <Top20DurationOfSpread {...unitOperationData.top20DurationOfSpread} />
      </>
    );
  } else if (errorThrown != null) {
    return <LoadingError />;
  } else {
    return <Spinner />;
  }
};
export default UnitOperation;

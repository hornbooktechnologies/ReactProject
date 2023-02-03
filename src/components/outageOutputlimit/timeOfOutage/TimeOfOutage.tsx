import React, { useEffect, useState } from 'react'
import AnnualData from './annualData/AnnualData'
import PredictivePreviousData from './predictive&PreviousData/PredictivePreviousData'
import OutageHeader from '../OutageHeader'
import { useTranslation } from 'react-i18next'
import { GetAnnualTimeOutageValue, GetDonutChartValue, GetStartEndTimeOutageValue } from '../../../utils/outageOutputLimit/OutageOutputLimitUtils'
import { cssClassName } from '../../../utils/CssConstants'
import { AppConstant, OutageOutputConstant } from '../../../utils/AppConstants'
import { TimeOfOutageCardModel } from '../../../models/outageOutputLimit/TimeOfOutageModel'

const TimeOfOutage = (props :TimeOfOutageCardModel) => {
  const { i18n } = useTranslation();
  const [donutchartpresentToEndData, setDonutchartpresentToEndData] = useState<object | null >(null)
  const [donutchartstartToPresentData, setDonutchartstartToPresentData] = useState<object | null >(null)
  const [donutchartAnnualData, setDonutchartAnnualData] = useState<object | null >(null)
  const timeOutage = props?.timeOfOutageAtOutageData
  let annualData = timeOutage && timeOutage[0]
  let startTopresentData =  timeOutage && timeOutage[1]
  let presentToendData =  timeOutage && timeOutage[2]

  useEffect(() => {
    setDonutchartAnnualData(
      GetDonutChartValue(
        annualData?.plannedPlan,
        annualData?.plannedActualOrForcast,
        annualData?.plannedPreviousPlan,
        annualData?.plannedPreviousActualOrForcast,
        i18n.t("LABELS.HRS"),
        false,
        true
      )
    )
    setDonutchartpresentToEndData(
      GetDonutChartValue(
        presentToendData?.endPlannedPlan,
        presentToendData?.endPlannedActualOrForcast,
        presentToendData?.endPlannedPreviousPlan,
        presentToendData?.endPlannedPreviousActualOrForcast,
        i18n.t("LABELS.HRS"),
        false,
        true
      )
    )
    setDonutchartstartToPresentData(
      GetDonutChartValue(
        startTopresentData?.presentPlannedPlan,
        startTopresentData?.presentPlannedActualOrForcast,
        startTopresentData?.presentPlannedPreviousPlan,
        startTopresentData?.presentPlannedPreviousActualOrForcast,
        i18n.t("LABELS.HRS"),
        true,
        true
      )
    )
  }, [presentToendData,startTopresentData,annualData,i18n])

  const plannedPositiveList = [
    GetStartEndTimeOutageValue(
      cssClassName.MB_20,
      cssClassName.JERA_DISLIKE_ICON_CLASS,
      OutageOutputConstant.INCREASED_PLANED,
      presentToendData?.endPlannedIncreseHrs,
      presentToendData?.endPlannedPreviousIncreseHrs,
      presentToendData?.endPlannedIncreseRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.POSITIVE_VAL),
  
      GetStartEndTimeOutageValue(
       '',
       cssClassName.JERA_DISLIKE_ICON_CLASS,
       OutageOutputConstant.UNPLANNED_OUTAGE,
       presentToendData?.endUnplannedHrs,
       presentToendData?.endUnplannedPreviousHrs,
       presentToendData?.endUnplannedRecords,
       i18n.t("LABELS.HRS"),
       OutageOutputConstant.POSITIVE_VAL
      ),
  ]
  const plannedNegativeList = [
    GetStartEndTimeOutageValue(
      cssClassName.MB_20,
      cssClassName.JERA_LIKE_ICON_CLASS,
      OutageOutputConstant.REDUCED_PLANED,
      presentToendData?.endPlannedDecreseHrs,
      presentToendData?.endPlannedPreviousDecreseHrs,
      presentToendData?.endPlannedDecreseRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.NEGATIVE_VAL
    ),
    GetStartEndTimeOutageValue(
      '',
      cssClassName.JERA_LIKE_ICON_CLASS,
      OutageOutputConstant.CANCELLED_PLANED,
      presentToendData?.endCancledHrs,
      presentToendData?.endCancledPreviousHrs,
      presentToendData?.endCancledRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.NEGATIVE_VAL
    ),
  ]
  const plannedPositiveStartTopresentList = [
    GetStartEndTimeOutageValue(
      cssClassName.MB_20,
      cssClassName.JERA_DISLIKE_ICON_CLASS,
      OutageOutputConstant.INCREASED_PLANED,
      startTopresentData?.presentPlannedIncreseHrs,
      startTopresentData?.presentPlannedPreviousIncreseHrs,
      startTopresentData?.presentPlannedIncreseRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.POSITIVE_VAL
    ),
    GetStartEndTimeOutageValue(
      '',
      cssClassName.JERA_DISLIKE_ICON_CLASS,
      OutageOutputConstant.UNPLANNED_OUTAGE,
      startTopresentData?.presentUnplannedHrs,
      startTopresentData?.presentUnplannedPreviousHrs,
      startTopresentData?.presentUnplannedRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.POSITIVE_VAL
    ),
  ]
  const plannedNegativeStartTopresentList = [
    GetStartEndTimeOutageValue(
      cssClassName.MB_20,
      cssClassName.JERA_LIKE_ICON_CLASS,
      OutageOutputConstant.REDUCED_PLANED,
      startTopresentData?.presentPlannedDecreseHrs,
      startTopresentData?.presentPlannedPreviousDecreseHrs,
      startTopresentData?.presentPlannedDecreseRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.NEGATIVE_VAL
    ),
    GetStartEndTimeOutageValue(
      '',
      cssClassName.JERA_LIKE_ICON_CLASS,
      OutageOutputConstant.CANCELLED_PLANED,
      startTopresentData?.presentCancledHrs,
      startTopresentData?.presentCancledPreviousHrs,
      startTopresentData?.presentCancledRecords,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.NEGATIVE_VAL
    )
  ]
  const annualImpact = [
    GetAnnualTimeOutageValue(
      annualData?.positvePreviousImpactHrs,
      annualData?.positveImpactHrs,
      i18n.t("LABELS.HRS"),
      OutageOutputConstant.POSITIVE_VAL
    ),
    GetAnnualTimeOutageValue(
      annualData?.NagetivePreviousImpactHrs,
      annualData?.NagetiveImpactHrs,
      i18n.t("LABELS.HRS"),
      AppConstant.MINUS_SYMBOL
    ),
  ]
  return (
    <>
      <OutageHeader
          title={i18n.t('OUTAGE_OUTPUTLIMIT_TITLE.TIME_OF_OUTAGE')}
        />
        <div className="uk-grid ml--25">
        <AnnualData
           donutchartAnnualData={donutchartAnnualData}
           annualImpact={annualImpact}
          />
         <PredictivePreviousData 
            donutchartData4_1={donutchartstartToPresentData}
            donutchartData3_31={donutchartpresentToEndData}
            plannedPositive={plannedPositiveList}
            plannedNegative={plannedNegativeList}
            plannedPositiveStartTopresent={plannedPositiveStartTopresentList}
            plannedNegativeStartTopresent={plannedNegativeStartTopresentList}
          />
      </div>
    </>
  )
}

export default TimeOfOutage;

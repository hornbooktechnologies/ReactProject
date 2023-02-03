import React from 'react'
import ImpactOfOutageData from "./ImpactOfOutageData"
import { useTranslation } from 'react-i18next'
import { ImpactOfOutageDataModel } from '../../../models/outageOutputLimit/ImpactOfOutageDataModel'

const ImpactOfOutage = (props: ImpactOfOutageDataModel) => {
  const { i18n } = useTranslation();
  return (
    <>
      <ImpactOfOutageData
        value={props.value}
        valuePrevious={props.valuePrevious}
        positiveVal={props.positiveVal}
        negativeVal={props.negativeVal}
        positivePreviousVal={props.positivePreviousVal}
        negetivePreviousVal={props.negetivePreviousVal}
        title={i18n.t(props.title)}
        prefix={props?.prefix}
        suffix={props?.suffix}
      />
    </>
  )
}

export default ImpactOfOutage;

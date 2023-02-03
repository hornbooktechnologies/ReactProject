import React from 'react'
import { OutageHeaderModel } from '../../models/outageOutputLimit/OutageHeaderModel'
const OutageHeader = ({ title }: OutageHeaderModel) => {
  return <h5 className="mb-24 font-18">{title}</h5>
}

export default OutageHeader

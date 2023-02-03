import React from 'react'
import i18n from '../../../translations/i18n'

const NegativeGrossMarginTableHeader = () => {
  return (
    <>
      <thead>
        <tr>
          <th className="uk-text-center" colSpan={2}></th>
          <th className="uk-text-center w-220">
          {i18n.t("LABELS.ANNUAL")}
          </th>
          <th className="uk-text-center w-220">
           {i18n.t("LABELS.YEAR_START_TO_PRESENT")}
          </th>
          <th className="uk-text-center w-220">
           {i18n.t("LABELS.PRESENT_TO_YEAR_END")}
          </th>
        </tr>
      </thead>
    </>
  )
}

export default NegativeGrossMarginTableHeader

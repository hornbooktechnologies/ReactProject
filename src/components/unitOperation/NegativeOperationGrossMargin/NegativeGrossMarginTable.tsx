import React, { Fragment } from 'react'
import NegativeGrossMarginTableHeader from './NegativeGrossMarginTableHeader'
import NegativeGrossMarginTableRow from './NegativeGrossMarginTableRow'
import { NegativeGrossMarginModel } from '../../../models/unitOperation/NegOperationGrossmarginModel'


const NegativeGrossMarginTable = ({negativeGrossMargin}:NegativeGrossMarginModel) => {
    return (
    <Fragment>
      <div className="mt-24">
        <div className="uk-overflow-auto">
          <table className="uk-table uk-table-divider uk-text-left">
            <NegativeGrossMarginTableHeader />
            <tbody>
              <NegativeGrossMarginTableRow negativeGrossMargin={negativeGrossMargin}/>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default NegativeGrossMarginTable

import React,{Fragment} from 'react'
import { DurationOfSpreadModel } from '../../../models/unitOperation/UnitOperationModel'
import DurationOfSpreadTableHeader from './DurationOfSpreadTableHeader'
import DurationOfSpreadTableRow from './DurationOfSpreadTableRow'

const DurationOfSpreadTable = (durationOfSpreadData: DurationOfSpreadModel[]) => {
  return (
    <>
      <li className="uk-active">
        <div className="mt-24">
          <div className="uk-overflow-auto max-height-500">
            <table className="uk-table uk-table-divider uk-text-right min-w-1190">
              <DurationOfSpreadTableHeader />
              <tbody>
                {
                  Object.values(durationOfSpreadData).map((durationOfSpreadRowData, index) => {
                    const props = { index: index+1, durationOfSpreadRowData };
                    return <Fragment key={index}><DurationOfSpreadTableRow { ...props } /></Fragment>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </li>
    </>
  )
}

export default DurationOfSpreadTable

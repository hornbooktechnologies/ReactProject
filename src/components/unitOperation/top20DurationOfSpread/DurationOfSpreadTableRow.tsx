import React from 'react'
import { DurationOfSpreadModel } from '../../../models/unitOperation/UnitOperationModel'
import { AppConstant } from '../../../utils/AppConstants'
import { localStorageUtils } from '../../../utils/LocalStorageUtils'
import { formatDate, formatNumberToFractions } from '../../../utils/utils'

type Props = {
    index: number,
    durationOfSpreadRowData: DurationOfSpreadModel
}

const DurationOfSpreadTableRow = (props: Props) => {
    const selectedUnit = localStorageUtils.getSelectedUnit()
    const isUnitWiseView = (selectedUnit !== AppConstant.OVERVIEW);
    return (
        <>
            <tr>
                <td>{props.index}</td>
                <td>{props.durationOfSpreadRowData.duration}</td>
                {!isUnitWiseView && (<td className="uk-text-center">{props.durationOfSpreadRowData.generator}</td>)}
                <td className="uk-text-center">{formatDate(props.durationOfSpreadRowData.spreadOperationStart)}</td>
                <td className="uk-text-center">{formatDate(props.durationOfSpreadRowData.spreadOperationEnd)}</td>
                <td>{props.durationOfSpreadRowData.output}</td>
                <td>{formatNumberToFractions(props.durationOfSpreadRowData.grossMargin, 2)}</td>
                <td>{formatNumberToFractions(props.durationOfSpreadRowData.spread, 2)}</td>
            </tr>
        </>
    )
}

export default DurationOfSpreadTableRow

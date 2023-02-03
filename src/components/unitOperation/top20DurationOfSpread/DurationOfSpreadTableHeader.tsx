import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppConstant } from '../../../utils/AppConstants'
import { localStorageUtils } from '../../../utils/LocalStorageUtils'

const DurationOfSpreadTableHeader = () => {
    const { i18n } = useTranslation()
    const selectedUnit = localStorageUtils.getSelectedUnit()
    const isUnitWiseView = (selectedUnit !== AppConstant.OVERVIEW);
    
    return (
        <>        
            <thead className="spreadOperationTable">
                <tr>
                    <th className="uk-text-center">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.NO')}</th>
                    <th className="uk-text-center">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.DURATION')}</th>
                    {!isUnitWiseView && (<th className="uk-text-center m-w-110">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.GENERATOR')}</th>)}
                    <th className="uk-text-center">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.OPERATION_START')}</th>
                    <th className="uk-text-center">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.OPERATION_END')}</th>
                    <th className="uk-text-center">
                        <span className="uk-display-inline-block">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.OUTPUT')} 
                            <span className="font-12">({i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.AVERAGE')})</span>
                            <span className="uk-text-right font-12 uk-display-block">【{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.OUTPUT_UNIT')}】</span>
                        </span>
                    </th>
                    <th className="uk-text-center">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.GROSS_MARGIN')}
                        <span className="uk-display-inline-block">
                            <span className="uk-text-right font-12 uk-display-block">【{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.GROSS_MARGIN_UNIT')}】</span>
                        </span>
                    </th>
                    <th className="uk-text-center">
                        <span className="uk-display-inline-block">{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.SPREAD')} 
                            <span className="font-12">({i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.AVERAGE')})</span>
                            <span className="uk-text-right font-12 uk-display-block">【{i18n.t('UNIT_OPERATION.DURATION_OF_SPREAD_TABLE_HEADER.SPREAD_UNIT')}】</span>
                        </span>
                    </th>
                </tr>
            </thead>
        </>
    )
}

export default DurationOfSpreadTableHeader

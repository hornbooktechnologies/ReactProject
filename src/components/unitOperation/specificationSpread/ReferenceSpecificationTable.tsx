import { useTranslation } from "react-i18next"
import { ValuesBaseModel } from "../../../models/unitOperation/UnitOperationModel"

const ReferenceSpecificationTable = (referenceSpecification: ValuesBaseModel) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className="mt-24 pb-24">
                <div className="uk-overflow-auto">
                    <table className="uk-table uk-table-divider uk-text-left min-w-800">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="uk-text-center">{i18n.t('UNIT_OPERATION.REFERENCE_SPECIFICATION_TABLE_HEADER.NoOfStartStop')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                referenceSpecification.actual && 
                                <>
                                    <tr>
                                        <td className="font-16 uk-text-middle bg-grey-blue-40-a10">{i18n.t('LABELS.ACTUAL')}</td>
                                        <td className="uk-text-center">{referenceSpecification.actual}{i18n.t('UNIT_OPERATION.REFERENCE_SPECIFICATION_UNIT')}</td>
                                    </tr>
                                </>
                            }
                            {
                                referenceSpecification.forecast && 
                                <>
                                    <tr>
                                        <td className="font-16 uk-text-middle bg-grey-blue-40-a10">{i18n.t('LABELS.FORECAST')}</td>
                                        <td className="uk-text-center">{referenceSpecification.forecast}{i18n.t('UNIT_OPERATION.REFERENCE_SPECIFICATION_UNIT')}</td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ReferenceSpecificationTable
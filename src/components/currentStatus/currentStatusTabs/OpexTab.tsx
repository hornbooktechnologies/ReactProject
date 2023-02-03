import  React  from 'react'
import { ChartColors, ChartGradientType, ChartType } from '../../../utils/AppConstants'
import { DonutChartCustomData } from '../../../models/DonutChartDataModel';
import i18n from '../../../translations/i18n';
import { GetDonutChartSeriesAndValueForCurrentStatus } from '../../../utils/utils';
import DonutChartLarge from '../../common/customPie/DonutChartLarge';
import DonutChartSmall from '../../common/customPie/DonutChartSmall';
import StackBarCustom from '../../common/StackBar';

const OpexTab = ({ opexBarData, OPEXOperation, OPEXMaintenance, OPEXTotal } : any): JSX.Element => {
    const smallPieChartRenderSize = 120, 
        mediumPieChartRenderSize = 170;
    const opexChartType = ChartType.COST;
    let opexOperationCostCustomData: DonutChartCustomData = {
        header: i18n.t("CURRENT_STATUS.OPERATIONAL_COST"),
        type: ChartType.SMALL,
        color: ChartColors._E7466E,
        chartGradientType: ChartGradientType.SOFT_RED,
        gradientColor1: ChartColors._E56D75,
        gradientColor2: ChartColors._C5222D,
    }

    let opexOperationCost = GetDonutChartSeriesAndValueForCurrentStatus(i18n, opexOperationCostCustomData, OPEXOperation);

    let opexMaintenanceCostCustomData: DonutChartCustomData = {
        header: i18n.t("LABELS.MAINTENANCE_COST"),
        type: ChartType.SMALL,
        color: ChartColors._F2B08B,
        chartGradientType: ChartGradientType.SOFT_ORANGE,
        gradientColor1: ChartColors._F0AA54,
        gradientColor2: ChartColors._D37400,
    }

    let opexMaintenanceCost = GetDonutChartSeriesAndValueForCurrentStatus(i18n, opexMaintenanceCostCustomData, OPEXMaintenance);

    let opexTotalCostCustomData: DonutChartCustomData = {
        header: i18n.t("CURRENT_STATUS.OPEX_TOTAL"),
        type: ChartType.LARGE,
        color: ChartColors._FF5A02,
        chartGradientType: ChartGradientType.STRONG_RED,
        gradientColor1: ChartColors._D82531,
        gradientColor2: ChartColors._E88000,
    }

    let opexTotalCost = GetDonutChartSeriesAndValueForCurrentStatus(i18n, opexTotalCostCustomData, OPEXTotal);
    return (
        <>
        <li className="uk-active">
            <div className="uk-grid-match  uk-grid" uk-grid="true">
                <div className="uk-margin-bottom@s uk-width-1-2@m uk-first-column">
                    <div className="uk-card uk-card-default uk-height-1-1 uk-card-body uk-text-center pb-10">
                        <StackBarCustom data={opexBarData} />
                    </div>        
                </div>
                <div className="uk-margin-bottom@ uk-width-1-4@m">
                    <div className="uk-card uk-card-body mb-20 uk-flex uk-flex-column">
                        <h6 className="font-16">{opexOperationCost.header}</h6>
                        <DonutChartSmall 
                            data={opexOperationCost} 
                            width={smallPieChartRenderSize}
                            height={smallPieChartRenderSize}
                            chartType={opexChartType}
                        />
                    </div>
                    <div className="uk-card uk-card-body uk-flex uk-flex-column">
                        <h6 className="font-16">{opexMaintenanceCost.header}</h6>
                        <DonutChartSmall 
                            data={opexMaintenanceCost} 
                            width={smallPieChartRenderSize}
                            height={smallPieChartRenderSize}
                            chartType={opexChartType}
                        />
                    </div>
                </div>
                <div className="uk-margin-bottom@s uk-width-1-4@m">
                    <div className="uk-card uk-height-1-1 uk-flex uk-flex-column">
                        <h6 className="font-16">{opexTotalCost.header}</h6>
                        <DonutChartLarge 
                            data={opexTotalCost}
                            chartType={opexChartType}
                            width={mediumPieChartRenderSize}
                            height={mediumPieChartRenderSize}
                            customCssClass='large-pie'
                        />        
                    </div>
                </div>
            </div>
        </li>
        </>
    );
}

export default OpexTab
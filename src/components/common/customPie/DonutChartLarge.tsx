import { DonutChartLargeModel } from "../../../models/DonutChartDataModel"
import CustomPie from "../../common/customPie/CustomPie"
import DonutChartSeriesHeader from "../../common/DonutChartSeriesHeader"

const DonutChartLarge = (props: DonutChartLargeModel) => {
    return (
        <>
        <div className="uk-flex">              
            {props.data.series1 ? <DonutChartSeriesHeader {...props.data.series1} chartSection={props.chartSection} removeTextTop={props.removeTextTop} /> : null}
            {props.data.series2 ? <DonutChartSeriesHeader {...props.data.series2} chartSection={props.chartSection} removeTextTop={props.removeTextTop} /> : null}
        </div>
        <div className={`uk-flex uk-flex-center ${props.customCssClass}`}> 
            <div className="mt-30">
                <CustomPie {...props} />
            </div>
        </div>
        </>
    )
}

export default DonutChartLarge
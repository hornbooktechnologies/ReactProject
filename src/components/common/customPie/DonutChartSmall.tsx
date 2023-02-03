import CustomPie from "../../common/customPie/CustomPie"
import DonutChartSeriesHeader from "../../common/DonutChartSeriesHeader"

const DonutChartSmall = (props: any) => {
    const chartProps = { ...props, customClassForRatio: 'smallPieChart' }
    const series1Props = { ...props.data.series1, type: 'small' }
    const series2Props = { ...props.data.series2, type: 'small' }
    return (
        <>
            <div className="uk-flex uk-flex-middle uk-flex uk-height-1-1">
                <div className="uk-flex-left uk-width-1-4 uk-text-left">              
                    {props.data.series1 ? <DonutChartSeriesHeader {...series1Props} /> : null}
                    {props.data.series2 ? <DonutChartSeriesHeader {...series2Props} /> : null}
                </div>
                <div className={`uk-flex-right uk-width-3-4 ${props.customCssClass}`}> 
                    <CustomPie {...chartProps} />
                </div>
            </div>
        </>
    )
}

export default DonutChartSmall
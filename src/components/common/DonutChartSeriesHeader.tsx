import { DonutChartSeriesHeaderModel } from "../../models/DonutChartDataModel";
import Tooltip from "../common/Tooltip";

const DonutChartSeriesHeader = (series: DonutChartSeriesHeaderModel) => {
  const hasPreviousValue = series.hasOwnProperty('seriesPreviousValue');
    let showDifferenceHighlights = false;
    if (hasPreviousValue) showDifferenceHighlights = series.seriesValue !== series.seriesPreviousValue;
    let parentBaseClass = 'uk-flex-left uk-width-1-2';
    if ('small' !== series.type) parentBaseClass = `${parentBaseClass} uk-text-center`;
    if (showDifferenceHighlights) parentBaseClass = `uk-tooltip-cutom uk-tooltip-bottom-custom ${parentBaseClass}`;
    return (
        <>
          <div className={parentBaseClass}>
            <label className={series.type === "small" ? "font-12" : "font-14"}>{series.title}</label>
            <p
              className={`${series.chartSection === 'operatingTime' ? "mb-0" :"mb-10"} mt-5 font-14`}>
              <span className={`${showDifferenceHighlights ? "text-highlight":""}`}>
                <strong>
                  {series.prefix ? <><span className="seriesPrefix">{series.prefix}</span></> : ""}
                  <>
                    {series.seriesValue !== "" ? (
                      <><span className="seriesValue">{series.seriesValue.toLocaleString("en")}</span></>
                    ) : (
                      ""
                    )}
                    {series.suffix1 ? (
                      <span className={`${series.removeTextTop ? '':'uk-text-top'} font-10`}>
                        {series.suffix1}
                      </span>
                    ) : (
                      ""
                    )}
                  </>
                </strong>
              </span>
            </p>
            {showDifferenceHighlights ? 
              <Tooltip prefix={''} previousDayValue={series.seriesPreviousValue} unit={series.suffix1} /> : null
            }
          </div>
        </>
    )
}

export default DonutChartSeriesHeader
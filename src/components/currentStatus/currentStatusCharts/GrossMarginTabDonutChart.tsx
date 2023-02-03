import CustomPie from "../../common/customPie/CustomPie";

function PlanSeries(series: any) {
    return (
    <div className="uk-flex uk-width-1-1 mb-20">
            <label className="uk-width-1-2 uk-text-right pr-24">
              {series.title}
            </label>
            <p
              className="uk-margin-remove-top uk-width-1-2 uk-text-left mt-5 mb-10 font-14"
            >
              <strong>
                {series.prefix ? <>{series.prefix}</> : ""}
                <>
                  {series.seriesValue !== "" ? (
                    <>{series.seriesValue.toLocaleString("en")}</>
                  ) : (
                    ""
                  )}
                  {series.suffix1 ? (
                    <span className="uk-text-top font-10">
                      {series.suffix1}
                    </span>
                  ) : (
                    ""
                  )}
                </>
              </strong>
            </p>
          </div>
    )
}

function ForecastSeries(series: any) {
    return (
        <div className="uk-flex uk-width-1-1 mb-20">
            <label className="uk-width-1-2 uk-text-right pr-24">
              {series.title}
            </label>
            <p
              className=
                "uk-margin-remove-top uk-width-1-2 uk-text-left mt-5 mb-10 font-14"
            >
              <strong>
                {series.prefix ? <>{series.prefix}</> : ""}
                <>
                  {series.seriesValue !== "" ? (
                    <>{series.seriesValue.toLocaleString("en")}</>
                  ) : (
                    ""
                  )}
                  {series.suffix1 ? (
                    <span className="uk-text-top font-10">
                      {series.suffix1}
                    </span>
                  ) : (
                    ""
                  )}
                </>
              </strong>
            </p>
          </div>
    )
}

function ActualSeries(actualSeries: any) {
    return (
        <div className="uk-flex uk-width-1-1 mb-20">
          <label className="uk-width-1-2 uk-text-right pr-24">Actual</label>
          <p className="uk-margin-remove-top uk-margin-remove-bottom uk-width-1-2 uk-text-left">
            <strong>
              {actualSeries.Prefix ? <>{actualSeries.Prefix}</> : ""}
              <>
                {actualSeries.Actual !== "" ? (
                  <>{actualSeries.Actual?.toLocaleString("en")}</>
                ) : (
                  ""
                )}
                {actualSeries.Suffix ? (
                  <span className="uk-text-top font-10">{actualSeries.Suffix}</span>
                ) : (
                  ""
                )}
              </>
            </strong>
          </p>
        </div>
      );
}

const GrossMarginTabDonutChart = (props: any) => {
    return (
        <>
        <div className="uk-flex uk-flex-middle uk-height-1-1">
            <div className="uk-width-1-1">
                <PlanSeries {...props.data.series1} />
                <ForecastSeries {...props.data.series2} />
                <ActualSeries { ...props.actualData } />
            </div>
            <div className="uk-flex uk-flex-center">
                <CustomPie {...props} />
            </div>
        </div>
        </>
    )
}

export default GrossMarginTabDonutChart;
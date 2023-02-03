import React,{ Fragment} from 'react'
import { AnnualGraphLayoutModel } from "../../models/annualTarget/AnnualGraphLayoutModel";
import { DonutChartCustomData } from "../../models/DonutChartDataModel";
import { DropdownOption } from "../../models/annualTarget/AnnualTargetDataModel";
import LineGraph from './LineChart';
import { AnnualTargetConstant } from '../../utils/AppConstants';
import DonutChartLarge from '../common/customPie/DonutChartLarge'; 

const AnnualGraphLayout = (props: AnnualGraphLayoutModel) => {
  const pieChartRenderSize = 170;
  return (
    <>
      {props.GraphLayout?.map(
        (graph: {
          lineData: DropdownOption;
          donutchartData: DonutChartCustomData;
          name: string;
          cumulativeBoolean:boolean
        },index
        ) => {
          return (
            <Fragment key={index}>
              <div key={index} className="mt-24">
                {graph.donutchartData.displayPage ===
                AnnualTargetConstant.ANNUAL_TARGET ? (
                  <h6 className="m-0">{graph.donutchartData.header}</h6>
                ) : (
                  ''
                )}
                <div uk-card="true" className="uk-card mt-24" key={index}>
                  <div className="uk-grid-small uk-grid ml-0" uk-grid="true">
                    <div className="uk-margin-bottom@s uk-width-3-4@m uk-padding-remove-left">
                      <div className="uk-flex-middle">
                        {graph.cumulativeBoolean ? (
                          <LineGraph
                            value={props.freqValue}
                            noDataHandler={props.noDataHandler}
                            time={props.time}
                            data={graph.lineData}
                            cumulativeBoolean={true}
                            name={graph.name}
                          />
                        ) : (
                          <LineGraph
                            value={props.freqValue}
                            noDataHandler={props.noDataHandler}
                            time={props.time}
                            data={graph.lineData}
                            name={graph.name}
                          />
                        )}
                      </div>
                    </div>
                    <div className="uk-margin-bottom@s uk-width-1-4@m uk-padding-small mt-50">
                      <DonutChartLarge
                        data={graph.donutchartData}
                        width={pieChartRenderSize}
                        height={pieChartRenderSize}
                        chartType={props.chartType}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )
        }
      )}
    </>
  );
};
export default AnnualGraphLayout;

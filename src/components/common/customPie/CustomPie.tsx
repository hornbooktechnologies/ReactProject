//@ts-nocheck
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ChartColors } from "../../../utils/AppConstants";
import { getChartFillValue, getRatioChangePct, isPositiveRatio } from "../../../utils/DonutChartUtils";
import RelativeRatio from "./RelativeRatio";
import PieRatioValue from "./PieRatioValue";

type Props = {
    chartGradientType?: string
    gradientColor1?: string
    gradientColor2?: string
    type?: string
    height?: number
    width?: number
    color?: string
    data: ChartData
}

type ChartData = {
    series1?: any
    series2?: any
    value?: number
    plan?: number
    forecast?: number
}

const CustomPie = (props: Props) => {
    const chartContainerRef = useRef();
    const { data, width, height,chartType } = props;
    const { chartGradientType, gradientColor1, gradientColor2, color, plan = 0, forecast = 0, value, series1, series2,middleRatio } = data;
    const ptPosCoef = 0.1;
    const chartFillValue = getChartFillValue(value, plan, forecast);
    const changePct = getRatioChangePct(plan, forecast);
    const showGreenRatio = isPositiveRatio(chartType, plan, forecast);
    useEffect(() => {
      const gradientId = `pieGradient-${chartGradientType}`;
      const drawChart = () => {
        // Remove the previous svg
        d3.select(chartContainerRef.current).select("svg").remove();
        // Create new svg
        const svgElement = d3
          .select(chartContainerRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
        const gradientElement = svgElement.append("defs")
          .append("linearGradient")
          .attr("id", gradientId);
       
        gradientElement.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", gradientColor1);
  
        gradientElement.append("stop")
          .attr("offset", "90%")
          .attr("stop-color", gradientColor2);
        
        // this is the width of the pie chart arc
        const arcWidth = 10;
        const boxSize = Math.min(width, height);
        const radius = boxSize / 2;
        const bgRad = arcWidth / 2;
        const bgArc = d3
          .arc()
          .outerRadius(radius - (bgRad - 0.5))
          .innerRadius(radius - (bgRad + 0.5));
  
        const fgArc = d3
          .arc()
          .outerRadius(radius)
          .innerRadius(radius - arcWidth)
          .cornerRadius(arcWidth);
  
        const pie = d3
          .pie()
          .sort(null)
          .value((d) => d.value);
  
        const bgData = [{ color: `${ChartColors._ccc}`, value: 100 }];
        svgElement
          .selectAll(".background")
          .data(pie(bgData))
          .enter()
          .append("path")
          .attr("class", "background")
          .style("fill", (d) => d.data.color)
          .attr("stroke", `${ChartColors._455054}`)
          .style("stroke-width", 8)
          .attr("d", bgArc);
  
        const fgData = [];
        if (chartFillValue >= 0) {
          fgData.push({ color: `url(#${gradientId})`, value: chartFillValue })
          fgData.push({ color: 'transparent', value: 100 - chartFillValue })
        } else {
          fgData.push({ color: 'transparent', value: 100 + chartFillValue })
          fgData.push({ color: `url(#${gradientId})`, value: - chartFillValue })
        }
  
        const fgPie = svgElement
          .selectAll(".foreground")
          .data(pie(fgData))
          .enter()
          .append("path")
          .attr("class", "foreground")
          .style("stroke-width", 8)
          .style("fill", (d) => d.data.color);
        
        const ptRad = radius - arcWidth / 2;
        let pt = null;
        let arro = null;
  
        const hp = Math.PI / 2;
        fgPie
          .transition()
          .duration(1000)
          .attrTween("d", (d) => {
            const fromAngle = chartFillValue >= 0 ? 0 : 2 * Math.PI;
            const ip = d3.interpolate(
              { startAngle: fromAngle, endAngle: fromAngle },
              d
            );
            return (t) => {
              const arcData = ip(t);
              if (pt && d.data.color !== "transparent") {
                let rad = 0;
                if (chartFillValue > 0) {
                  let cr = hp + arcData.endAngle / 2;
                  if (cr > hp + ptPosCoef) {
                    cr = arcData.endAngle >= 2 * Math.PI ? hp : hp + ptPosCoef;
                  }
                  rad = arcData.endAngle - cr;
                } else {
                  let cr = hp - (2 * Math.PI - arcData.startAngle) / 2;
                  if (cr < hp - ptPosCoef) {
                    cr = arcData.startAngle <= 0 ? hp : hp - ptPosCoef;
                  }
                  rad = arcData.startAngle - cr;
                }
                pt.attr("cx", ptRad * Math.cos(rad));
                pt.attr("cy", ptRad * Math.sin(rad));
                if (chartFillValue > 0) {
                  arro.attr(
                    "transform",
                    `translate(${ptRad * Math.cos(rad)},${
                      ptRad * Math.sin(rad)
                    }) rotate(${chartFillValue * 3.6}) `
                  );
                } else {
                  arro.attr(
                    "transform",
                    `translate(${ptRad * Math.cos(rad)},${
                      ptRad * Math.sin(rad)
                    }) rotate(${chartFillValue * 3.6 + 180}) `
                  );
                }
              }
              return fgArc(arcData);
            };
          });
      };
      drawChart();
    }, [chartContainerRef, color, chartFillValue, height, width,chartGradientType,gradientColor1,gradientColor2]);

    return (
      <>
       <div className="uk-flex uk-flex-center">
        <div
          className="chart-continer"
          style={{ width: width, height: height }}
        >
          <div className="dount-chart-container">
            <div ref={chartContainerRef} />
          </div>
          <div className={`${props.customClassForRatio ? props.customClassForRatio:''} donutmiddleData`}>
            {middleRatio ? (
              <PieRatioValue {...data} />
            ) : (
              <RelativeRatio
                changePercent={changePct}
                isPositiveRatio={showGreenRatio}
                equationX={series1.title}
                equationY={series2.title}
              />
            )}
          </div>
        </div>
        </div>
      </>
    )
}

export default CustomPie
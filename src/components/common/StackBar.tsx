import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {  useTranslation } from 'react-i18next'
import { ChartColors } from '../../utils/AppConstants'
import { cssClassName } from '../../utils/CssConstants'
import { CustomTooltipModel } from '../../models/LinechartModel'
const StackBarCustom = (props) => {
  const [data, setData] = useState(null)
  const { i18n } = useTranslation();

  useEffect(() => {
    if (props) {
      setData(props.data)
    }
  }, [props])
  if (data !== null) {
    function CustomTooltip({ payload, active }:CustomTooltipModel) {
      if (active) {
        return (
          <div className="currentstatus-tooltip">
            <p className={`${cssClassName.TOOLTIP_HEADER}`}>
              <strong>{`${payload[0].payload.onhoverName}`}</strong>
            </p>
            <p className={`${cssClassName.TOOLTIP_CONTENT}`}>
              <strong>
                <span className={`${cssClassName.COLOR_LABEL}`} style={{background: `${ChartColors._e1646c}`}}></span>{`Operational `} </strong>:
              {` ${data[0].Prefix}${payload[0].value - payload[1].value}${
                data[0].Suffix
              }`}
            </p>
            <p className={`${cssClassName.TOOLTIP_CONTENT}`}>
              <strong><span className={`${cssClassName.COLOR_LABEL}`} style={{background: `${ChartColors._d57806}`}}></span>{`Maintenance `} </strong>:
              {`${data[0].Prefix}${payload[1].value}${data[0].Suffix} `}
            </p>
          </div>
        )
      }

      return null
    }

    // For Graph representation adding forecast and actual

    data.forEach((ForecastActual) => {
      ForecastActual.Operational =
        ForecastActual.Operational + ForecastActual.Maintenance
    })

    return (
      <div>
        <ResponsiveContainer width="95%" height={370} data={data}>
          <BarChart
            data={data}
            barGap={-25}
            radius={5}
            margin={{
              top: 20,
              right: -10,
              left: -10,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorOp" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={`${ChartColors._E56D75}`} />
                <stop offset="100%" stopColor={`${ChartColors._C5222D}`} />
              </linearGradient>

              <linearGradient id="colorMn" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={`${ChartColors._F0AA54}`} />
                <stop offset="100%" stopColor={`${ChartColors._D37400}`} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="4 2" />
            <XAxis
              dataKey="name"
              padding={{ left: 10, right: 10 }}
              tick={{ fill: 'white' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white' }}
              width={100}
              label={{
                value: data[0].Prefix + ' ' + data[0].Suffix2,
                angle: -90,
                position: 'innnerRight',
                dx: -20,
                fill: 'white',
              }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="Operational"
              fill="url(#colorOp)"
              radius={[12, 12, 0, 0]}
              barSize={25}
            />
            <Bar
              dataKey="Maintenance"
              fill="url(#colorMn)"
              radius={[12, 12, 0, 0]}
              barSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="uk-flex uk-flex-center mb-0 mt-0">
          <div className="pr-0">
            <span className="legend operational-tooltip"></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE} barLegend`}>
              {i18n.t('CURRENT_STATUS.OPERATIONAL_COST')}
            </span>
          </div>
          <div className="pr-0">
            <span className="legend maintenance-tooltip"></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE} barLegend`}>
              {i18n.t('LABELS.MAINTENANCE_COST')}
            </span>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
export default StackBarCustom

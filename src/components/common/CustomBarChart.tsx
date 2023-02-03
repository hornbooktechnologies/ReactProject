import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import { ChartColors } from '../../utils/AppConstants'
import { cssClassName } from '../../utils/CssConstants'
import { CustomTooltipModel } from '../../models/LinechartModel'
const CustomBarChart = (props) => {
  const [data, setData] = useState()
  const { i18n } = useTranslation();

  useEffect(() => {
    if (props) {
      setData(props.data)
    }
  }, [props])

  if (data) {
    data[0]['temp'] = 0
    data[1]['temp'] = 100

    const CustomTooltip = ({ active, payload }:CustomTooltipModel) => {
      if (active && payload !== undefined && payload.length) {
        payload = payload.filter((payloadData) => {
          return !payloadData.name.includes('hide')
        })
      }

      if (active && payload && payload.length) {
        return (
          <div className="currentstatus-tooltip">
            <div className={`${cssClassName.TOOLTIP_HEADER}`}>
              <strong>{`${payload[0].payload.onhoverName}`}</strong>
            </div>
            <div className={`${cssClassName.TOOLTIP_CONTENT}`}>
              <strong>
                <div
                  className={`${cssClassName.COLOR_LABEL} gross-tooltip`}
                ></div>
                {`${payload[0].name}`}
              </strong>
              :{`${data[0].Prefix}${payload[0].value}${data[0].Suffix}`}
            </div>
            <div className={`${cssClassName.TOOLTIP_CONTENT}`}>
              <strong>
                <div
                  className={`${cssClassName.COLOR_LABEL} opex-tooltip`}
                ></div>
                {`${payload[1].name}`}
              </strong>
              :{`${data[0].Prefix}${payload[1].value}${data[0].Suffix}`}
            </div>
            <div className={`${cssClassName.TOOLTIP_CONTENT}`}>
              <strong>
                <div
                  className={`${cssClassName.COLOR_LABEL} ebitda-tooltip`}
                ></div>
                {`${payload[2].name}`}
              </strong>
              :{`${data[0].Prefix}${payload[2].value}${data[0].Suffix}`}
            </div>
          </div>
        )
      }

      return null
    }

    return (
      <div>
        <ResponsiveContainer width="100%" height={300} data={data}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorGM" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={`${ChartColors._9FCD72}`} />
                <stop offset="100%" stopColor={`${ChartColors._66A428}`} />
              </linearGradient>

              <linearGradient id="colorOPEX" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={`${ChartColors._E56D75}`} />
                <stop offset="100%" stopColor={`${ChartColors._C5222D}`} />
              </linearGradient>

              <linearGradient id="colorEBITDA" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor={`${ChartColors._54AFDE}`} />
                <stop offset="100%" stopColor={`${ChartColors._007CBB}`} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="4 2" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white' }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white' }}
              width={100}
              label={{
                value: data[0].Prefix + ' ' + data[0].Suffix2,
                fill: 'white',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="Gross Margin"
              fill="url(#colorGM)"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="OPEXhide"
              stackId="a"
              fill="transparent"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="OPEX"
              stackId="a"
              fill="url(#colorOPEX)"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="EBITDAhide"
              stackId="b"
              fill="transparent"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="EBITDA"
              stackId="b"
              fill="url(#colorEBITDA)"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
            <XAxis
              xAxisId={1}
              type="number"
              dataKey="temp"
              axisLine={false}
              tickLine={false}
              hide={true}
              padding={{ left: 10, right: 10 }}
            />
            <ReferenceLine
              stroke="white"
              xAxisId={1}
              ifOverflow="extendDomain"
              strokeWidth="2"
              strokeDasharray="4 4"
              segment={[
                { x: 22, y: `${data[0].EBITDA}` },
                { x: 34, y: `${data[0].EBITDA}` },
              ]}
            />
            <ReferenceLine
              stroke="white"
              xAxisId={1}
              ifOverflow="extendDomain"
              strokeWidth="2"
              strokeDasharray="4 4"
              segment={[
                { x: 72, y: `${data[1].EBITDA}` },
                { x: 84, y: `${data[1].EBITDA}` },
              ]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div
          className="uk-flex uk-flex-center mb-3 mt-3 app-typography"
          >
          <div className="pr-0">
            <span className="legend gross-tooltip"></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE}`}>
              {i18n.t('CURRENT_STATUS.GROSS_MARGIN')}
            </span>
          </div>
          <div className="pr-0">
            <span className="legend opex-tooltip"></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE}`}>
              {i18n.t('LABELS.OPEX')}
            </span>
          </div>
          <div className="pr-0">
            <span className="legend ebitda-tooltip"></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE}`}>
              {i18n.t('LABELS.EBITDA')}
            </span>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
export default CustomBarChart

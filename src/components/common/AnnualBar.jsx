import { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { AppConstant } from '../../utils/AppConstants'
import { cssClassName } from '../../utils/CssConstants'
import i18n from '../../translations/i18n';

export default class BarRechart extends PureComponent {
  constructor(props: any) {
    super(props)

    this.state = {
      filteredData: props.data.slice(0, props.data.length),
      x: 0,
      y: props.data.length,
    }
  }

  onClickHandlerPrev = () => {
    if (this.props.data[this.state.x] !== undefined && this.state.x >= 0) {
      if (this.state.x > 0) {
        this.setState({ x: this.state.x - 1, y: this.state.y - 1 })
        this.setState({
          filteredData: this.props.data.slice(
            this.state.x - 1,
            this.state.y - 1
          ),
        })
      }
    }
  }

  onClickHandlerNext = () => {
    if (
      this.props.data[this.state.y] !== undefined &&
      this.state.y < this.props.data.length
    ) {
      if (this.state.y <= this.props.data.length) {
        this.setState({ x: this.state.x + 1, y: this.state.y + 1 })
        this.setState({
          filteredData: this.props.data.slice(
            this.state.x + 1,
            this.state.y + 1
          ),
        })
      }
    }
  }

  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload !== undefined && payload.length) {
      payload = payload.filter((payloadData) => {
        return !payloadData.name.includes('hide')
      })
    }

    if (active && payload && payload.length) {
      return (
        <div className="currentstatus-tooltip">
          <p className={`${cssClassName.TOOLTIP_HEADER}`}>
            {`${
              this.props.type === AppConstant.GROSSMARGIN
                ? AppConstant.ANNUAL_GROSSMARGIN
                : `${
                    this.props.type === AppConstant.FORECAST
                      ? AppConstant.FORECAST
                      : AppConstant.ACTUAL
                  }`
            }`}
          </p>
          <div className={`${cssClassName.TOOLTIP_CONTENT}`}>
            <div>
              <div
                className={`${cssClassName.COLOR_LABEL} ${
                  this.props.type === AppConstant.FORECAST
                    ? 'forcast-tooltip'
                    : 'annual-tooltip'
                } ${this.props.roundedBar? "roundedBar" : ""}`}
              ></div>
              {`${this.props.type === AppConstant.GROSSMARGIN ? AppConstant.YEAR : ''} ${
                payload[0].payload.Name
              }`}
            </div>
            :
            {` ${
              this.props.type === AppConstant.GROSSMARGIN
                ? payload[0].payload.Prefix
                : ''
            } ${payload[0].payload.Value}${
              this.props.type === AppConstant.GROSSMARGIN
                ? payload[0].payload.Suffix.slice()
                : ''
            }`}
          </div>
        </div>
      )
    }

    return null
  }

  render() {
    return (
      <div className="full-height">
        <ResponsiveContainer height={this.props.height} className="mt-30">
          <BarChart
            data={this.state.filteredData}
            margin={{
              top: 5,
              right: 30,
              left: this.props.type === AppConstant.GROSSMARGIN ? 20 : -40,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  stopColor={`${this.props.colorGradient.gradientColor1}`}
                />
                <stop
                  offset="100%"
                  stopColor={`${this.props.colorGradient.gradientColor2}`}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="4 2" />

            <XAxis dataKey="Name" tick={{ fill: 'white' }} />
            <YAxis
              axisLine={false}
              tickCount={this.props.tickCount}
              tick={{ fill: 'white' }}
              width={100}
              label={{
                value:
                  this.props.type === AppConstant.GROSSMARGIN
                    ? this.props.data[0].Prefix +
                      ' ' +
                      this.props.data[0].Suffix2
                    : '',
                angle: -90,
                position: 'innnerRight',
                dx: -20,
                fill: 'white',
              }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={this.CustomTooltip}
            />

            <Bar
              dataKey="Value"
              fill="url(#barColor)"
              radius={[10, 10, 0, 0]}
              barSize={this.props.barSize}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="control-button">
          <>
            <button
              className={`${
                this.props.disableBtn ? 'disableBtn' : ''
              } button float-left ml-5`}
              disabled={this.state.x === 0}
              onClick={this.onClickHandlerPrev}
            >
              <i className="fa fa-chevron-left"></i>
            </button>

            <button
              className={`${
                this.props.disableBtn ? 'disableBtn' : ''
              } button float-right mr-2`}
              disabled={this.state.y === this.props.data.length}
              onClick={this.onClickHandlerNext}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </>
        </div>
        <div
          className="uk-flex uk-flex-center mb-3 mt-3 annualBarLegend"
          >
          <div className="pr-0">
            <span
              className={`legend ${
                this.props.type === AppConstant.FORECAST
                  ? 'forcast-tooltip'
                  : 'annual-tooltip'
              } ${this.props.roundedBar ? "roundedBar" : ""}`}
            ></span>
          </div>
          <div className="pt-1">
            <span className={`${cssClassName.COLOR_WHITE}`}>
              {this.props.type === AppConstant.GROSSMARGIN
                ? i18n.t("CURRENT_STATUS.ANNUAL_TOTAL_GR_MARGIN")
                : this.props.type === AppConstant.ACTUAL
                ?  i18n.t("LABELS.SPREAD_OPEARTION_TIME")
                : i18n.t("CURRENT_STATUS.FORCAST_REVERSE_ZAYA_DR_TIME")
              }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

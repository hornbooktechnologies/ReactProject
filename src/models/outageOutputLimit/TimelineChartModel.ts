export type TimeLineChartsList = TimeLineChartRow[]

type TimeLineChartRow = {
  name: string
  data: TimeLineChartData[]
}
type TimeLineChartData = {
  x: string
  y: [number, number]
  fillColor?: string
}

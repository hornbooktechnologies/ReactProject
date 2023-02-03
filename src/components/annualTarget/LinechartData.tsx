import Moment from 'moment'
import { DropDownConstant,DateformatConstant } from '../../utils/AppConstants'

let Objtype = {
  Period: String[''],
  Planned: Number[''],
  Forecast: Number[''],
  Actual: Number[''],
  Estimates: Number[''],
}
let dataObj = {
  currentDisable: Boolean,
  graphData: Objtype,
  nextDisable: Boolean,
  indexFound: Boolean,
  datelabel: String,
  Prefix: String,
  Suffix: String,
  Suffix2: String,
}
function getDatafunction(
  min: Moment.MomentInput,
  max: any,
  datafound: boolean,
  selectValue1: string
) {
  let dateminLabel = min
  let datemaxLabel = max
  if (!datafound && selectValue1 === DropDownConstant.WEEKLY_DATA) {
    dateminLabel = Moment(min).startOf('week')
    datemaxLabel = Moment(min).endOf('week')
  }

  if (selectValue1 === DropDownConstant.ANNUAL_DATA) {
    datemaxLabel = Moment(datemaxLabel).format(DateformatConstant.YYYY)
    dateminLabel = Moment(dateminLabel).format(DateformatConstant.YYYY)
  } else if (selectValue1 === DropDownConstant.MONTHLY_DATA) {
    datemaxLabel = Moment(datemaxLabel).format(DateformatConstant.MMMM_YYYY)
    dateminLabel = Moment(dateminLabel).format(DateformatConstant.MMMM_YYYY)
  } else if (selectValue1 === DropDownConstant.WEEKLY_DATA) {
    datemaxLabel = Moment(datemaxLabel).format(DateformatConstant.MM_DD_YYYY)
    dateminLabel = Moment(dateminLabel).format(DateformatConstant.MM_DD) + ' - ' + datemaxLabel
  } else if (selectValue1 === DropDownConstant.DAILY_DATA) {
    datemaxLabel = Moment(datemaxLabel).format(DateformatConstant.MMMM_DO_YYYY)
    dateminLabel = Moment(dateminLabel).format(DateformatConstant.MMMM_DO_YYYY)
  } else {
    datemaxLabel = Moment(datemaxLabel).format(DateformatConstant.YYYY)
    dateminLabel = Moment(dateminLabel).format(DateformatConstant.YYYY)
  }
  return dateminLabel
}
let FetchData = (
  propsData: { [x: string]: any; Prefix: any; Suffix: any; Suffix2: any },
  index: string,
  selectedDate: any,
  SelectedType: any
) => {
  let linechartdata = Object.create(dataObj)

  let d = new Date()
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  let currDate = d.getTime()
  let parsed1 = propsData[index]
  let currentDisable1 = false
  let mindatelabel = selectedDate
  let maxdateLabel = selectedDate
  let datelabel = ''
  let nextDisable1 = true
  let dummy = []
  for (let key in propsData) {
    if (!isNaN(key)) {
      dummy.push(key)
    }
  }
  let ObjLenght = dummy.length
  if (parseInt(index) > 0 && ObjLenght >= parseInt(index)) {
    var filteredPeriod = parsed1.Period.filter(function (el: null) {
      return el != null
    })
    let currminDate = new Date(parsed1.Period[0]).getTime()
    let currmaxDate = new Date(
      filteredPeriod[filteredPeriod.length - 1]
    ).getTime()

    if (currDate >= currminDate && currDate <= currmaxDate) {
      currentDisable1 = true
    } else {
      currentDisable1 = false
    }
    mindatelabel = currminDate
    maxdateLabel = currmaxDate
    datelabel = getDatafunction(mindatelabel, maxdateLabel, true, SelectedType)
  } else {
    mindatelabel = selectedDate
    maxdateLabel = selectedDate
    datelabel = getDatafunction(mindatelabel, maxdateLabel, false, SelectedType)
  }
  if (parseInt(index) === ObjLenght) {
    nextDisable1 = true
  } else {
    nextDisable1 = false
  }

  linechartdata.currentDisable = currentDisable1

  if (propsData[index]) {
    var result1 = propsData[index].Actual.every((e: null) => e === null)
    var result2 = propsData[index].Forecast.every((e: null) => e === null)
    var result3 = propsData[index].Planned.every((e: null) => e === null)

    linechartdata.graphData = JSON.stringify(propsData[index])

    if (result1 && result2 && result3) {
      linechartdata.graphData = null
    } else {
      linechartdata.graphData = JSON.stringify(propsData[index])
    }
  } else {
    linechartdata.graphData = null
  }
  if (parseInt(index) === 0) {
    linechartdata.indexFound = false
  }
  linechartdata.indexFound = true
  linechartdata.nextDisable = nextDisable1
  linechartdata.datelabel = datelabel
  linechartdata.Prefix = propsData.Prefix
  linechartdata.Suffix = propsData.Suffix
  linechartdata.Suffix2 = propsData.Suffix2
  return linechartdata
}

export { FetchData }

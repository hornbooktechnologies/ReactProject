import differenceInHours from 'date-fns/differenceInHours'
import {DateformatConstant} from "../utils/AppConstants"

export const calculateHrs = (
  startDate: Date | undefined | null,
  endDate: Date | undefined | null
): number => {
  let ret = 0
  if (startDate && endDate) {
    ret = differenceInHours(new Date(endDate), new Date(startDate))
  }
  return ret
 
}

export const getFiscalYearStartDate = () => {
  const getfiscalyear = getFiscalYear()
  const ret = getfiscalyear + DateformatConstant.FISCAL_YEAR
  return ret
}

export const getFiscalYearEndDate = () => {
  const getfiscalendyear = getFiscalYear() + 1
  const ret = getfiscalendyear + DateformatConstant.FISCAL_END_YEAR
  return ret
}

export const getFiscalYear = (): number => {
  if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 3) {
    return new Date().getFullYear() - 1
  } else {
    return new Date().getFullYear()
  }
}

export const getCurrentdate = (): string => {
  const today = new Date()
  const currentdate =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2) +
    'T' +
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds()
  return currentdate
}

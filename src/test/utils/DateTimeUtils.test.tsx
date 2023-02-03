import React from "react";

import differenceInHours from "date-fns/differenceInHours";
import { DateformatConstant } from "../../utils/AppConstants";
import {
  calculateHrs,
  getFiscalYearStartDate,
  getFiscalYearEndDate,
  getFiscalYear,
  getCurrentdate,
} from "../../utils/DateTimeUtils";
describe("DateTimeUtils", () => {
  const startDate = new Date("2016-04-01T00:00");
  const endDate = new Date("2016-05-01T00:00");
  let ret = 0;

  const getfiscalyear = getFiscalYear();
  const getFiscalStartret = getfiscalyear + DateformatConstant.FISCAL_YEAR;
  if (startDate && endDate) {
    ret = differenceInHours(new Date(endDate), new Date(startDate));
  }

  const getfiscalendyear_1 = getFiscalYear() + 1;
  const getFiscalEndret =
    getfiscalendyear_1 + DateformatConstant.FISCAL_END_YEAR;

  const today = new Date();
  const currentdate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2) +
    "T" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  it("calculateHrs", () => {
    expect(calculateHrs(startDate, endDate)).toBe(ret);
  });

  it("getFiscalYearStartDate", () => {
    expect(getFiscalYearStartDate()).toBe(getFiscalStartret);
  });

  it("getFiscalYearEndDate", () => {
    expect(getFiscalYearEndDate()).toBe(getFiscalEndret);
  });

  it("getFiscalYear", () => {
    expect(getFiscalYear()).toBe(new Date().getFullYear() - 1);
  });

  it("getCurrentdate", () => {
    expect(getCurrentdate()).toBe(currentdate);
  });
});

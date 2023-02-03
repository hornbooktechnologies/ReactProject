import React, { useRef } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import {
  DateformatConstant,
  ChartConstant,
} from '../../utils/AppConstants'
import { DataChangeOptionsModel } from '../../models/LinechartModel'
import { getSelectedValue } from '../../utils/AnnualTargetutils'
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/scss/datepicker.scss'

const DataChangeOptions = ({
  linechartData,
  onClickPrev,
  startDate,
  setStartDate,
  onClickNext,
  selectValue,
  customClass
}: DataChangeOptionsModel) => {
  const { i18n } = useTranslation();
  const datepickerRef = useRef(null)
  function handleClickDatepickerIcon() {
    const datepickerElement = datepickerRef.current
    datepickerElement.setFocus(true)
  }

  return (
    <>
      <div className="uk-margin-auto-left uk-flex uk-flex-middle uk-flex-wrap uk-width-1-1 uk-width-auto@s mt-15 top-m1">
        <div className="uk-flex uk-flex-middle uk-width-1-1 uk-width-auto@s">
          <button className="uk-button-outline" onClick={onClickPrev}>
            <i className="jera-arrow-left-2 color-white"></i>
          </button>
          <div className="uk-field-with-icon ml-10 m-w-200 uk-width-1-1 uk-width-auto@s mt-m14">
            <div className="form-control">
              <label className="uk-custom-label">
                <span>{i18n.t(getSelectedValue(selectValue))}</span>
              </label>
            </div>

            <div className="cal-inline">
              <p className="m-0 pr-4">{`${linechartData?.datelabel}`}</p>
            </div>
            <label className="mb-0">
              {selectValue === ChartConstant.ANNUAL_DATA ||
              selectValue === ChartConstant.CUMULATIVE_DATA ? (
                <DatePicker
                  selected={startDate}
                  format={DateformatConstant.YYYY}
                  ref={datepickerRef}
                  popperClassName={`${
                    customClass ? customClass : ''
                  } yearpicker`}
                  showYearPicker
                  onChange={(value) => setStartDate(value)}
                />
              ) : selectValue === ChartConstant.MONTHLY_DATA ? (
                <DatePicker
                  selected={startDate}
                  format={DateformatConstant.YYYY}
                  ref={datepickerRef}
                  popperClassName={`${
                    customClass ? customClass : ''
                  } monthpicker`}
                  showMonthYearPicker
                  onChange={(value) => setStartDate(value)}
                />
              ) : (
                <DatePicker
                  selected={startDate}
                  format={DateformatConstant.YYYY}
                  popperClassName={`${
                    selectValue === ChartConstant.WEEKLY_DATA
                      ? 'weekpicker'
                      : 'daypicker'
                  } ${customClass ? customClass : ''}`}
                  ref={datepickerRef}
                  onChange={(value) => setStartDate(value)}
                />
              )}

              <i
                className="jera-calendar-1 icn top-26"
                onClick={() => handleClickDatepickerIcon()}
              ></i>
            </label>
          </div>
          <button
            className="uk-button-outline ml-10"
            onClick={onClickNext}
            disabled={linechartData?.nextDisable}
          >
            <i className="jera-arrow-right-3 color-white"></i>
          </button>
        </div>
        {linechartData?.currentDisable === false ? (
          <button
            className="uk-button-outline filled uk-width-1-1 uk-width-auto@s uk-margin-small-left@s uk-margin-small-top uk-margin-remove-top@s"
            onClick={(e) => {
              setStartDate(new Date())
            }}
          >
            <i className="mr-5 font-20 jera-undo color-white"></i>
            {i18n.t('LABELS.RETURN')}
          </button>
        ) : null}
      </div>
    </>
  )
}

export default DataChangeOptions

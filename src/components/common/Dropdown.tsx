import React from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { DropDownConstant } from '../../utils/AppConstants'
import { LinechartDropdownModel } from '../../models/LinechartModel'
import '../../assets/scss/_dropdown.scss'

const LinechartDropDown = ({
  onSelectHandler,
  cumulativeDisable,
  customClass,
  isSpreadOptions
}: LinechartDropdownModel) => {
  const { i18n } = useTranslation();

  const DropDownData = {
    options: [
      {
        value: DropDownConstant.ANNUAL_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.ANNUAL_VIEW')}`,
      },
      {
        value: DropDownConstant.MONTHLY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.MONTHLY')}`,
      },
      {
        value: DropDownConstant.WEEKLY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.WEEKLY')}`,
      },
      {
        value: DropDownConstant.DAILY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.DAILY')}`,
      },
    ],
    optionsofcumulative: [
      {
        value: DropDownConstant.ANNUAL_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.ANNUAL_VIEW')}`,
      },
      {
        value: DropDownConstant.MONTHLY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.MONTHLY')}`,
      },
      {
        value: DropDownConstant.WEEKLY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.WEEKLY')}`,
      },
      {
        value: DropDownConstant.DAILY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.DAILY')}`,
      },
      {
        value: DropDownConstant.CUMULATIVE_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.CUMULATIVE')}`,
      },
    ],
    optionsOfSpread: [
      {
        value: DropDownConstant.ANNUAL_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.ANNUAL_VIEW')}`,
      },
      {
        value: DropDownConstant.MONTHLY_DATA,
        label: `${i18n.t('DROPDOWN_OPTIONS.MONTHLY')}`,
      },
      ],
  }
  return (
    <div
      className="form-control">
      <label className="uk-custom-label">
        <span>{i18n.t("LABELS.DISPLAY")}</span>
      </label>
      <Select
          className={`${
          customClass ? customClass : ''
        } `}
        classNamePrefix="form_select_input"
        options={
          isSpreadOptions === true
            ? DropDownData.optionsOfSpread
            : cumulativeDisable === false
            ? DropDownData.optionsofcumulative
            : DropDownData.options
        }
        onChange={onSelectHandler}
        isSearchable={false}
        isClearable={false}
        defaultValue={
          cumulativeDisable === false
            ? DropDownData.optionsofcumulative[0]
            : DropDownData.options[0]
        }
      />
    </div>
  )
}

export default LinechartDropDown

import React from 'react'
import { ChartConstant } from "../../utils/AppConstants";
import { useTranslation } from 'react-i18next'

const CustomLabel = (props: { viewBox: { x: number; y: number; }; }) => {
  const { i18n } = useTranslation();
  return (
    <>
     <g fill={ChartConstant.LABEL_COLOR} transform="rotate(-90)">
        <rect
          y={props.viewBox?.x - ChartConstant.VIEWBOX_20}
          x={props.viewBox?.y - ChartConstant.VIEWBOX_75}
          fill={ChartConstant.LABEL_COLOR}
          rx="2"
          width={50}
          height={20}
        />
        <text
          className="custom-label-text"
          y={props.viewBox?.x - ChartConstant.VIEWBOX_20}
          x={props.viewBox?.y - ChartConstant.VIEWBOX_75}
          radius={10}
          fill={ChartConstant.LABEL_TEXT_COLOR}
          dy={13}
          dx={10}
        >
          {i18n.t('LABELS.PRESENT')}
        </text>
      </g>
    </>
  );
};
export default CustomLabel;
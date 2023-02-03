import { useTranslation } from "react-i18next"
import { cssClassName } from "../../../utils/CssConstants"

const PieRatioTooltip = (props: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <span className="font-12 totalRatio">{ i18n.t('CHARTS.DONUT.TOOLTIP_HEAD') }</span>
            <span className="uk-tooltip-cutom tooltip-text">
                <i className="jera-info-circle icn-16 color-blue-70 top-2 ml-3" />
                <div className="uk-tooltip uk-animation-scale-up uk-animation-center uk-transdorm-origin-center-left uk-togglabe-enter uk-tooltip-bottom uk-tooltip-bottom-center uk-transform-origin-center-left uk-text-left font-10">
                    <span className={`${cssClassName.COLOR_GREY_BLUE_80} uk-display-block`}>
                        <strong className={`${cssClassName.COLOR_GREY_BLUE_95}`}>
                            { i18n.t('CHARTS.DONUT.TOOLTIP_MAIN_TEXT') }
                        </strong>
                        &nbsp; { i18n.t('CHARTS.DONUT.TOOLTIP_SUB_TEXT') }
                    </span>
                    <span className={`${cssClassName.COLOR_RED_60} mt-15 uk-display-block`}>
                        { i18n.t('CHARTS.DONUT.EQUATION') }
                    </span>
                    <span className={`${cssClassName.COLOR_GREY_BLUE_80} uk-display-block`}>
                        { i18n.t('CHARTS.DONUT.EQUATION_LHS') } = Y ({props.equationY}) / X ({props.equationX})
                    </span>
                </div>
            </span>
        </>
    )
}

export default PieRatioTooltip
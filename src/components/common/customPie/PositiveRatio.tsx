import { cssClassName } from "../../../utils/CssConstants"

type Props = {
    changePercent: number
}

const PositiveRatio = (props: Props) => {
    const { changePercent } = props;
    return (
        <>
            <div className="jera-like-font">
                <i className={`jera ${cssClassName.JERA_LIKE_ICON_CLASS}`}></i>
            </div>
            <div className={`font-prvalue ${cssClassName.COLOR_GREEN_60}`}>
                <span>{changePercent}</span>
                <span className="font-12 vertical-top">%</span>
            </div>
        </>
    )
}

export default PositiveRatio
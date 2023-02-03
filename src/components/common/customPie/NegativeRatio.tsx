import { cssClassName } from "../../../utils/CssConstants"

type Props = {
    changePercent: number
}

const NegativeRatio = (props: Props) => {
    const { changePercent } = props;
    return (
        <>
            <div className="jera-dislike-font">
                <i className={`jera ${cssClassName.JERA_DISLIKE_ICON_CLASS}`}></i>
            </div>
            <div className={`font-prvalue ${cssClassName.COLOR_RED_60}`}>
                <span>{changePercent}</span>
                <span className="font-12 vertical-top">%</span>
            </div>
        </>
    )
}

export default NegativeRatio
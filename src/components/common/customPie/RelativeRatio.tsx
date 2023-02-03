import NegativeRatio from "./NegativeRatio";
import PieRatioTooltip from "./PieRatioTooltip";
import PositiveRatio from "./PositiveRatio";

type Props = {
    changePercent: number
    isPositiveRatio: boolean 
    equationX: string
    equationY: string
}

const RelativeRatio = (props: Props) => {
    const { changePercent, isPositiveRatio, equationX, equationY } = props;
    const ratioProps = { changePercent }
    const tooltipProps = { equationX, equationY }
    return (
      <>
        <div className="uk-text-center thumb-font">
          {(changePercent > 0 || changePercent <= 0) &&
            (isPositiveRatio ? (
              <>
                <PositiveRatio {...ratioProps} />
              </>
            ) : (
              <>
                <NegativeRatio {...ratioProps} />
              </>
            ))}
          <div>
            <PieRatioTooltip {...tooltipProps} />
          </div>
        </div>
      </>
    )
}

export default RelativeRatio
import { cssClassName } from "../../utils/CssConstants";
const Spinner = () => {
  return (
    <div className="spinner">
      <div className={`${cssClassName.COLOR_WHITE}`}>
        <div uk-spinner="ratio: 3"></div>
      </div>
    </div>
  )
}
export default Spinner;

import {
  GeneratorDropdownModel,
} from '../../models/DropdownModel'
import Select from 'react-select'
import '../../assets/scss/_dropdown.scss'

const GeneratorDropDown = ({
  onSelectHandler,
  data,
  label,
  customClass,
  selectValue
}: GeneratorDropdownModel) => {


  return (
    <div className={`${customClass ? "mr-24":""} dropdown-select form-control`}>
    <label className="uk-custom-label">
        <span>{label}</span>
      </label>
      <Select
        // menuIsOpen
        classNamePrefix="form_select_input"
        options={data}
        onChange={onSelectHandler}
        isSearchable={false}
        isClearable={false}
        defaultValue={data[0]}
        value = {
          data.filter(option =>
             option.value === selectValue)
       }
      />
    </div>
  )
}

export default GeneratorDropDown

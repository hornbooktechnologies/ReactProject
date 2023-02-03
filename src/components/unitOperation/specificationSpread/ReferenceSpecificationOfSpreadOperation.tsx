import { ValuesBaseModel } from "../../../models/unitOperation/UnitOperationModel";
import ReferenceSpecificationTable from "./ReferenceSpecificationTable";

const ReferenceSpecificationOfSpreadOperation = (referenceSpecification: ValuesBaseModel) => {
    return (
        <>
          <div>
            <ReferenceSpecificationTable {...referenceSpecification} />
          </div>
        </>
    );
}

export default ReferenceSpecificationOfSpreadOperation
import { ChangeEvent } from "react"

export type DropDownData = {
    label: string
    value: string
}

export type GeneratorDropdownModel = {
    onSelectHandler: (selectValue: ChangeEvent<{ value: string; }>) => void;
    selectValue?: string;
    data: DropDownData[];
    label?:string;
    customClass?:string;
}
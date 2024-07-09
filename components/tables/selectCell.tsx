"use client"

import { CellContext, Column, Row, Table, TableFeature } from "@tanstack/react-table";
import {  Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,} from "../ui/select";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    getValue: () => string,
    row: Row<object>,
    column: Column<object>,
    table: any
    placeholder?: string
    options: {name: string, color: string, id: number}[]
}

function SelectCell({getValue, row, column, table, ...props}: Props) {
    const initalValue = getValue()
    const [value, setValue] = useState(initalValue)
    const {updateData} = table.options.meta

    const placeholder = props.placeholder || ""
    const color = null

    console.log(table.options.columns[row.index]?.display)

    return (
        <div className={twMerge("justify-center flex h-full")}>
             <Select 
             value={value}
             onValueChange={
                (value) => {
                    updateData(
                        row.index,
                        column.id,
                        value
                    )
                    setValue(value)
             
               }}
             >
                <SelectTrigger className={`${color ? `bg-[${color}]` : "bg-transparent"} h-full rounded-none border-none focus-visible:ring-offset-5 focus-visible:ring-1 dark:focus-visible:ring-neutral-600 focus-visible:ring-neutral-300 focus-visible:ring-inset hover:bg-neutral-200 dark:hover:bg-neutral-800`}>
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent>

                <SelectGroup>
                    {props.options.map(option => 
                    <SelectItem 
                        value={option.name}      
                        key={option.id}
                    >
                        {option.name}
                        
                    </SelectItem>)}
                </SelectGroup>
      </SelectContent>

             </Select>
        </div>
    );
}

export default SelectCell;
"use client"

import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    getValue: () => any,
    row: object,
    column: object,
    table: object
}

function CheckboxCell({getValue}: Props) {
    const initialValue = getValue() || false 
    const [value, setValue] = useState(initialValue)

    return (
        <div className={twMerge("justify-center flex h-full", `${value && "bg-green-600"}`)}>
             <Checkbox 
                  isSelected={value}
                  defaultSelected size="sm" 
                  onValueChange={setValue}      
                  classNames={{
                    base: twMerge(
                      "flex justify-center pl-4",
                      "cursor-pointer",
                    ),
                  }}
                  />
           
        </div>
    );
}

export default CheckboxCell;
"use client"

import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { forwardRef } from "react";

interface Props extends Partial<SelectProps>{
    items: {
        id: string
        name: string
    }[]
}

const SelectNextUi = forwardRef((props: Props, ref: any) => {
    if (!props.items) return
    if (!props.items.find(e => e.name == props.defaultSelectedKeys)) return

    return (
        <div className="w-full">
               <Select
                {...props}
                disallowEmptySelection={true}
                ref = {ref}
                >
                        {props.items.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                            {item.name}
                        </SelectItem>
                        ))
                    }
              </Select>
        </div>
    );
}) 

SelectNextUi.displayName = "SelectNextUi";

export default SelectNextUi;
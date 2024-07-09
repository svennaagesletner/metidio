"use client"

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function EditableCell({getValue, row, column, table, rowIndex}: any) {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)
    
    const [isFocus, setIsFocus] = useState(false)


    const onBlur = () => {
        table.options.meta?.updateData(
            row.index,
            column.id,
            value
        )
        setIsFocus(false)
    }

    const onFocus = () => {
        setIsFocus(true)

    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    

    return (
        <Input
        value={!isFocus && table.options.columns[row.index]?.display ?  value.slice(0,3) : value  }
        onChange={e => {
            setValue(e.target.value) 
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        className="h-full w-full pr-0 pl-2 rounded-none border-none focus-visible:ring-offset-5 focus-visible:ring-1 dark:focus-visible:ring-neutral-600 focus-visible:ring-neutral-300 focus-visible:ring-inset  hover:bg-neutral-200 dark:hover:bg-neutral-800 bg-transparent"
        />
    );
}

export default EditableCell;

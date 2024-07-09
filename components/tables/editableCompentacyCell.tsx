"use client"

import { Input } from "@/components/ui/input";
import { setFips } from "crypto";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function EditableCompetancyCell({getValue, row, column, table, subject}: any) {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)
    
    const [isFocus, setIsFocus] = useState(false)


    const onBlur = () => {
        if (!value || !parseInt(value)) setValue(0)
        table.options.meta?.updateData(
            row.index,
            column.id,
            parseInt(value)
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
        value={value}
        onChange={e => {
            setValue(e.target.value) 
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        className={twMerge(
            "h-full text-center rounded-none border-none focus-visible:ring-offset-5 focus-visible:ring-1 dark:focus-visible:ring-neutral-600 focus-visible:ring-neutral-300 focus-visible:ring-inset bg-transparent px-0",
            value >= subject.min && "bg-green-600" ,
            value > 0 && value < subject.min && "bg-yellow-500" ,
            value === 0 && " hover:bg-neutral-200 dark:hover:bg-neutral-800",
            )}
        />
    );
}

export default EditableCompetancyCell;

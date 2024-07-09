"use client"

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { nb } from "date-fns/locale"

import { Calendar } from "../ui/calendar";


function DatePickerCell({getValue, row, column, table, rowIndex}: any) {
    const initialValue = getValue()
    const [date, setDate] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(
            row.index,
            column.id,
            date
        )
    }


    return (
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-full w-full border-none justify-center text-left font-normal rounded-none focus-visible:ring-offset-5 focus-visible:ring-1 dark:focus-visible:ring-neutral-600 focus-visible:ring-neutral-300 focus-visible:ring-inset hover:bg-neutral-200 dark:hover:bg-neutral-800 bg-transparent",
            !date && "text-muted-foreground"
          )}
        > 
        {date ? (<>
            <div>
            {format(date, "P")}
            </div>
            <div 
            className="pl-2 hover:text-emerald-500"
            onClick={(e) => {
                e.preventDefault()
                setDate(null)
            }}
            >&times;</div>
            </>
            
         ) :(
            <CalendarIcon className="mr-1 h-3 w-3" />
        ) 
        }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onBlur={onBlur}>
        <Calendar
          mode="single"
          locale={nb}
          selected={date}
          onSelect={setDate}
          initialFocus
          className=""
  
        />
      </PopoverContent>
    </Popover>
    );
}

export default DatePickerCell;
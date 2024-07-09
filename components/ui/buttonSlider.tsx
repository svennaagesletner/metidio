"use client"

import React from "react";
import {Switch, cn} from "@nextui-org/react";

export default function ButtonSlider({onChange, isSelected}: any) {

  return (
    <Switch
      onChange={onChange}
      isSelected={isSelected}
      size={"sm"}
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md bg-neutral-100 dark:bg-neutral-900 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
          "data-[selected=true]:",
        ),
        wrapper: cn(
            "p-0 h-2 w-8 overflow-visible bg-neutral-300",
            "group-data-[selected=true]:bg-neutral-500"
        ),
        thumb: cn("w-4 h-4 border-2 shadow-lg",
          "group-data-[hover=true]:border-neutral-600",
          //selected
          "group-data-[selected=true]:ml-4",
          // pressed
          "group-data-[pressed=true]:w-6",
          "group-data-[selected]:group-data-[pressed]:ml-2",
        ),
      }}
    >
      <div className="flex flex-col">
        <p className="text-sm">Hent alle</p>
      </div>
    </Switch>
  );
}

"use client"

import {   Autocomplete,
    AutocompleteItem, AutocompleteProps } from "@nextui-org/react";

interface Props extends Partial<AutocompleteProps>{
    formState: any
    logo: React.ReactNode
    name: string    
}
const FormAutoCompleteNextUi = (props: Props, ref: any) => {
    const {formState, label, name, logo} = props
    
    return (
        <div id={`form${name}`}>
        <label
        className="mb-1 mt-3 block text-xs font-medium text-white-500"
        htmlFor={name}
        >
        {label}
        </label>
        <div className="relative">
               <Autocomplete
                {...props}
                defaultItems={props.defaultItems || []}
                label={""}
                inputProps={{
                    classNames: {
                      input: "ml-7",
                      inputWrapper: `${formState && formState.errors && formState.errors[name] && "border-red-400 "} h-10 bg-transparent rounded-sm peer input-primary`
                    },
                  }}
                listboxProps={{
                    hideSelectedIcon: false,
                    itemClasses: {
                      base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    },
                  }}
                >
            {
            (item: any) => <AutocompleteItem key={item.name} id={item.name}>{item.name}</AutocompleteItem>
                        
                    }
              </Autocomplete>
        {logo}
            </div>
            {formState && formState.errors && formState.errors[name] && (
            <>
            <p className="text-sm text-red-600">{formState?.errors[name]}</p>
            </>
        )}
      </div>
    );
}

export default FormAutoCompleteNextUi;
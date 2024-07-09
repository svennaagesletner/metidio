"use client"

import {   SelectProps, SelectItem, Select } from "@nextui-org/react";
import { forwardRef } from "react";

interface Props extends Partial<SelectProps>{
    formState: any
    logo: React.ReactNode
    name: string    
}
const FormSelecNextUi = forwardRef((props: Props, ref) => {
    const {formState, label, name, logo} = props
    return (
        <div>
        <label
        className="mb-1 mt-3 block text-xs font-medium text-white-500"
        htmlFor={name}
        >
        {label}
        </label>
        <div className="relative">
               <Select
                {...props}
                label={""}
                classNames={{
                  base: `${formState && formState.error && formState.errors[name] && "border-red-400 "} p-0 rounded-sm peer input-primary`,
                  trigger: "w-full h-10 rounded-sm m-0 p-0 pl-10"
                }}
                >
            {
            (item: any) => <SelectItem key={item.name} value={item.key}>{item.name}</SelectItem>
                        
                    }
              </Select>
        {logo}
            </div>
            {formState && formState.errors && formState.errors[name] && (
            <>
            <p className="text-sm text-red-600">{formState?.errors[name]}</p>
            </>
        )}
      </div>
    );
})

FormSelecNextUi.displayName = "FormSelecNextUi";

export default FormSelecNextUi
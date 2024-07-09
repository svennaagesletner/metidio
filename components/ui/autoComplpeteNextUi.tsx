"use client"

import {   Autocomplete,
    AutocompleteSection,
    AutocompleteItem, SelectProps, AutocompleteProps, AutocompleteItemProps } from "@nextui-org/react";
import { forwardRef } from "react";

interface Props extends Partial<AutocompleteProps>{
    
}


const AutoCompleteNextUi = (props: Props, ref: any) => {

    return (
        <div className="w-full">
               <Autocomplete
                {...props}
                >
            {
            (item: any) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
                        
                    }
              </Autocomplete>
        </div>
    );
}

export default AutoCompleteNextUi;
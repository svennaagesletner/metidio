import { FieldError, FormState } from "react-hook-form"
import clsx from 'clsx';
import { User } from "@prisma/client";



interface Props {
        id: string
        name: string
        type: string
        label: string
        className: string
        placeholder: string
        setValue?: any | undefined
        defaultValue?: string | undefined
        logo: React.ReactNode
        formstate: any // Provide a type argument for FormState
  }


function FormInput(props: Props) {
    const {formstate, label, name, logo} = props
    return (
        <div>
            <label
            className="mb-1 mt-3 block text-xs font-medium text-white-500"
            htmlFor={name}
            >
            {label}
            </label>
            <div className="relative">
            <input
                {...props}
            />
            {logo}
            </div>
            {formstate && formstate.errors && formstate.errors[name] && (
            <>
            <p className="text-sm text-red-600">{formstate?.errors[name]}</p>
            </>
        )}
      </div>
    );
}

export default FormInput;
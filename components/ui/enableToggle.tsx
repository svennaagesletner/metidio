"use client"

import React, { forwardRef } from "react";
import {useCheckbox, Chip, VisuallyHidden, tv, SelectProps} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "h-[40px] border border-white transforms hover:scale-105 cursor-pointer rounded-md",
    content: "text-default-500 text-xs"
  },
  variants: {
    isSelected: {
      true: {
        base: " border border-white bg-emerald-500 transforms hover:scale-105",
        content: "text-white pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
})

interface Props extends Partial<SelectProps>{
    defaultSelected: boolean
    state: React.Dispatch<React.SetStateAction<boolean>>
}


const EnableToggle = forwardRef((props: Props, ref: any,) => {
    
    const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    isSelected: props.defaultSelected,
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  const handleClick = () => {
      props.state(!isSelected)
  }

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        ref={ref}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        onClick={handleClick}
      >
        {children ? children : isSelected ? "Aktiv" : "Deaktivert"}
      </Chip>
    </label>
  );
})


const CheckIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) =>
  (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="lightGrey"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  EnableToggle.displayName = "EnableToggle"

  export default EnableToggle

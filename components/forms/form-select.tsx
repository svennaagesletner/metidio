import { ChangeEvent, MutableRefObject, useEffect, useRef } from "react";
  
  interface ListItem {
    id: string;
    name: string;
  }

  interface Props {
    id: string
    name: string
    label: string
    logo: React.ReactNode
    className: string
    refs: MutableRefObject<HTMLSelectElement>
    setValue: any | undefined
    value: string
    formstate: any
    options: string[]
  }
  
  function FormSelect({options, formstate, className, logo, label, id, name, refs, setValue, value}:Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClick, false);
      return () => document.removeEventListener('mousedown', handleClick, false);
    }, []);
  
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        return;
      }
    };
  
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
    };
    
    return (
      <div className='mt-2'>
      <label
        className="mb-1 mt-3 block text-xs font-medium text-white-500"
        htmlFor="role"
      >
        {label}
      </label>
      <div className="relative">
      <div className="relative">
        <div tabIndex={0} className="">
          <select
            ref={refs}
            id={id}
            className={className}
            name={name}
            value={value}
            onChange={handleChange}
          >

            {options.length !== 0 &&
                    options.map((option) => (
                    <option
                        key={option}
                        className=""
                    >
                    {option}

                    </option>
                    ))}


          </select>
        </div>
      </div>
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
  
  export default FormSelect;
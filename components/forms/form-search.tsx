"use client"

import { searchFilter } from "@/lib/actions/searchFilter";
import { ChangeEvent, MutableRefObject, PropsWithRef, PropsWithoutRef, RefObject, useEffect, useRef, useState } from "react";
  
  interface ListItem {
    id: string;
    name: string;
  }

  interface Props {
    id: string
    name: string
    label: string
    placeholder: string
    className: string
    refs: MutableRefObject<HTMLInputElement>
    defaultValue?: string | undefined
    setValue: any | undefined
    value: string
    logo: React.ReactNode
    formstate: any
    list: []
  }
  
  function SearchInput({list, label, className, logo, formstate, id, name, placeholder, refs, setValue, value, defaultValue}:Props, props: Props) {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      //setSearchValue(defaultValue)
      document.addEventListener('mousedown', handleClick, false);
      return () => document.removeEventListener('mousedown', handleClick, false);
    }, []);
  
    console.log(searchValue)

    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        return;
      }

      setVisible(false);
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setValue(e.target.value)
      if (!visible) {
        setVisible(true);
      }
    };
  
    const selectItem = (item: ListItem) => {
      setSearchValue(item.name);
      setValue(item.name)
      setSelectedItem(item.id);
      setVisible(false);
    };
  
    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    };
  
    return (
      <div className="mt-2">
      <label
        className="mb-1 mt-3 block text-xs font-medium text-white-500"
        htmlFor="municipality"
      >
        {label}
      </label>
      <div className="relative">
      <div className="">
      <div className="relative">
        <div tabIndex={0} className="">
          <input
            ref={refs}
            id={id}
            className={className}
            name={name}
            type="text"
            placeholder={placeholder}
            defaultValue={searchValue}
            onChange={handleChange}
            onFocus={() => {
              setVisible(true);
            }}
      
          />
        </div>
        <div ref={dropdownRef} className={`absolute w-full z-10 visible bg-white border rounded-sm`}>
          {visible && (
            <ul>
              {list &&
                searchFilter({ searchValue, list, searchBy: "name" })?.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className="dropdown_item"
                  >
                    <div className="select-field cursor-pointer px-3">{item.name}</div>
                  </li>
                ))}
            </ul>
          )}
          </div>
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
  
  export default SearchInput;
  
import { Search } from "lucide-react";
import { Dispatch } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    placeholder: string
    classNames?: string
    columnFilters: ColumnFilter[]
    setColumnFilters: Dispatch<React.SetStateAction<ColumnFilter[]>>
}

function SearchComponent({placeholder, classNames, columnFilters, setColumnFilters, ...props}: Props) {
    const searchText = columnFilters?.find( f => f.id === "firstName")?.value || ""

    const onFilterChange = (id: string, value: string) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })

    )
    return (
        <div className={twMerge("flex items-center bg-neutral-100 dark:bg-neutral-700 rounded-sm p-1 h-7", classNames)}>
                    <Search size={14} />
                    <input 
                    type="text" 
                    className="pl-2 text-xs bg-transparent focus:outline-none w-full"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={(e) => onFilterChange('firstName', e.target.value)}
                    {...props}
                    />
        </div>
    );
}

export default SearchComponent;
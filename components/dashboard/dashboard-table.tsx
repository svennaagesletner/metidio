"use client"

import { TranslateKeyToLanguage } from "@/lib/misc/languageMapping";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchComponent from "../ui/search";
import Link from "next/link";
import { Button } from "../ui/button";
import Pagination from "./pagination";
import { useRouter } from "next/navigation";

const EditableCell = ({ value, onSave }: any) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
  
    const handleDoubleClick = () => {
      setEditing(true);
    };
  
    const handleBlur = () => {
      setEditing(false);
      onSave(text);
    };
  
    const handleChange = (e: any) => {
      setText(e.target.value);
    };
  
    const handleKeyPress = (e: any) => {
      if (e.key === 'Enter') {
        handleBlur();
      }
    };
  
    return (
      <div
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
      >
        {editing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        ) : (
          <div>{value}</div>
        )}
      </div>
    );
  };

interface Props {
        data: any
        buttonTitle: string
        buttonLink: string
        category: "users" | "schools" | "municipalities"
}

interface Row {
  title: string
  image?: string
  id: string
  data: string
}

function DashboardTable({data, buttonTitle, buttonLink, category}: Props) {
    const [tableData, setTableData] = useState([])

    const router = useRouter()


    const handleClick = (userId:string, category: string) => {
        router.push(`/portal/dashboard/${category}/edit/${userId}/?sort=asc`)
    }

    useEffect(() => {
        const rowData = data.map((entry: any) => {
            return (
                entry.map((row: Row) => {
                    if (row.title === "Rolle") {
                      const newData =  TranslateKeyToLanguage({key: row.data, language: "norwegian"})
                      return [row.id, newData]
                    }
                    
                    if (row.title === "Navn") {
                      return row.hasOwnProperty('image') ? [row.id, (<><Image src={row.image == null ? "/no-avatar.webp" : row.image }  width={24} height={24} className="rounded-full mr-1" alt={"userImage"} />{row.data}</>)]: [row.id, row.data]

                    }
            
                    return [row.id, row.data]
                })
            )
        })
        setTableData(rowData)
    }, [])


    const titles = data[0].map((entry:any, index:number) => {
        return (<td key={entry.title} className="p-2">{entry.title}</td>)
    })

  /*  const rows = data.map((entry:any, index:number) => {
        return (
            <tr key={index} className={`${index%2 != 0 ? "bg-neutral-100 dark:bg-neutral-800/40" : "dark:bg-transparent" } hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer`}>
                {entry.map((row:Row) => {
                    return (
                        <td className="px-2 py-1 whitespace-nowrap overflow-hidden" data-title={row.title} data-id={row.id} key={`${row.id}_${row.title}`}>
                            <div 
                            className="flex items-center"
                            onClick={handleClick}
                            >
                            {row.hasOwnProperty('image') && <Image src={row.image == null ? "/no-avatar.webp" : row.image }  width={24} height={24} className="rounded-full mr-1" alt={"userImage"} />}
                            {row.data}
                            </div>
                         
                        </td>
                    )
                }
                )} 
            </tr>
        )
}) */

const rowsNew = tableData.map((row:[], rowIndex:number) => {
  return (
      <tr key={rowIndex} className={`${rowIndex%2 != 0 ? "bg-neutral-100 dark:bg-neutral-800/40" : "dark:bg-transparent" } hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer`}>
          {row.map((cell: string, colIndex: number) => {
                    return (
                      <td className="whitespace-nowrap overflow-hidden" data-rowindex={rowIndex} data-colindex={colIndex} key={`${colIndex}`}>
                          <div
                            className="flex items-center px-2 py-1"
                            onClick={() => {handleClick(cell[0], category)}}
                          >
                          {cell[1]}
                          </div>
                       
                      </td>
                  )
          }
          )} 
      </tr>
  )
})

    return (
        <>
            <div className="flex justify-between p-2">
                <SearchComponent 
                placeholder={"Søk bruker..."}
                columnFilters={[]}
                setColumnFilters={() => {}}
                 />
                <Link 
                href={buttonLink}
                >
                <Button>{buttonTitle}</Button>
                </Link>
            </div>
            <div className="flex-grow dark:bg-neutral-900 overflow-scroll border rounded-sm py-2 mx-2 shadow-md">
                {data.length > 0 && 
                <table className="text-xs w-full">
                    <thead>
                        <tr key={"Titles"} className="bg-neutral-100 dark:bg-transparent font-semibold h-8">
                            {titles}
                        </tr>
                    </thead>
                    <tbody>
                     {rowsNew}
                    </tbody>
                </table>
                 
                }
            </div>
            <div className="p-2">
            <Pagination /> 
            </div>   
            </>

    );
}



export default DashboardTable;
"use client"

import {CellContext, Column, ColumnDef, RowData, VisibilityRow, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table"
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import EditableCell from "./editableCell";
import EditableCompetancyCell from "./editableCompentacyCell";
import CheckboxCell from "./checboxCell";
import SelectCell from "./selectCell";
import DatePickerCell from "./datePickerCell";
import Search from "../ui/search";
import { TableNewRow } from "./addField";
import  _ from "lodash"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const COMPETENCE = [
    {
        header: "Norsk",
        key: "norwegian",
        min: 60
    },
    {
        header: "Matte",
        key: "mathematics",
        min: 60
    },
    {
        header: "Engelsk",
        key: "english",
        min: 60,
    },
    {
        header: "Naturfag",
        key: "science",
        min: 30,
    },
    {
        header: "Samfunnsfag",
        key: "socialStudies",
        min: 30,
    },
    {
        header: "Kunst og håndverk",
        key: "artsAndCrafts",
        min: 30,
    },
    {
        header: "Kroppsøving",
        key: "pe",
        min: 30,
    },
    {
        header: "Spansk",
        key: "spanish",
        min: 30,
    },
]

const EMPLOYEES = [
    {
        firstName: "Svenn Åge",
        lastName: "Sletner",
        gender: "male",
        dateOfBirth: new Date("1989-03-05"),
        position: {
            function: "Rektor",
            permanent: true
        },
        education: {
            english: 60,
            mathematics: 60,
            spanish: 30,
            other: "Skoleledelse (60)"
        }
    },
    {
        firstName: "Elias",
        lastName: "Sletner",
        gender: "male",
        dateOfBirth: new Date("2013-06-06"),
        position: {
            function: "Lærer",
            permanent: true
        },
        education: {
            norwegian: 30,
            english: 60,
            mathematics: 30,
            spanish: 30,
            other: "Skoleledelse (60)"
        }
    },
    {}
] as Employee[]

const positionFunctions = [
    {id: 1, name: "Lærer", color: "fffff"},
    {id: 2, name: "Rektor", color: "fffff"},
    {id: 3, name: "Ass.rektor", color: "f4ff"},
]

const columns: ColumnDef<Employee>[]= [
    {
        accessorFn: (row: Employee) => row?.position?.function,
        id: "position.function",
        header: "Funksjon",
        cell: (props: any) => <SelectCell {...props} options={positionFunctions} placeholder="Velg..." />,
        size: 100,
    },
    {
        accessorFn: (row: Employee) => row?.position?.permanent,
        id: "position.permanent",
        header: "F",
        cell: CheckboxCell,
        size: 5,
        enableResizing: false
    },
    {
        accessorFn: (row: Employee) => `${row?.firstName || ""}`,
        id: "firstName",
        header: "Fornavn",
        cell: EditableCell,
        size: 100,
        enableResizing: true
    },
    {
        accessorFn: (row: Employee) => `${row?.lastName || ""}`,
        id: "lastName",
        header: "Etternavn",
        cell: EditableCell,
        size: 100,
    },
    {
        accessorFn: (row: Employee) => row?.dateOfBirth,
        id: "date",
        header: "Fødselsdato",
        cell: DatePickerCell,
        size: 100,
    },

]

const createCompetenceColumns = () => {
    COMPETENCE.map(subject => 
        columns.push(
            {
                accessorFn: (row: Employee) => row.education && row.education[subject.key] || "0",
                id: subject.key,
                header: subject.header.slice(0,2).toUpperCase(),
                cell: (e) => EditableCompetancyCell({...e, subject}),
                size: 40,
                minSize: 35,
                maxSize: 40,
                footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + parseInt(row.getValue(`${subject.key}`)), 0),
            }
        )
    )

}

createCompetenceColumns()

function EmployeesTable() {
    const [data, setData] = useState<Employee[]>(EMPLOYEES)
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        enableHiding: true,
        meta: {
            updateData: (rowIndex: number, columnId: string, value: String) => 
            { 
                setData(
                prev => prev.map(
                    (row, index) => {
                        if (index === rowIndex) {
                            const nested = columnId.split(".")
                            if (nested.length > 1) {
                                   // Update the nested property 
                                    const updatedRow = { ...prev[rowIndex]};
                                    let currentObj: any = updatedRow;
                                    for (let i = 0; i < nested.length - 1; i++) {
                                        if (!currentObj[nested[i]]) {
                                            currentObj[nested[i]] = {};
                                        }
                                        currentObj = currentObj[nested[i]];
                                    }
                                    currentObj[nested[nested.length - 1]] = value;
                            
                                    return updatedRow;
                            } else {
                                return {
                                    ...prev[rowIndex],
                                    [columnId]: value,
                                    }
                            }
                        } else {
                            return row
                        }
                    }
                ),
            )}
        }
    })


    


    return (
        <>
        <div className="m-3  flex justify-between">
            <Search placeholder="Filter..." classNames={`w-[200px]`} columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
            <TableNewRow setData={setData}/>
        </div>

        <div className="flex flex-col m-3">
        <Table className={`border-[0px] rounded-lg dark:border-neutral-700 border-neutral-200 select-none`}>
            <TableHeader>
            {table.getHeaderGroups().map(headerGroup => 
            <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map(header => 
                <TableHead className={twMerge(`relative h-7 text-center px-1 text-sm border dark:border-neutral-700 border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:text-white`)} style={{width: header.getSize()}} key={header.id}>
                    {header.column.columnDef.header?.toString()}
                    {header.column.columnDef.enableResizing &&
                    <div
                        className={
                            twMerge(
                            `absolute w-[3px] h-full hover:bg-slate-700 top-0 right-[-2px] cursor-col-resize`
                            , header.column.getIsResizing() && ` bg-slate100`)
                        }
                        onMouseDown={
                            header.getResizeHandler()
                        }
                        onTouchStart={
                            header.getResizeHandler()
                        }
                    ></div>}
                </TableHead>
                )}

            </TableRow>)}
            </TableHeader>
            <TableBody className="">
            {
                table.getRowModel().rows.map(row => 
                <TableRow className="text-sm" key={row.id}>
                    {row.getVisibleCells().map(cell =>
                    <TableCell className={`h-7 p-0`} style={{width: cell.column.getSize(), minWidth: cell.column.columnDef.minSize, maxWidth: cell.column.columnDef.maxSize}} key={cell.id}> 
                    {
                        flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )
                    }

                    </TableCell>
                        )}
                    
                </TableRow>)
            }
            {table.getFooterGroups().map(footerGroup =>
                <TableRow className="h-2 text-neutral-500 bg-neutral-100 dark:bg-neutral-800" key={footerGroup.id}>
                    {footerGroup.headers.map(footer => 
                             <TableCell className="h-2 p-0 text-center" key={footer.id}>{flexRender(footer.column.columnDef.footer, footer.getContext())}</TableCell>
                        )}
                    

                </TableRow>
                    
                )}
            
            </TableBody>
        </Table>
        </div>
    
        </>
    );
}

export default EmployeesTable;

function EditableCompentacyCell(arg0: { cell: import("@tanstack/react-table").Cell<Employee, unknown>; column: Column<Employee, unknown>; getValue: import("@tanstack/react-table").Getter<unknown>; renderValue: import("@tanstack/react-table").Getter<unknown>; row: import("@tanstack/react-table").Row<Employee>; table: import("@tanstack/react-table").Table<Employee>; subject: { header: string; key: string; min: number; }; }): any {
    throw new Error("Function not implemented.");
}

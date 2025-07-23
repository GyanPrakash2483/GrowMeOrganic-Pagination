import { useEffect, useRef, useState } from "react"
import { DataTable, type DataTableSelectionMultipleChangeEvent, type DataTableValueArray } from "primereact/datatable"
import { Column } from "primereact/column"

import 'primereact/resources/themes/md-dark-indigo/theme.css'
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator"
import Loading from "./Loading"

import './HeaderStyle.css'
import { ChevronDown } from "lucide-react"
import { OverlayPanel } from "primereact/overlaypanel"
import { InputNumber, type InputNumberChangeEvent } from "primereact/inputnumber"
import { Button } from "primereact/button"

import api from '../api.ts'

interface TableRow {
    title?: string,
    place_of_origin?: string
    artist_display?: string,
    inscriptions?: string,
    date_start?: number,
    date_end?: number
}

export default function MainTable() {

    const [isLoaded, setIsLoaded] = useState(false)

    const [tableData, setTableData] = useState<DataTableValueArray>([])

    const [first, setFirst] = useState(0)
    const [numPages, setNumPages] = useState(10770)
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        setIsLoaded(false)
        api.getArtwork(currPage)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.data)
                setNumPages(data.pagination.total_pages)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [currPage])

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        console.log('Page Change')
        setFirst(event.first)
        setCurrPage(event.page + 1)
    }

    const [selections, setSelections] = useState<TableRow[]>([])

    const handleSelectionChange = (event: DataTableSelectionMultipleChangeEvent<DataTableValueArray>) => {
        console.log(event.value)
        setSelections(event.value)
    }

    const overlay = useRef<OverlayPanel>(null)

    const [numSelection, setNumSelection] = useState<number | null>(null)

    const selectRows = async () => {
        // console.log(numSelection)
        
        const newSelections = [...selections]
        for(let i = 0; i < Math.min(12, Number(numSelection)); i++) {
            newSelections.push(tableData[i])
        }

        if(Number(numSelection) > 12 && currPage < 10770) {
            await extraSelectionSubroutine(Number(numSelection) - 12, currPage + 1, newSelections)
        }

        setSelections(newSelections)
    }

    const extraSelectionSubroutine = async (numRemaining: number, targetPage: number, selectionList: TableRow[]) => {
        api.getArtwork(targetPage)
            .then((response) => response.json())
            .then(async (data) => {
                for(let i = 0; i < Math.min(12, numRemaining); i++) {
                    selectionList.push(data.data[i])
                }
                
                if(numRemaining > 12 && targetPage < 10770) {
                    await extraSelectionSubroutine(numRemaining - 12, targetPage + 1, selectionList)
                }
            })
    }

    return (
        <div className="p-2">
            {
                isLoaded
                ?
                <DataTable value={tableData} showGridlines selectionMode="multiple" selection={selections} onSelectionChange={handleSelectionChange} >
                    <Column selectionMode="multiple" header={
                        <>
                            <ChevronDown className="m-1 cursor-pointer" onClick={(event) => overlay.current?.toggle(event)} />
                            <OverlayPanel ref={overlay} appendTo={"self"}>
                                <div className="flex flex-col items-start gap-2">
                                    <InputNumber placeholder="Select Rows..." value={numSelection} onChange={(e: InputNumberChangeEvent) => setNumSelection(Number(e.value))} />
                                    <Button className="text-sm" onClick={selectRows}> <span className="text-[#e2e2e2]">Submit</span> </Button>
                                </div>
                            </OverlayPanel>
                        </>
                    } align="center" />
                    <Column field="title" header="Title" align="center" />
                    <Column field="place_of_origin" header="Place of Origin" align="center" />
                    <Column field="artist_display" header="Artist Display" align="center" />
                    <Column field="inscriptions" header="Inscriptions" align="center" /> 
                    <Column field="date_start" header="Start Date" align="center" />
                    <Column field="date_end" header="End Date" align="center" />
                </DataTable>
                :
                <Loading />
            }
            
            <Paginator first={first} rows={12} totalRecords={numPages * 12} onPageChange={onPageChange} />
        </div>
    )
}
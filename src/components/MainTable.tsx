import { useEffect, useState } from "react"
import { DataTable, type DataTableValueArray } from "primereact/datatable"
import { Column } from "primereact/column"

import 'primereact/resources/themes/md-dark-indigo/theme.css'
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator"

export default function MainTable() {

    const [tableData, setTableData] = useState<DataTableValueArray>([])

    const [first, setFirst] = useState(0)
    const [numPages, setNumPages] = useState(10770)
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        fetch(`https://api.artic.edu/api/v1/artworks?page=${currPage}`)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.data)
                setNumPages(data.pagination.total_pages)
            })
    }, [currPage])

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        console.log('Page Change')
        setFirst(event.first)
        setCurrPage(event.page + 1)
    }

    return (
        <div className="p-2">
            <DataTable value={tableData} showGridlines>
                <Column field="title" header="Title" align="center" />
                <Column field="place_of_origin" header="Place of Origin" align="center" />
                <Column field="artist_display" header="Artist Display" align="center" />
                <Column field="inscriptions" header="Inscriptions" align="center" /> 
                <Column field="date_start" header="Start Date" align="center" />
                <Column field="date_end" header="End Date" align="center" />
            </DataTable>
            <Paginator first={first} rows={12} totalRecords={numPages * 12} onPageChange={onPageChange} />
        </div>
    )
}
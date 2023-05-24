import React from 'react'
import { Pagination } from '@mui/material'

export default function paginate({page,setPage}){
    return <>
    <Pagination
        count={6}
        page={page}
        onClick={setPage()}
    />
    </>
}

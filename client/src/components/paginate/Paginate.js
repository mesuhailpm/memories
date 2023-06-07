import React from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import {Link} from 'react-router-dom'

export default function paginate({page,setPage,totalPagesCount}){
    return(
    <Pagination
        count={totalPagesCount} //should be dynamical
        page={Number(page)} // otherwise go to page 11 once clicked  on next page
        renderItem={(item)=>(
            <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
            onClick={()=>setPage(item.page)}
              />
        )}
    />
    )
}

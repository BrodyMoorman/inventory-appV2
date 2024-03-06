import { HStack, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export default function Paginator(props) {
    const pageNumbers = []
    
    for (let i = 1; i <= props.totalPages; i++) {
        if(i === props.page) {
            pageNumbers.push({number:i, active:true})
            continue
        }
        pageNumbers.push({number:i, active:false})
    }
    const setPage = (page) => {
        props.setPage(page)
    }
    const nextPage = () => {
        if (props.page < props.totalPages) {
            props.setPage(props.page + 1)
        }
    }
    const prevPage = () => {
        if (props.page > 1) {
            props.setPage(props.page - 1)
        }
    }

  return (
    <HStack>
        <Button onClick={prevPage}><ChevronLeftIcon/></Button>
        {pageNumbers.map((page) => {
            if(page.active) {
                return (
                    <Button key={page.number} onClick={()=>setPage(page.number)} colorScheme="blue">{page.number}</Button>
                )
            }
            if (page.number === 1) {
                return (
                    <Button onClick={()=>setPage(page.number)} key={page.number}>{page.number}</Button>
                )
            }
            if (page.number === props.totalPages) {
                return (
                    <Button onClick={()=>setPage(page.number)} key={page.number}>{page.number}</Button>
                )
            }
            if( page.number == props.page - 2) {
                return (
                    <Button key={page.number}>...</Button>
                )
            }
            if( page.number == props.page + 2) {
                return (
                    <Button key={page.number}>...</Button>
                )
            }
            if (page.number < props.page - 2 || page.number > props.page + 2) {
                return
            }
            else {
                return (
                    <Button key={page.number} onClick={()=>setPage(page.number)}>{page.number}</Button>
                )
            }
        })}
        <Button onClick={nextPage}><ChevronRightIcon/></Button>
    </HStack>
  )
}

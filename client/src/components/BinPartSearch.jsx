import { VStack, Input, HStack, Button, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import axios from 'axios'
import React from 'react'
import Paginator from './Paginator'

export default function BinPartSearch(props) {
    const toast = useToast()
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    const [resultsPerPage, setResultsPerPage] = useState(5)
    const { isLoading, error, data, refetch } = useQuery(['parts'], () =>
    makeRequest.get('/parts/search/searchlength', { params: { search: search,} }).then((res) =>{
      setTotalResults(res.data.count)
      setTotalPages(Math.ceil(res.data.count / resultsPerPage))
      let offset = (page - 1) * resultsPerPage
      let limit = resultsPerPage
      return makeRequest.get('/parts/', { params: { search: search, offset: offset, limit: limit } }).then((res) => {
        return res.data
      })
    })
  )

    
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleAssignPart= (part) => {
        if(part == selected) {
            setSelected(null)
            return
        }
        setSelected(part)
        
    }
    useEffect(() => {
        refetch()
    }, [search, page])
    const handleSubmit = () => {
        if(!selected) return
        let values = {
            partID: selected.idparts,
            binID: props.binId
        }
        makeRequest.post('/parts/assign', values, {withCredentials:true} ).then((res) => {
            if(res.status === 200) {
                toast({
                    title: "Part Assigned",
                    description: "Part has been assigned to bin",
                    position: "top",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                props.handleUpdate()
            }
        })
    }



    if (isLoading) return 'Loading...'
    if (error) console.log(error)
  return (
    <VStack >
        <Input onChange={handleChange} placeholder='Search'></Input>
        <VStack w={"full"} maxH={"400px"} overflowY={"auto"}>
        {data.map((part) => {
            return(
                
                <HStack key={part.idparts} border={part==selected && "2px solid black"} bg={part == selected ? "blue.400" : "white" } onClick={()=>handleAssignPart(part)} cursor={"pointer"} borderRadius={"md"} px={2} h={"40px"} w={"full"} justifyContent={"space-between"} color={part == selected && "white"} fontWeight={part==selected &&"semibold"} _hover={part==selected?{bg: "blue.300"} : {bg: "gray.200"}}>
                    <p>{part.partname}</p>
                    <p>{part.idparts}</p>
                </HStack>
            )
        }
        )}
        </VStack>
        <Paginator page={page} setPage={setPage} totalPages={totalPages} />
        <Button onClick={handleSubmit} isDisabled={!selected} colorScheme={"blue"} w={"full"}>Assign Part</Button>
    </VStack>

  )
}

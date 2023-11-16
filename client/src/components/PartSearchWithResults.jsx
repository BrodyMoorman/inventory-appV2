import React from 'react'

import { Box, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'

import { makeRequest } from '../axios'

import { useQuery } from 'react-query'

import { useState, useEffect } from 'react'

import PartSearchResultItem from './PartSearchResultItem'


export default function PartSearchWithResults(props) {
    const [searchInFocus, setSearchInFocus] = React.useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    
    
    const handleSearchChange =  (e) => {
        setSearchQuery(e.target.value)
        if(searchQuery.length > 0) {
         fetchSearchResults()
        }
    }

    const fetchSearchResults = async () => {
        const response = await makeRequest.get(`/parts/search/${searchQuery}`)
        setSearchResults(response.data)
    }

    useEffect(() => {
        if(searchQuery.length > 0) {
            fetchSearchResults()
        }
    }
    , [searchQuery])
    

    const callback = (part) => {
        props.parentCallback(part)
        setSearchQuery('')
        setSearchResults([])
    }


  return (
    <Box>
        <Text fontWeight="semibold">Parts</Text>
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.500' />
            </InputLeftElement>
            <Input placeholder='Search' value={searchQuery} onChange={handleSearchChange} />
        </InputGroup>
        {searchQuery.length > 0 && searchResults.length > 0 &&
        <Box w={"full"} maxH={"36"} shadow={"md"} overflowX={"auto"} mt={"1"} border={"1px"} borderColor={"#C1c1c2"} borderRadius={"lg"} >
            
            {searchResults.map((part, index) => {
                return (
                    <PartSearchResultItem partname={part.partname} partid={part.idparts} key={index} callback={callback} />
                )
            })}
        </Box>
        }

    </Box>
  )
}

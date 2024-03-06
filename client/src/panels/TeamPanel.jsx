import { HStack, VStack, Text, Input } from '@chakra-ui/react'
import TeamList from '../components/TeamList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'


import React from 'react'

export default function TeamPanel() {
    const [search, setSearch] = useState('')
    const [team, setTeam] = useState([])
    const { isLoading, error, data } = useQuery(['team'], () => makeRequest.get('/users/team').then((res) => {
        console.log(res.data)
        setTeam(res.data)
        return res.data
    }
    ))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)

    const handleChange = (e) => {
        setTeam(data.filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase())))

    }
  return (
    <HStack w={"full"} h={"full"} bg={"gray.100"} justifyContent={"center"}>
    <VStack w={"60%"} bg={"white"} borderRadius={"2xl"}>
        <Text fontSize={"4xl"} fontWeight={"semibold"}>Team</Text>
        <HStack w={"full"} justifyContent={'center'}>
        <Input placeholder='Search' onChange={handleChange} maxW={'400px'} m={2} minH={'35px'}  />
        </HStack>
        <TeamList team={team} />
        
    </VStack>
    </HStack>
  )
}

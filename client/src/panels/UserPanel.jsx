import React from 'react'
import { VStack } from '@chakra-ui/react'

import { useQuery } from 'react-query'
import { makeRequest } from '../axios'

export default function UserPanel(props) {
    const { isLoading, error, data } = useQuery('user', () =>
    makeRequest.get(`/users/find/${props.userid}`).then((res) => {
        console.log(res.data)
        return res.data
    }))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
  return (
    <VStack bg={'white'} w={"80%"} h={"700px"} borderRadius={"xl"} boxShadow={"xl"}>
        <VStack>
            <h1>User Panel</h1>
            <h2>{data.name}</h2> 
            
        </VStack>
      UserPanel
    </VStack>
  )
}

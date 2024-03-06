import React from 'react'
import { VStack, Avatar, HStack, Text, Flex } from '@chakra-ui/react'

import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import { useParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import RecentTransactionList from '../components/RecentTransactionList'

export default function UserPanel(props) {
    const { userid } = useParams()
    const { isLoading, error, data } = useQuery('user', () =>
    makeRequest.get(`/users/profile/${userid}`).then((res) => {
      res.data.recent_transactions = JSON.parse(res.data.recent_transactions)
      res.data.user_jobs = JSON.parse(res.data.user_jobs)
        console.log(res.data)
        return res.data
    }))
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
  return (
    <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
    <VStack bg={'white'} w={"80%"}  borderRadius={"xl"} boxShadow={"xl"}>
        <VStack w={'full'}>
          <HStack w={"full"} p={2}  justifyContent={"center"} >
            <VStack justifyContent={"center"} alignItems={"center"}>
            <Avatar size="2xl" src={data.profilepic} name={data.name} showBorder borderWidth={"4px"} borderColor={"gray.400"} />
            <Text  textAlign={"center"} fontSize={"2xl"} fontWeight={"semibold"}>{data.name}</Text>
            {data.permissionlevel === 3 && <Text mt={-4} textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>Admin</Text>}
            {data.permissionlevel === 2 && <Text mt={-4} textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>Member</Text>}
            {data.permissionlevel === 1 && <Text mt={-4} textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>Unverified</Text>}
            </VStack>

            
          </HStack>
          <VStack w={"full"} p={2} >
            <HStack w={"full"} pl={4}>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>User Jobs</Text>
            </HStack>
          
          <HStack w={"90%"} spacing="2" px={2} overflow="auto" pb="4"
      __css={{
        '&::-webkit-scrollbar': {
          width: '2px',
          height: '4px',
          
        },
        '&::-webkit-scrollbar-track': {
          width: '2px',
          height: '2px',
          bg: 'gray.100'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#4A5568',
          borderRadius: '12px',
          bg: 'blue.400'
        },
      }}
      >
      {data.user_jobs.map((job) => {
        if (job.idjobs !== null) return <JobCard key={job.idjobs} job={job} />
        else return <Text w={"full"} textAlign={"center"}>No jobs found</Text>
        
})}
      
       </HStack>
       </VStack> 
       <VStack w={"full"} p={2} >
            <HStack w={"full"} pl={4}>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>Recent Transactions</Text>
            </HStack>
          
          <RecentTransactionList data={data.recent_transactions} />
       </VStack> 
        </VStack>

    </VStack>
    </Flex>
  )
}

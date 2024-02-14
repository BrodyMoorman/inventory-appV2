import React from 'react'
import { useParams } from 'react-router-dom'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { Box } from '@chakra-ui/react'
import UserPanel from '../panels/UserPanel'

export default function User() {
    const { userid } = useParams()
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<UserPanel userid={userid}/>} />
    </Box>  
  )
}

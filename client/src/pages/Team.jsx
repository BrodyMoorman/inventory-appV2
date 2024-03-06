import React from 'react'
import TeamPanel from '../panels/TeamPanel'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { Box } from '@chakra-ui/react'

export default function Team() {
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<TeamPanel/>} />
    </Box>  
  )
}

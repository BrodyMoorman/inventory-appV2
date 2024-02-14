import React from 'react'
import { Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import RoomPanel from '../panels/RoomPanel'

export default function Room() {
  return (
    <Box w='100vw'>
    <SidebarWithHeader content={<RoomPanel/>} />
  </Box>
  )
}

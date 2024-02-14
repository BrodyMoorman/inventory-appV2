import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import RoomDesignerPanel from '../panels/RoomDesignerPanel'
import { Box } from '@chakra-ui/react'

export default function RoomDesignerPage() {
  return (
    <Box w='100vw'>
    <SidebarWithHeader content={<RoomDesignerPanel/>} />
  </Box>
  )
}

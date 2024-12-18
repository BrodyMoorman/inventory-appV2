import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { Box } from '@chakra-ui/react'
import RequestsPanel from '../panels/RequestsPanel'

export default function Requests() {
  return (
    <Box w='100vw'>
      <SidebarWithHeader content={<RequestsPanel />} />
    </Box>
  )
}

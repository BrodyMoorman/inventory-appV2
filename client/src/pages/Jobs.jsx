import React from 'react'
import { Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import JobsPanel from '../panels/JobsPanel'

export default function Jobs() {
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<JobsPanel/>} />
    </Box>
  )
}

import React from 'react'
import { Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { useParams } from 'react-router-dom'
import JobPanel from '../panels/JobPanel'

export default function Job() {
    const { jobid } = useParams()
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<JobPanel jobid={jobid}/>} />
    </Box>
  )
}

import React from 'react'
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import SidebarWithHeader from '../components/SidebarWithHeader'
import NewJobPanel from '../panels/NewJobPanel'

export default function NewJob() {
    const { templateid } = useParams()
  return (
    <Box w='100vw'>
    <SidebarWithHeader content={<NewJobPanel templateid={templateid} />} />
    </Box>
  )
}

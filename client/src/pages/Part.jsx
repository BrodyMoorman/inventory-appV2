import React from 'react'
import { useParams } from 'react-router-dom'
import SidebarWithHeader from '../components/SidebarWithHeader'
import PartPanel from '../panels/PartPanel'
import { Box } from '@chakra-ui/react'

export default function Part() {
    const { partid } = useParams()
  return (
    <Box w='100vw'>
        <SidebarWithHeader content={<PartPanel id={partid} />} />
    </Box>
  )
}

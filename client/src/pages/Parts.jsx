import React from 'react'
import { Flex, Input, Heading, Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import PartsPanel from '../panels/PartsPanel'

export default function Parts() {
  return (
    <Box w='100vw'>
      <SidebarWithHeader content={<PartsPanel />} />
    </Box>
  )
}

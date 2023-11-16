import { Box } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import SettingsPanel from '../panels/SettingsPanel'
import React from 'react'

export default function Settings() {
  return (
    <Box w='100vw'>
    <SidebarWithHeader content={<SettingsPanel />} />
  </Box>
  )
}

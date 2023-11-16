import { Box, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import React from 'react'
import SelectJobCreationType from './SelectJobCreationType'
import NewJobInputForm from './NewJobInputForm'
import { useState } from 'react'

export default function NewJobForm() {
    const [template, setTemplate] = useState(null)
    const callback = (template) => {
        setTemplate(template)
    }
    const handleBack = () => {
        setTemplate(null)
    }
  return (
    <Box>
        {template === null ?
        <SelectJobCreationType callback={callback} /> :
        <Box>
        <Button leftIcon={<ArrowBackIcon />} size={"md"}  colorScheme='black' variant='outline' onClick={handleBack}>Back</Button>
            <NewJobInputForm template={template } />
        </Box>
        }
      
    </Box>
  )
}

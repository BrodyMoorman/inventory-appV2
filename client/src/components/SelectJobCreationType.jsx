import { Flex, Box, Icon, VStack, Text, Divider, Select, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import {LuLayoutTemplate} from 'react-icons/lu'
import {PiNoteBlankLight} from 'react-icons/pi'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import React from 'react'

export default function SelectJobCreationType(props) {

    const [active, setActive] = useState(0)
    const [template, setTemplate] = useState(null)

    const handleBack = () => {
        setActive(0)
        setTemplate(0)
    }

    const { isLoading, error, data } = useQuery(['templates'], () =>
    makeRequest.get('/templates').then((res) => {
        return res.data
        })
    )
    if (isLoading) return 'Loading...'
    if (error) console.log(error)
    
    const handleTemplateSelect = (e) => {
        if(e.target.value === '') {
            setTemplate(0)
        }
        setTemplate(data[e.target.value])
    }
    const handleContinue = () => {
        props.callback(template)
    }

    


  return (
    <VStack>
            {active === 0 ?
            <Flex gap={5}>
                <VStack onClick={()=>setActive(1)}  border={"dashed"} p={"3"} rounded={"xl" } cursor={'pointer'} borderWidth={"2px"} borderColor={"#C1c1c2"} color={"#C1c1c2"} _hover={{color:"#4096CC", borderColor:"#4096CC", border:"solid ",borderWidth:"2px"}} >
                    <Box>
                        <Icon as={LuLayoutTemplate} fontSize={"7xl"} />
                    </Box>
                    <Divider />
                    <Box>
                        <Text fontWeight={"semibold"} textAlign={"center"} color={"#393939"}>Create Job From Template</Text>
                    </Box>
                </VStack>
                <VStack  onClick={()=>{props.callback({idtemplates:-1})}}   border={"dashed"} borderColor={"#C1c1c2"} cursor={'pointer'} borderWidth={"2px"} p={"3"} rounded={"xl"} color={"#C1c1c2"} _hover={{color:"#4096CC", borderColor:"#4096CC", border:"solid ",borderWidth:"2px"}}  >
                    <Box>
                        <Icon as={PiNoteBlankLight} fontSize={"7xl"}  />
                    </Box>
                    <Divider />
                    <Box>
                        <Text fontWeight={"semibold"} textAlign={"center"} color={"#393939"}>Create Job From Scratch</Text>
                    </Box>
                </VStack>
            </Flex>:
            <VStack w={"full"}>
            <Flex w={"full"}pb={3}><Button leftIcon={<ArrowBackIcon />} size={"md"}  colorScheme='black' variant='outline' onClick={handleBack}>Back</Button></Flex>
            <Select placeholder='Select Template' onChange={handleTemplateSelect}>
                {data.map((template, index) => {
                    return (
                        <option key={index} value={index}>{template.transaction_name}</option>
                    )
                })}
            </Select>
            {template !== 0 && <Button w={"100%"} colorScheme='blue' onClick={handleContinue}>Continue</Button> }
            </VStack>
            
            }
            

       
    </VStack>
  )
}

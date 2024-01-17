import React from 'react'
import { Flex, Text, HStack, VStack, PopoverTrigger, Popover, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverFooter,
   PopoverCloseButton, NumberInput, NumberInputField, Button, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PartListItemForJob(props) {
  const { jobid } = useParams()
  const auth = useAuthUser()
  const maxVal = props.part.numNeeded - props.part.numUsed
  const [testValue, setTestValue] = useState(0)
  const handleChange = (e) => {
    setTestValue(e.target.value)
  }
  const handleClick = () => {
    setTestValue(maxVal)
  }
  const handleSubmit = () => {
    const values = {
      userId: auth().idusers,
      numCharged: testValue,
      partId: props.part.partID,
    }
    axios.post(`http://localhost:8800/api/jobs/partcharge/${jobid}`, values, {withCredentials: true})
    .then(res => {
      console.log(res)
      window.location.reload()
    })

  }

  return (
    <Popover placement='right'>
      <PopoverTrigger>
        <Flex w={"full"} borderBottom={"1px"}  borderColor={'gray.300'} h={"40px"}  
        justifyContent={"space-between"} alignItems={"center"} fontWeight={"semibold"} cursor={"pointer"} _hover={{bg:"gray.200"}}>
          <Flex w={"200px"} justifyContent={"center"} ><Text fontSize={"md"}>{props.part.partName}</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.part.partLocation}</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.part.partStock}</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.part.numNeeded}</Text></Flex>
          <Flex w={"200px"} justifyContent={"center"}><Text fontSize={"md"}>{props.part.numUsed}</Text></Flex>
        </Flex>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      
      <PopoverHeader><Text fontWeight={"semibold"}>{props.part.partName}</Text></PopoverHeader>
      <PopoverBody>
        Withdraw from stock:
        <HStack>
        <NumberInput value={testValue} max={maxVal} maxW={20}    >
          <NumberInputField onChange={handleChange}  />
        </NumberInput>
        <Button onClick={handleClick}>All</Button>
        </HStack>
        <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Button colorScheme={"blue"} my={2} isDisabled={((testValue>maxVal) || (testValue<=0) || (testValue==null))} onClick={handleSubmit}>Submit</Button>
        <Divider />
        <Button variant={"outline"}>Part Page</Button>
        </VStack>
        
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
}
import React from 'react'
import { useState } from 'react'

import { Flex, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

export default function QuickAction(props) {
    const [changeValue, setChangeValue] = useState(1)
  return (
    <Flex justifyContent={"center"} alignItems={""}  gap={"4px"} flexDir={"column"}>
      <h3>Manipulate Stock:</h3>
      <Flex justifyContent={"center"} alignItems={"center"} gap={"4px"} >
        <Button colorScheme='red'>Remove</Button>
        <NumberInput size='md' maxW={24} defaultValue={1} min={1}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        <Button colorScheme='whatsapp' w={'100px'}>Add</Button>
    </Flex>
    </Flex>
  )
}

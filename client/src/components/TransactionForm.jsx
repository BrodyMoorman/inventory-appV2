import React from 'react'
import { Box, HStack, FormControl, FormLabel, Input, Select, Button, Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Radio,
    RadioGroup,
    Stack,
    } from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuthUser } from 'react-auth-kit'



export default function TransactionForm(props) {
    const [values, setValues] = useState({
        partid: props.id,
        transactorid: 0,
        transactionType: '',
        transactionAmount: 0,
        addOrRemove: 'add',
        assemblyId: -1,
        purchaseOrder: null,
    
      })
      
      const [showAssembly, setShowAssembly] = useState(true)
      const [canUpload, setCanUpload] = useState(false)
      const handleChange = (e) => {
          if(e.target.name === 'purchaseOrder'){
                setValues(prev=>({...prev, [e.target.name]: e.target.files[0]}))
                return
                
            }else {
                setValues(prev=>({...prev, [e.target.name]: e.target.value}))
                if(e.target.name === 'transactionType'){
                    if(e.target.value === 'Assembly'){
                          setShowAssembly(false)
                    }  else {
                          setShowAssembly(true)
                    }
                
                }
                if(e.target.name === 'transactionType' && (e.target.value === 'Purchase' || e.target.value === 'Restock')){
                    setCanUpload(true)
                } else {
                    setCanUpload(false)
                }
            }
          

         
        }

  
        const handleSubmit = async (e) => {
          e.preventDefault()
          values.transactorid = auth().idusers
          if(!canUpload){
                values.purchaseOrder = null
          }
          if(showAssembly){
                values.assemblyId = -1
          }
          console.log(values)
        //   try{
        //     const res = await axios.post('http://localhost:8800/api/parts/new', values, {
        //       withCredentials: true,
        //     }) 
        //     console.log(res)
        //   } catch (err) {
        //     console.log(err)
        //   }
        }
        const auth = useAuthUser();
        
  return (
    <Box>
            
            
              
                <Text>Current Stock: {props.stock}</Text>
                <HStack alignItems="center">
                <Box w="50%">
                <FormControl isRequired>
                  <FormLabel>Transaction Amount</FormLabel>
                  <NumberInput name='transactionAmount' min={1} defaultValue={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                </Box>
                <Box w="50%">
                <RadioGroup defaultValue='add' name='addOrRemove'>
                <Stack spacing="0"  direction='column'>
                    <Radio colorScheme='red' value='remove' m="0">
                    Remove
                    </Radio>
                    <Radio colorScheme='green' value='add' m="0">
                    Add
                    </Radio>
                </Stack>
                </RadioGroup>
                </Box>
              

              </HStack>
            
            <HStack>
            <Box w="50%">
            <FormControl isRequired>
                <FormLabel>Transaction Type:</FormLabel>
                    <Select placeholder='Select option' name='transactionType' onChange={handleChange}>
                        <option value='Purchase'>Purchase</option>
                        <option value='Restock'>Restock</option>
                        <option value='Assembly'>Use In Assembly</option>
                    </Select>
                </FormControl>
            </Box>
            <Box w="50%">
            <FormControl isDisabled={showAssembly}>
                <FormLabel >Assembly</FormLabel>
                    <Select placeholder='Select option' name='assembly' onChange={handleChange}>
                        <option value='Bay 1'>Bay 1</option>
                        <option value='Bay 2'>Bay 2</option>
                        <option value='Bay 3'>Bay 3</option>
                    </Select>
            </FormControl>
            </Box>
            </HStack>
            <FormControl isDisabled={!canUpload} >
                <FormLabel>Purchase Order:</FormLabel>
                    
                    <Input
                    name='purchaseOrder'
                    type='file'
                    onChange={handleChange}
                    >
                    </Input>
            </FormControl>
           
            <HStack pt={"10px"}justifyContent={"flex-end"}>
            <Button colorScheme='blue' onClick={handleSubmit} >Create Part</Button>
            </HStack>
    </Box>
  )
}

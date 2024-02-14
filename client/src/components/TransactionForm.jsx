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

import JobSelect from './JobSelect'




export default function TransactionForm(props) {
   

    
    const [values, setValues] = useState({
        partid: parseInt(props.id),
        transactorid: 0,
        transactionType: '',
        transactionAmount: 0,
        add: true,
        jobid: null,
        purchaseOrder: null,
    
      })
      const auth = useAuthUser()
      
      
      const [showAssembly, setShowAssembly] = useState(false)
      const [canUpload, setCanUpload] = useState(false)
      const handleChange = (e) => {
          if(e.target.name === 'purchaseOrder'){
                setValues(prev=>({...prev, [e.target.name]: e.target.files[0]}))
                return
                
            }else {
                setValues(prev=>({...prev, [e.target.name]: e.target.value}))
                if(e.target.name === 'transactionType'){
                    if(e.target.value === 'Assembly'){
                          setShowAssembly(true)
                    }  else {
                          setShowAssembly(false)
                    }
                
                }
                if(e.target.name === 'transactionType' && (e.target.value === 'Purchase' || e.target.value === 'Restock')){
                    setCanUpload(true)
                } else {
                    setCanUpload(false)
                }
            }
          

         
        }
        const fileUpload = async (file) => {
            try{
                const formData = new FormData();
                formData.append('file', file)
                const res = await axios.post('http://localhost:8800/api/upload/', formData, {
                    withCredentials: true,
                })
                console.log(res)
                return res.data.filename
            } catch (err) {
                console.log(err)
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
try{
          if(values.purchaseOrder){
             const fileName =  await fileUpload(values.purchaseOrder)
                values.purchaseOrder = fileName
          }
        }
          catch(err){
                console.log("Error uploading file")
                return
            }
            console.log(values)
            try {
                const res = await axios.post('http://localhost:8800/api/transactions/', values, {
                    withCredentials: true,
                })
                console.log(res)
            }
            catch(err){
                console.log(err)
            }
            window.location.reload()
        }
        const handleAddorRemove = (e) => {
            if(e.target.name === 'add'){
                setValues(prev=>({...prev, add: true}))
            } else {
                setValues(prev=>({...prev, add: false}))
            }
        }
        
  return (
    <Box>
            
            
              
                <Text>Current Stock: {props.stock}</Text>
                <HStack alignItems="center">
                <Box w="50%">
                <FormControl isRequired>
                  <FormLabel>Transaction Amount</FormLabel>
                  <NumberInput  min={1} defaultValue={1}>
                    <NumberInputField name='transactionAmount' onChange={handleChange}  />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                </Box>
                <Box w="50%">
                
                <HStack spacing="2" mt={8}  direction='column'>
                    <Button colorScheme='green' name='add' variant={values.add ? "solid" : "outline"} onClick={handleAddorRemove}>Add</Button>
                    <Button colorScheme='red' name='remove' variant={!values.add ? "solid" : "outline"} onClick={handleAddorRemove}>Remove</Button>
                </HStack>
                
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
            <JobSelect isDisabled={!showAssembly} callback={(jobid) => setValues(prev=>({...prev, jobid: jobid}))} />
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

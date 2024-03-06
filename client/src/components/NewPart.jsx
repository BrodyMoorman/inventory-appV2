import { useState } from 'react'
import { Box, HStack, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react'
import axios from 'axios'

export default function NewPart() {
  const [values, setValues] = useState({
    partName: '',
    room: '',
    bay: '',
    startingStock: 0,
    cost: 0,
    mfgNo: '',
    restockLink: '',
    vendorName: '',
  })

  const handleChange = (e) => {
    setValues(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/parts/new`, values, {
        withCredentials: true,
      }) 
      console.log(res)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box>
        
              <Box>
                <FormControl isRequired>
                  <FormLabel>Part Name</FormLabel>
                  <Input type="text" name='partName' onChange={handleChange} />
                </FormControl>
              </Box>
            
            <HStack>
            </HStack>
            <HStack>
            <Box>
                <FormControl isRequired>
                  <FormLabel>Starting Stock:</FormLabel>
                  <Input defaultValue={0} type="Number" name='startingStock' onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Cost:</FormLabel>
                  <Input type="Number" name='cost' onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <Box>
                <FormControl >
                  <FormLabel>Vendor Name</FormLabel>
                  <Input type="text" name='vendorName' onChange={handleChange} />
                </FormControl>
              </Box>
            <HStack>
            <Box w="35%">
                <FormControl  >
                  <FormLabel>MFG. NO.</FormLabel>
                  <Input  type="text" name='mfgNo' onChange={handleChange} />
                </FormControl>
              </Box>
              <Box w="65%">
                <FormControl id="lastName" >
                  <FormLabel>Restock Link:</FormLabel>
                  <Input type="text" name='restockLink' onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <HStack pt={"10px"}justifyContent={"flex-end"}>
            <Button colorScheme='blue' onClick={handleSubmit} >Create Part</Button>
            </HStack>
    </Box>
  )
}

import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { Link as ReactRouterLink } from 'react-router-dom'

  import { useState, useEffect } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
  import  axios  from 'axios'
  import { useNavigate } from 'react-router-dom'
  import { useIsAuthenticated } from 'react-auth-kit'

export default function Register() {

    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated()
    const [showPassword, setShowPassword] = useState(false)
    const [err, setErr] = useState(null)
    const [inputs, setInputs] = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    })

    const handleChange = (e) => {
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, inputs)
        
      }
      catch (err) {
        console.log(err)
       setErr(err.response.data.message)
      }
      window.location.href = '/login'
    }
    useEffect(() => {
      if(isAuthenticated) {
        navigate('/parts')
      }
    }
    ,[])

  return (
     <Flex
      minH={'100vh'}
      w={'100vw'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={inputs.firstName} name="firstName" onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" value={inputs.lastName} name="lastName" onChange={handleChange}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={inputs.email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={inputs.password} name="password" onChange={handleChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {err && <Text color='red'>Error: {err}</Text>}
            <Stack spacing={10} pt={2}>
              
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} as={ReactRouterLink} to='/login' >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}


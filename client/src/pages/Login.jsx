
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSignIn, useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
  
export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [err, setErr] = useState(null)
  const signIn = useSignIn()
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated()


  


  const handleChange = (e) => {
    setValues(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, values, {
        withCredentials: true,
      })
      signIn({
        token: res.data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: res.data.user,
      });
      navigate('/parts')

     


    } catch (err) {
      console.log(err)
      setErr(err.response.data.message)
    }
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
          <Heading fontSize={'4xl'}>Sign In</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              {err && <Text color={'red'}>{err}</Text>}
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                >
                Sign in
              </Button>
              
              <Text align={'center'}>
                First time here? <Link color={'blue.400'} as={ReactRouterLink} to='/register' >Sign Up!</Link>
              </Text>
           
            </Stack>
            
          </Stack>
          
        </Box>
      </Stack>
    </Flex>

  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import './index.css'
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(

    <ChakraProvider theme={theme}>
      <AuthProvider
       authType={'cookie'}
        authName={'__auth__'}
        cookieDomain={window.location.hostname}
        cookieSecure = {window.location.protocol === 'https:'}
        > 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
,
)

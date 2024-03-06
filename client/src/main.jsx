import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <ChakraProvider>
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

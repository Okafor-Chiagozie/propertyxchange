import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react"
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"


createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain=''
        clientId=''
        authorizationParams={{
            redirect_uri: "http://localhost:5173"
        }}
        audience="http://localhost:3000"
        scope="openid profile email"
    >
        <MantineProvider>
            <App />
        </MantineProvider>
    </Auth0Provider>
)

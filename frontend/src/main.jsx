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
        domain='dev-7f1xt3q761kj5klp.us.auth0.com'
        clientId='m8hmZYHd0apVs8S5g86MC6XiElnuvd17'
        authorizationParams={{
            redirect_uri: window.location.origin,
            response_type: "token"
        }}
        // audience="http://localhost:3000"
        audience="https://propertyxchange-api-ten.vercel.app"
        
    >
        <MantineProvider>
            <App />
        </MantineProvider>
    </Auth0Provider>
)

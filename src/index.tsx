import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import StoreProvider from './utils/store'
// import reportWebVitals from "./reportWebVitals";

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </React.StrictMode>
)
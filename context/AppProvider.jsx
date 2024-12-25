import React from 'react'
import { MovieProvider } from './MovieContext'

export default function AppProvider({ children }) {
    return (
        <MovieProvider>
            { children }
        </MovieProvider>
    )
}

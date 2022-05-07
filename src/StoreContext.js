import React from 'react'
import { db } from './db'

// init context
const StoreContext = React.createContext()

const useStore = () => React.useContext(StoreContext)

export { StoreContext, useStore }



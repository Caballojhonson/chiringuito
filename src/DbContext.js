import React from 'react'

const DbContext = React.createContext()

const useDb = () => React.useContext(DbContext)

export { DbContext, useDb }



import React, { useState } from 'react'

const TestContext = React.createContext([{}, () => {}])

function TestContextProvider(props) {
    const [state, setstate] = useState({})

    return (
        <TestContext.Provider value={}>
            {props.children}
        </TestContext.Provider>
    )
}

export { TestContext, TestContextProvider }
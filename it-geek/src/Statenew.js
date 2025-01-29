import React, { useContext, useEffect, useState } from 'react'
import { userContext } from './App'

export default function Statenew() {

    const user = useContext(userContext);
    const [name, setName] = user;

    console.log("user :-", user)


    const [count, setcount] = useState(0)
    const [count1, setcount1] = useState(0)


    return (
        <div>
            <h1>Statenew component {name} </h1>
            <h1>Count1 : -  {count1} </h1>

            <button onClick={() => setName("Anurag")}>Click</button>
        </div>
    )
}

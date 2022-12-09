import {useState} from "react"

export default function AddBounty(props) {
    const initBounty = {
        region: props.region || "",
        name: props.name || "",
        isLiving: true,
        amount: props.amount || 500,
        type: props.type || ""

    }
    const [newBounty, setNewBounty] = useState(initBounty)
    function handleChange(event) {
        const {name, value} = event.target
        setNewBounty(prev => {
            return {
                ...prev, 
                [name]: value
            }
        })
        console.log(newBounty)
    }
    function handleSubmit(e){
        e.preventDefault()
        props.submit(newBounty, props._id)
        setNewBounty(initBounty)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input 
                name="name" 
                type="text" 
                placeholder="Name" 
                onChange={handleChange} 
                value={newBounty.name}
                required={true}>
            </input>
            <label htmlFor="region">Region: </label>
            <input 
                name="region" 
                type="text" 
                placeholder="Region" 
                onChange={handleChange} 
                value={newBounty.region}
                required={true}>
            </input>
            <label htmlFor="amount">Bounty: </label>
            <input 
                name="amount" 
                type="number" 
                placeholder="Bounty" 
                onChange={handleChange} 
                value={newBounty.amount}
                required={true}>
            </input>
            <label htmlFor="type">Type: </label>
            <input 
                name="type" 
                type="text" 
                placeholder="Type" 
                onChange={handleChange} 
                value={newBounty.type}
                required={true}>
            </input>
            <button>{props.btnText}</button>
        </form>
    )
}
import {useState} from "react"
import AddBounty from "./AddBounty"

export default function Bounty(props) {
    const {region, name, amount, type, _id} = props
    const [editing, setEditing] = useState(false)
    
    function submit(updates, bountyId) {
        props.updateBounty(updates, bountyId)
        setEditing(!editing)
    }
    return (
        <div className="bounty">
        <>
            <h1>{name}</h1>
            <p>Bounty = ${amount}.00</p>
            <p>{name} is a {type} pokemon from the {region} region.</p>
            <button onClick={() => props.deleteBounty(_id)}>Delete</button>
            {!editing ? 
            <button onClick={() => setEditing(!editing)}>Edit</button>
            :
            <>
            <AddBounty 
                region={region}
                name={name}
                amount={amount}
                type={type}
                _id={_id}
                btnText="Save"
                submit={submit}
                /> 
                <button onClick={() => setEditing(!editing)}>Quit</button>
            </>
            }
        </>            
        </div>
    )
}
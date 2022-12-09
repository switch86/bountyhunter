import {React, useEffect, useState} from "react"
import axios from "axios"
import Bounty from "./components/Bounty"
import AddBounty from "./components/AddBounty";
import './App.css';


function App() {
  const[bountyArray, setBountyArray] = useState([])
  
  function getBounty() {
    axios.get("/bounty")
      .then(res => setBountyArray(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getBounty()
  }, [])

  function addBounty(bountyObj) {
    console.log(bountyObj)
    axios.post("/bounty", bountyObj) 
      .then(res => {
        setBountyArray(prev => [...prev, res.data])
      })
      .catch(err => console.log(err))
  }
  function deleteBounty(bountyId) {
    axios.delete(`/bounty/${bountyId}`)
      .then(res => setBountyArray(prevArray => prevArray.filter(bounty => bounty._id !== bountyId)
      ))
      .catch(err => console.log(err))
  }
  function updateBounty(updates, bountyId) {
    console.log(updates)
    axios.put(`/bounty/${bountyId}`, updates)
      .then(res => setBountyArray(prevArray => prevArray.map(prev => prev._id !== bountyId ? prev : res.data)))
      .catch(err => console.log(err))
  }
  function handleFilter(e) {
    if (e.target.value === "reset") {
      getBounty()
    } else {
      axios.get(`/bounty/search/type?type=${e.target.value}`)
        .then(res => setBountyArray(res.data))
        .catch(err => console.log(err))

    }
  }
  const bountyHTML = bountyArray.map(bounty => {
    return (
      <Bounty 
        {...bounty} 
        key={bounty._id} 
        deleteBounty={deleteBounty}
        updateBounty={updateBounty}
        />
        )
      })
      return (
        <div className="App">
        <AddBounty 
          submit={addBounty}
          btnText="Add Bounty"
         />
         <h4>Filter by Type</h4>
         <select onChange={handleFilter} className="filterForm">
          <option value="reset"> - Select a Type</option>
          <option value="water">Water</option>
          <option value="fire">Fire</option>
          <option value="grass">Grass</option>
         </select>
      <div className="BountyTiles">
      {bountyHTML}
      </div>
    </div>
  );
}

export default App;

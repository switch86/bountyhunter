const {v4: uuidv4} = require('uuid')
const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('dev'))

const bounty = [
    {
        region: "US",
        name: "Bulbasaur",
        isLiving: true,
        amount: 2000,
        type: "grass", 
        _id: uuidv4()
    },
    {
        region: "Canada",
        name: "Charamander",
        isLiving: true,
        amount: 5000,
        type: "fire",
        _id: uuidv4()
    },
    {
        region: "USA",
        name: "houndour",
        isLiving: true,
        amount: 2000,
        type: "fire",
        _id: uuidv4()
    },
    {
        region: "Canada",
        name: "pikachu",
        isLiving: true,
        amount: 200,
        type: "electric",
        _id: uuidv4()
    }
]
//post one
app.post("/bounty", (req, res) => {
    let newBounty = req.body
    newBounty._id =  uuidv4()
    bounty.push(newBounty)
    res.send(newBounty)
})  

//get all
app.get("/bounty", (req, res) => {
    res.send(bounty)
})
// get one
app.get("/bounty/:bountyId", (req, res, next) => {
    const bountyId = req.params.bountyId
    const foundBounty = bounty.find(item => item._id === bountyId)
    if (!foundBounty) {
        const error = new Error(`Did not find an item with id ${bountyId}`)
        return next(error)
    }
    res.send(foundBounty)
})

//get by type
app.get("/bounty/search/type/", (req, res) => {
    const type = req.query.type
    const foundType = bounty.filter(item => item.type === type)
    res.send(foundType)
})

// find any bounty with values between min and max
app.get("/bounty/search/amount/", (req, res) => {
    const min = req.query.min
    const max = req.query.max
    const arr = bounty.filter(item => item.amount > min)
    const arr2 = arr.filter(item => item.amount < max)
    console.log(arr2)
    res.send(arr2)
})

app.delete("/bounty/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const bountyIndex = bounty.findIndex(item => item._id === bountyId)
    bounty.splice(bountyIndex, 1)
    res.send("successfully deleted bounty")
})

app.put("/bounty/:bountyId", (req,res) => {
    const bountyId = req.params.bountyId
    const bountyIndex = bounty.findIndex(item => item._id === bountyId)
    const updatedBounty = Object.assign(bounty[bountyIndex], req.body)
    res.send(updatedBounty)
})

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9001, () => {
    console.log("The server is running on port 9001")
})
const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const Bounty = require("./models/bounty")

app.use(express.json())
app.use(morgan('dev'))


// connect to Database
mongoose.connect('mongodb://localhost:27017/bountydb', 
     () => console.log('connected to database')
    )


//         region: "US",
//         name: "Bulbasaur",
//         isLiving: true,
//         amount: 2000,
//         type: "grass", 
//         _id: uuidv4()
//     },
//     {
//         region: "Canada",
//         name: "Charamander",
//         isLiving: true,
//         amount: 5000,
//         type: "fire",
//         _id: uuidv4()
//     },
//     {
//         region: "USA",
//         name: "houndour",
//         isLiving: true,
//         amount: 2000,
//         type: "fire",
//         _id: uuidv4()
//     },
//     {
//         region: "Canada",
//         name: "pikachu",
//         isLiving: true,
//         amount: 200,
//         type: "electric",
//         _id: uuidv4()
//     }
// ]
//post one
app.post('/bounty', (req, res, next) => {
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})  

//get all
app.get("/bounty", (req, res, next) => {
    Bounty.find((err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})
// // get one
// app.get("/bounty/:bountyId", (req, res, next) => {
//     const bountyId = req.params.bountyId
//     const foundBounty = bounty.find(item => item._id === bountyId)
//     if (!foundBounty) {
//         const error = new Error(`Did not find an item with id ${bountyId}`)
//         return next(error)
//     }
//     res.send(foundBounty)
// })

//get by type
app.get("/bounty/search/type/", (req, res) => {
    Bounty.find({type: req.query.type}, (err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

// // find any bounty with values between min and max
// app.get("/bounty/search/amount/", (req, res) => {
//     const min = req.query.min
//     const max = req.query.max
//     const arr = bounty.filter(item => item.amount > min)
//     const arr2 = arr.filter(item => item.amount < max)
//     console.log(arr2)
//     res.send(arr2)
// })

app.delete("/bounty/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({_id: req.params.bountyId}, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.name}`)
    })
})

app.put("/bounty/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        { _id: req.params.bountyId }, //find the one to update
        req.body, // incoming new data
        {new: true}, // request updated version
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedBounty)
        })
    })

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9001, () => {
    console.log("The server is running on port 9001")
})
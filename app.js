const axios = require("axios")
const fs = require("fs")
const express = require('express')
const app = express()

app.all('/', (req, res)=>{
  res.send("Pong!")
  console.log("Ping success")
})

app.listen(3000, ()=>{
  console.log("Now listening on port 3000")
})
const data = fs.readFileSync("members.json")
const parseddata = JSON.parse(data)

const workFunction = async() => {
  parseddata.forEach(async data => {
    await axios.request({
      method: "POST",
      url:  `https://discord.com/api/v8/channels/${data.workroom}/messages`,
      headers: {"Authorization": data.botToken },
      data: {content: "ub work"}
    }).then(success => {
      console.log(`Success for member ${data.membername}`)
    }).catch(err => {
      console.log(`Failed for member ${data.membername}`) 
    })
  })
}
const giveFunction = async() => {
  parseddata.forEach(async data => {
    await axios.request({
      method: "POST",
      url: `https://discord.com/api/v8/channels/${data.workroom}/messages`,
      headers: {"Authorization": data.botToken },
      data: {content: `ub give ${data.memberid} all`}
    }).then(success => {
      console.log(`Success give for member ${data.membername}`)
    }).catch(err => {
      console.log(`Failed give for member ${data.membername}`) 
    })
  })
}

setInterval(workFunction, 35000)
setInterval(workFunction, 3600000)


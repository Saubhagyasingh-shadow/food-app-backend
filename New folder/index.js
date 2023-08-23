const port = 3000
const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('working')
})

app.listen(port, ()=>{
    console.log(`app working at http://127.0.0.1:${port}`)
})

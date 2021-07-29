const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const Event = require('./routes/addevent');

app.use(express.json());
app.use(cors())
app.use(Event);

app.listen(PORT,()=>{
    console.log("server rining:",PORT)
})
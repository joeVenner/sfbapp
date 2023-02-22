const { default: axios } = require("axios");
const cors=require("cors");
const express = require('express');


const app = express();

//middleware

//it looks if the request has some body  and parse and attach it to the req object so we can access it
app.use(express.json());

//to enable cors
app.use(cors());

//routes
app.post('/api', async(req,res) => {
    try {
        const { apiUrl } =  req.body;
        
        const { data } = await axios.get(apiUrl, {
            headers: {
            'X-Requested-With': 'XMLHttpRequest'
            }
        })
        res.status(200).json(data.data.rows);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
});


app.listen(4000,()=>{
            
    console.log('connected to db & listening on port 4000 ');

});


// Export the Express API
module.exports = app;
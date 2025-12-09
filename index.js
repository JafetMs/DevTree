const express = require('express')

const app = express();

// Routing
app.get('/',(req,res)=>{
    res.send('ola')
})

app.get('/ecommerce',(req,res)=>{
    res.send('ecommerce')
})

app.listen(4000,()=>{
    console.log('Server funcionando');
});


const express = require ('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/films', require('./src/routes/films'));

app.listen(PORT, () =>{
    console.log('Serveur partie')
});
const express = require('express');

const app = express();
const PORT = 1234;

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Hola a todos!')
})

app.post('/uses', (req, res)=> {
    res.status(201).send(`<h1>Enviado!</h1>`)
})

app.use((req, res) => {
    res.status(404).send(`<h1>Error 404 - innacesible path ${req.url}</h1>`)
})

app.listen(PORT, () => {
    console.log(`App funcionando en http://localhost:${PORT}`);
})

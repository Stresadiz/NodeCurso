const express = require('express')
const movies = require('./movies.json');
const crypto = require('node:crypto');
const cors = require('cors');

const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express();
const PORT = process.env.PORT ?? 1234;
app.use(cors({
    origin: 'http://localhost:8080', // Allow specific origin [10]
    methods: 'GET,POST,DELETE,PUT'
}));

//No todas las api's son rest (existe soap)

/*
REST
Arquitectura de software -> Comunicaciones en redes

- Resources -> Cada resource se identifica con una url
- verbos HTTP -> Definen operaciones con los recursos
- Representaciones -> Los recursos se pueden representar en diferentes formatos (polimorfismo)
- Stateless -> El server no debe mantener ningun estado sobre el cliente entre solicitudes
- Interfaz uniforme -> La interfaz debe ser consistente para todas las interacciones
- Separacion de conceptos -> Cliente y servidor evolucionan de forma separada
*/
app.use(express.json());

app.disable('x-powered-by');

//EndPoints
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

    const {genre} = req.query

    if (genre) {
        const filteredMovies = movies.filter( movie => 
            movie.genre.some(g => 
                g.toLowerCase() === genre.toLowerCase()
            )
        )
        
        if (filteredMovies) {
            return res.json(filteredMovies)
        } else {
            res.status(404).json({message: 'Movies not found by that filter'})
        }
    } else{
        res.json(movies)
    }
})

app.get('/movies/:id', (req, res) => { //path-to-regexp
    const { id } = req.params

    const movie = movies.find(movie => movie.id === id)

    if (movie) {
        return res.json(movie)
    } else {
        res.status(404).json({message: 'Movie not found'})
    }
    
})

app.post('/movies', (req, res) => {
    
    const parsed = validateMovie(req.body)

    if (!parsed.success) {
        return null
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...parsed.data,
        rate: parsed.data.rate ?? 5
    };

    if (!newMovie) {
            res.status(400).json({message: 'Movie cannot be created'})
    }
    //Esto no es rest porque guarda estado en memoria
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {

    const parsed = validatePartialMovie(req.body)

    if (!parsed.success) {
        return res.status(400).json({message: 'Error'})
    }

    const {id} = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(400).json({message: 'Error'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...parsed.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

    const {id} = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(400).json({message: 'Error'})
    }

    movies.splice(movies[movieIndex], 1)
    
    return res.status(204).json(movies)

})

app.listen(PORT, () =>{
    console.log(`App escuchando en http://localhost:${PORT}`);
})

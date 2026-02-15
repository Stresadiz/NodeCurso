const z = require('zod');
const genreTypes = ["Crime", "Drama", "Adventure", "Action", "Sci-Fi"];


const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number(),
    poster: z.url(),
    genre: z.array(z.enum(genreTypes)),
    rate: z.number().min(0).max(10).optional()
});

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object)
}

function validateMovie(object) {

    return movieSchema.safeParse(object);
}   

module.exports = {validateMovie, validatePartialMovie}
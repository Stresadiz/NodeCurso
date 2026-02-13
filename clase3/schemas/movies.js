const z = require('zod');
const genreTypes = ["Crime", "Drama", "Adventure", "Action", "Sci-Fi"];

function createNewMovie(req) {

    const movieSchema = z.object({
        title: z.string(),
        year: z.number().int().min(1900).max(2026),
        director: z.string(),
        duration: z.number(),
        poster: z.url(),
        genre: z.array(z.enum(genreTypes)),
        rate: z.number().min(0).max(10).optional()
    });

    const parsed = movieSchema.safeParse(req.body);

    if (!parsed.success) {
        return null
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...parsed.data,
        rate: parsed.data.rate ?? 5
    };

    return newMovie;
}   

module.exports = {createNewMovie}
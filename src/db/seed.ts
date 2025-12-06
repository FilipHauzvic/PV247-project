import { db } from '../index';
import { quizzes, guessedMovies } from './schema';
import { user } from '../../auth-schema';
import { randomUUID } from 'crypto';

async function seed() {
    console.log('Seeding database with quiz');
    const existingUsers = await db.select().from(user).limit(1);
    let userId: string;

    if (existingUsers.length > 0) {
        userId = existingUsers[0].id;
        console.log(`Using existing user with id ${userId}`);
    } else {
        userId = randomUUID();
        const insertedUser = await db.insert(user).values({
            id: userId,
            name: "Sus",
            email: 'seeduser@example.com',
            emailVerified: false,
            image: null,
        }).returning();

        userId = insertedUser[0].id;
        console.log(`Created user with id ${userId}`);
    }

    const quizNamesss: string[] = ["Amogus", "Amomogus", "Abominatiogus", "Am", "Us", "Momogus", "Mogu", "Long name to destroy my UI! Super :) sadasdasdasdasdasdasdasdadsad",
                                    "Sus", "My imagination ran out", "Just put the fries in the bag", "What is the meaning of life?", "Oh my god", "Leerooooooooy Jeeeeenkiiiins",
                                    "Movie emoji guesser is epic, or is it?", "42", "Why am I wasting time with creating different quiz names?", "Action movies", "Fantasy movies", 
                                    "Romantic movies", "Best of anime", "Seeding quiz", "Musicals", "Quentin Tarantino", "My favorites", "Disney", "Marvel", "Documentary movies", 
                                    "Old cartoons", "Why does there have to be so many movies", "Quiz name 1"];

    for (let i = 0; i < 31; i++) {
        const insertedQuiz = await db.insert(quizzes).values({
            quizName: quizNamesss[i],
            createdBy: userId,
        }).returning();

        const quizId = insertedQuiz[0].id;
        console.log(`Created quiz with id ${quizId}`);

        const movies = [
            { movieName: 'The Lion King', emojis: ['🦁', '👑', '🌅', '🎵', '🐗'], orderInQuiz: 0 },
            { movieName: 'Titanic', emojis: ['🚢', '❤️', '🧊', '💎', '🌊'], orderInQuiz: 1 },
            { movieName: 'Finding Nemo', emojis: ['🐠', '🔍', '🌊', '🦈', '🐢'], orderInQuiz: 2 },
            { movieName: 'The Matrix', emojis: ['💊', '🕶️', '💻', '🔫', '🤖'], orderInQuiz: 3 },
        ];

        for (const m of movies) {
            await db.insert(guessedMovies).values({
                movieName: m.movieName,
                emojis: JSON.stringify(m.emojis),
                orderInQuiz: m.orderInQuiz,
                quizId,
            });
            console.log(`Inserted movie: ${m.movieName}`);
        }
    }

    console.log('Seeding complete!');
}

seed().catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
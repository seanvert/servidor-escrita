var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const faker = require('faker');
const Author = require('./models/author');
const Exercise = require('./models/exercises');
const Quote = require('./models/quote');
const Text = require('./models/texts');
const User = require('./models/users');
const Work = require('./models/work');
const DefaultExercises = require('./consts/exercisesDescriptions');
function createAuthor() {
    return __awaiter(this, void 0, void 0, function* () {
        const newAuthor = {
            name: faker.name.findName(),
            wikipediaLink: faker.internet.url(),
            portrait: faker.image.image(),
        };
        const author = yield Author.create(newAuthor, (err, next : () => void) => {
            if (!err) {
                return author;
            }
            console.log(err);
        });
    });
}
// TODO: Definir os dados que vao entrar de cada exercício
// colocar os enunciados num vetor
function createExercise(name, user, index) {
    const newExercise = {
        name,
        contents: faker.lorem.paragraphs(),
        type: index,
        creator: user._id,
        defaultConfigs: {
            time: 10,
        },
    };
    const exercise = Exercise.create(newExercise, (err, next : () => void) => {
        if (!err) {
            return exercise;
        }
        console.log(err);
    });
}
// “Writing is a form of therapy; sometimes I wonder how all those who do not write, compose, or paint can manage to escape the madness, melancholia, the panic and fear which is inherent in a human situation.”
// ― Graham Greene, Ways of Escape
function createQuote(author, work) {
    const newQuote = {
        quote: faker.lorem.paragraph(),
        source: {
            author,
            work,
        },
    };
    const quote = Quote.create(newQuote, (err, next : () => void) => {
        if (!err) {
            return quote;
        }
        console.log(err);
    });
}
function createTexts(user : IUser) {
    const newText = {
        name: faker.lorem.word(),
        contents: faker.lorem.paragraph(),
        owner: user._id,
    };
    const text = Text.create(newText, (err, next : () => void) => {
        if (!err) {
            return text;
        }
        console.log(err);
    });
}
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            texts: [],
            configs: [],
        };
        const user = yield User.create(newUser, (err, next : () => void) => {
            if (!err) {
                return user;
            }
            console.log(err);
        });
    });
}
function createWork() {
    return __awaiter(this, void 0, void 0, function* () {
        const newWork = {
            name: faker.lorem.words(),
            bookstoreLink: faker.internet.url(),
        };
        const work = yield Work.create(newWork, (err, next : () => void) => {
            if (!err) {
                return work;
            }
            console.log(err);
        });
    });
}
const quotes = [
/*	"And by the way, everything in life is writable about if you have the outgoing guts to do it, and the imagination to improvise. The worst enemy to creativity is self-doubt." - Sylvia Plath¹
"Words can be like X-rays if you use them properly—they’ll go through anything. You read and you’re pierced." - Aldous Huxley
"You should write because you love the shape of stories and sentences and the creation of different words on a page." - Annie Proulx²
"Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind." - Virginia Woolf³
*/
];
const ExerciseNames = [
    'Escrita Automática',
    'Associação Livre',
    'Fluxo Verbal',
    'Criação de textos a partir de palavras geradoras',
    'Criação de textos a partir de suas palavras',
    'Criação a partir das palavras do outro',
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
];
function populateDb() {
    for (let n_users = 0; n_users < 10; n_users++) {
        // create user
        const user = createUser();
        // create texts
        for (let i = 0; i < 100; i++) {
            createTexts(user)
        }
        // create exercises
        createExercise(ExerciseNames[n_users], user, n_users);
    }
    for (let n_authors = 0; n_authors < 100; n_authors++) {
        // create author
        const author = createAuthor();
        for (let n_works = 0; n_works < 5; n_works++) {
            // create work
            const work = createWork();
            for (let n_quotes = 0; n_quotes < 10; n_quotes++) {
                // create quotes
                createQuote(author, work);
            }
        }
    }
}
export default populateDb;
module.exports = populateDb;

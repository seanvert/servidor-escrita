const faker = require('faker');
const Author = require('./models/author');
const Exercise = require('./models/exercises');
const Quote = require('./models/quote');
const Text = require('./models/texts');
const User = require('./models/users');
const Work = require('./models/work');

async function createAuthor() {
	const newAuthor = {
		name: faker.name.findName(),
		wikipediaLink: faker.internet.url(),
		portrait: faker.image.image()
	};
	
	const author = await Author.create(newAuthor, function(err, next) {
		if (!err) {
			return author;
		} else {
			console.log(err);
		}
	});
}

function createExercise(user) {
	const newExercise = {
		name: faker.lorem.sentence(),
		contents: faker.lorem.paragraphs(),
		creator: user,
		defaultConfigs: {
			time: 10
		}
	};

	const exercise = Exercise.create(newExercise, function(err, next) {
		if (!err) {
			return exercise;
		} else {
			console.log(err);
		}
	});
};

function createQuote(author, work) {
	const newQuote = {
		quote: faker.lorem.paragraph(),
		source: {
			author,
			work
		}
	};

	const quote = Quote.create(newQuote, function(err, next) {
		if(!err) {
			return quote;
		} else {
			console.log(err);
		}
	});
};

function createTexts(user) {
	const newText = {
		name: faker.lorem.word(),
		contents: faker.lorem.paragraph(),
		owner: user._id
	};
	const text = Text.create(newText, function(err, next) {
		if (!err) {
			return text;
		} else {
			console.log(err);
		}
	});
};

async function createUser() {
	var newUser = {
		name: faker.name.firstName(),
		last_name: faker.name.lastName(),
		email: faker.internet.email(),
		texts: [],
		configs: [],
	};
	
	const user = await User.create(newUser, function(err, next) {
		if (!err) {
			return user;
		} else {
			console.log(err);
		}
	});
}

async function createWork() {
	const newWork = {
		name: faker.lorem.words(),
		bookstoreLink: faker.internet.url()
	};

	const work = await Work.create(newWork, function(err, next) {
		if (!err) {
			return work;
		} else {
			console.log(err);
		}
	});
}

function populateDb() {
	for (var n_users = 0; n_users < 10; n_users++) {
		// create user
		const user = createUser();
		// create texts
		for (var i = 0; i < 100; i++) {
			createTexts(user);
		}
		// create exercises
		createExercise();
	};

	for (var n_authors = 0; n_authors < 100; n_authors++) {
		// create author
		const author = createAuthor();
		for (var n_works = 0; n_works < 5; n_works++) {
			// create work
			const work = createWork();
			for (var n_quotes = 0; n_quotes < 10; n_quotes++) {
				// create quotes
				createQuote(author, work);
			};
		};
	};
};

module.exports = populateDb;

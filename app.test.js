const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

const DB_URL = 'mongodb://escritaApp:teste@localhost:27017/escrita';

beforeAll(done => {
	mongoose.connect(DB_URL, options);
	done()
});


// TODO: ver como rodar estes testes
describe("testa a raiz", () => {
	test("método GET", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});

describe("testa a raiz dos users", () => {
	test("método GET", async () => {
		const response = await request(app).get("/users");
		expect(response.statusCode).toBe(200);
	});

	// TODO: criar um usuário
	// TODO: apagar um usuário
	// TODO: ler um usuário
	// TODO: editar um usuário
});

describe("testa a raiz dos texts", () => {
	test("método GET", async () => {
		const response = await request(app).get("/texts");
		expect(response.statusCode).toBe(200);
	});

	// TODO: criar um texto
	// TODO: ler um texto
	// TODO: apagar um texto
	// TODO: editar um texto
});

describe("Testa as rotas de autenticação", () => {
	test("método POST em signup", async () => {
		const response = await request(app)
			  .post("/signup")
			  .send({
				  name: "Teste",
				  last_name: "Do teste",
				  email: "teste@jest.com",
				  username: "testesjest",
				  password: "testesjest"
			  });
		expect(response.statusCode).toBe(200);
	});

	// TODO: criar um usuário
	// TODO: apagar um usuário
	// TODO: ler um usuário
	// TODO: editar um usuário
});

afterAll(done => {
	mongoose.connection.close();
	done();
});

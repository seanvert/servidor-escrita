const app = require('./app');

const port = 8000;
app.listen(port, () => {
	console.log(`Escrita app listening on port ${port}`)
});

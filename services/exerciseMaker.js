// TODO: definir a especificação do objeto exercício que vou retornar
// precisa de um enunciado

function associacaoLivre () {
	return "associacao livre"
}

function fluxoVerbal () {
	return "fluxo Verbal"
}

function palavrasGeradoras () {
	return "Palavras geradoras"
}

function suasPalavras () {
	return "suas palavras"
}

function palavrasDoOoutro () {
	return "palavras do outro"
}

function exerciseMaker (exercise) {
	// gets an exercise object
	// returns an exercise description
	switch (exercise.name) {
	case 'Escrita Automática':
		return {
			description: ""
		}
	case 'Associação Livre':
		return {
			description: "" + associacaoLivre
		}
	case 'Fluxo Verbal':
		return {
			description: "" + fluxoVerbal
		}
	case 'Criação de textos a partir de palavras geradoras':
		return {
			description: "" + palavrasGeradoras
		}
	case 'Criação de textos a partir de suas palavras':
		return {
			description: "" + suasPalavras
		}
	case 'Criação a partir das palavras do outro':
		return {
			description: "" + palavrasDoOoutro
		}
	default:
		return({
			description: "vou colocar alguma coisa auqi",
		});

	}
	
}

module.exports = exerciseMaker;

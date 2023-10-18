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
			description: `A escrita automática é uma das mais fortes experiências de liberação,
			 mexendo praticamente com todas as estruturas da nossa linguagem. Muitos bloqueios 
			 que impedem a nossa escrita livre e criadora, o nosso escrever solto e espontâneo,
			  são quebrados de cada vez. Este exercício, que também foi um dos métodos da psicanálise
			   para a investigação do inconsciente, é muito simples, exatamente como Breton o caracteriza:
			    pegar uma folha de papel e ir escrevendo livremente, de um modo solto e despreocupado, para
				 tudo que vier à cabeça sem parar de ler, sem parar para raciocinar, sem analisar, escrever 
				 livremente, do modo mais solto possível, deixando o pensamento e a linguagem e as mãos e o 
				 corpo completamente à vontade... Assim, a mão deve ir escrevendo cada vez mais rapidamente, 
				 mais rapidamente, até acompanhar o ritmo do pensamento, sem nenhuma censura – o que vier à 
				 cabeça irá para o papel. Se parecer algum bloqueio, alguma censura, deve ir também para o 
				 papel (por exemplo: “e agora?” “estou bloqueado!”, “o que faço?”, “acabou a inspiração!”, 
					“quero parar!” etc.). Leve a experiência até o fim (se for preciso, enfrente o medo). 
					Depois faça o que você quiser: ler, rasgar, guardar. Como você se sentir melhor. 
					O importante para nós é o processo da escrita sem censura de nenhum tipo.`
		}
	case 'Associação Livre':
		return {
			description: "" + associacaoLivre()
		}
	case 'Fluxo Verbal':
		return {
			description: "" + fluxoVerbal()
		}
	case 'Criação de textos a partir de palavras geradoras':
		return {
			description: "" + palavrasGeradoras()
		}
	case 'Criação de textos a partir de suas palavras':
		return {
			description: "" + suasPalavras()
		}
	case 'Criação a partir das palavras do outro':
		return {
			description: "" + palavrasDoOoutro()
		}
	default:
		return({
			description: "vou colocar alguma coisa aqui" + exercise.name,
		});

	}
	
}

module.exports = exerciseMaker;

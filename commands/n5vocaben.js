const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('n5vocaben')
		.setDescription('Take an N5 vocab quiz, reply in english'),
	async execute(interaction) {
		const quiz = require('./assets/json/n5vocab.json');

		const item = quiz[Math.floor(Math.random() * quiz.length)];
		const checkCorrect = response => {
			return (item.english.toLowerCase() === response.content.toLowerCase())
		};

		interaction.reply(item.japanese, { fetchReply: true })
			.then(() => {
				interaction.channel.awaitMessages({ checkCorrect, max: 1, time: 30000, errors: ['time'] })
					.then(collected => {
						interaction.followUp(`${collected.first().author}は正しいです！`);
					})
					.catch(collected => {
						interaction.followUp('誰も答えを知らない');
					});
			});
    }
};
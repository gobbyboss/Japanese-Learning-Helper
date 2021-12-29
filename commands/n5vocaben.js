const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('n5vocaben')
		.setDescription('Take an N5 vocab quiz, reply in english'),
	async execute(interaction) {
			const startUp = response => {
				return response.content.includes('start')
			}
			
			interaction.reply("N5 Vocab quiz questions. Answer in English, use **!answer** to reveal the answer and **!exit** to quit. To start, reply **start**.", { fetchReply: true })
				.then(() => {
					interaction.channel.awaitMessages({ startUp, max: 1, idle: 30000, errors: ['time'] })
						.then(collected => {
							const quiz = require('./assets/json/n5vocab.json');
							let item = quiz[Math.floor(Math.random() * quiz.length)];
							let answer = item.english.toLowerCase();
							const filter = m => {
								if (m.content.includes('!exit')){
									interaction.followUp('Exiting now!');
									author = m.author;
									return;
								}
								if(m.content.includes('!answer')){
									interaction.followUp(`The answer is **${item.english}**`)
									item = quiz[Math.floor(Math.random() * quiz.length)];
									answer = item.english.toLowerCase();
									interaction.followUp(item.japanese);
								}
								return m.content.toLowerCase() === answer;
							}
							const collector = interaction.channel.createMessageCollector({ filter });

							interaction.followUp(item.japanese);

							collector.on('collect', m=> {
								interaction.followUp(`Correct! The answer is **${item.english}**`);
								item = quiz[Math.floor(Math.random() * quiz.length)];
								answer = item.english.toLowerCase();
								interaction.followUp(item.japanese);
							});
						})
						.catch(collected => {
							interaction.followUp('Going to sleep now');
						});
			});
	}
}

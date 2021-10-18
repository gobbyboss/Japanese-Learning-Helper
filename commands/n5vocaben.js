const { SlashCommandBuilder } = require('@discordjs/builders');
var finished = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('n5vocaben')
		.setDescription('Take an N5 vocab quiz, reply in english'),
	async execute(interaction) {

        var start = Date.now();
        var end = start + 120000;
        var run = setInterval(function() {
            if (Date.now() >= end) {
                clearInterval(run);
                channel.send("Stopping quiz...");
            }
            if (finished) {
                finished = false;
                ShowJapaneseVocab(interaction);
            }
        }, 1000);

		
    }
};

function ShowJapaneseVocab(input) {
    const quiz = require('./assets/json/n5vocab.json');

    const item = quiz[Math.floor(Math.random() * quiz.length)];

    const checkCorrect = response => {
        return (item.english === response.content.toLowerCase())
    };

    input.reply(item.japanese, { fetchReply: true })
			.then(() => {
				input.channel.awaitMessages({ checkCorrect, max: 1, time: 30000, errors: ['time'] })
					.then(collected => {
						input.followUp(`${collected.first().author}は正しいです！`);
                        finished = true;
					})
					.catch(collected => {
						input.followUp('誰も答えを知らない');
                        finished = true;
					});
			});
}
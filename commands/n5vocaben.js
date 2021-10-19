const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('n5vocaben')
		.setDescription('Take an N5 vocab quiz, reply in english')
        .addIntegerOption(option => option.setName('int').setDescription('Enter number of words to be tested on')),
	async execute(interaction) {

        // const numWords = interaction.options.getInteger('int');
        // interaction.reply(`Setting up quiz with ${numWords} words...`);

        const quiz = require('./assets/json/n5vocab.json');
        var finished = true;
        var stop = false;
		var item = quiz[Math.floor(Math.random() * quiz.length)];

        interaction.channel.createWebhook('Kazuma Bot', {
            avatar: 'https://i.redd.it/awn9f9o54mr51.jpg',
        })
            .then(webhook => console.log(`Created webhook ${webhook}`))
            .catch(console.error);

        const checkCorrect = response => {
            if (response.content.toLowerCase === "stop") {
                stop = true;
            }
            return (item.english.toLowerCase() === response.content.toLowerCase())
        };
        
        const webhooks = await interaction.channel.fetchWebhooks();
        const webhook = webhooks.first();
        while (!stop) {
            await webhook.send({
                content: item.japanese,
            }).then(() => {
                interaction.channel.awaitMessages({ checkCorrect, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        webhook.send({
                            content: '正しいです!'
                        });
                    })
                    .catch(collected => {
                        webhook.send({
                            content: 'Right answer not found.'
                        });
                    });
            });
            item = quiz[Math.floor(Math.random() * quiz.length)];
        }

        // var start = Date.now();
        // var end = start + 120000;
        // var finished = true;
        // const checkFinished = () => {
        //     if (Date.now() > end) {
        //         clearInterval(timer);
        //     }
        //     else if (finished) {
        //         finished = false;
        //         interaction.reply(item.japanese, { fetchReply: true })
        //         .then(() => {
        //             interaction.channel.awaitMessages({ checkCorrect, max: 1, time: 30000, errors: ['time'] })
        //                 .then(collected => {
        //                     interaction.followUp(`${collected.first().author}は正しいです！`);
        //                     finished = true;
        //                 })
        //                 .catch(collected => {
        //                     interaction.followUp('誰も答えを知らない');
        //                     finished = true;
        //                 });
        //         });
        //     }
        // };
        // let timer = setInterval(checkFinished, 1000);
        
		
    }
};
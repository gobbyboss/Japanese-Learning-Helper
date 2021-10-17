const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = require("./token.json");
client.login(token.token);

client.on('ready', () => console.log('The Bot is ready!'));

client.on('message', message => {
 
    if (message.content === 'Hello'){
        message.react('👑');
        message.channel.send('Hi');
    }
})
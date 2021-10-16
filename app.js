const Discord = require('discord.js');
const client = new Discord.Client();

const token = require("./token.json");
client.login(token.token);

client.on('ready', () => console.log('The Bot is ready!'));

client.on('message', message => {
 
    if (message.content === 'Hello'){
        message.react('👑');
        message.channel.send('Hi');
    }
})
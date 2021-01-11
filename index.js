const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log(`[Logging] Logged in as ${client.user.tag}!`);
});

client.on('debug', (debug) => {
  console.debug(debug);
});

client.on('message', message => {
  if (message.content === 'b!save') {
    message.reply('processing your request, please wait...');
    message.channel.messages.fetch({ limit: 100 }).then(messages => {
      fetch('https://hastebin.com/documents', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(messages, null , 2)
      }).then(response => response.json()).then(key => message.reply(`here is your backup: https://hastebin.com/${key.key}`)).catch(error => message.reply('something went wrong while connecting to hastebin. But don\'t worry, it is a hastebin problem, not our :wink:'));
    });
  }
  // Save all
  if (message.content === 'b!saveall') {
    message.reply('processing your request, please wait...');
    message.guild.channels.cache.forEach(channel => {
      message.channel.messages.fetch({ limit: 100 }).then(messages => {
      fetch('https://hastebin.com/documents', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(messages, null , 2)
      }).then(response => response.json()).then(key => message.reply(`here is your backup: https://hastebin.com/${key.key}`)).catch(error => message.reply('something went wrong while connecting to hastebin. But don\'t worry, it is a hastebin problem, not our :wink:'));
    });
    });
  }
});

client.login(process.env.token);

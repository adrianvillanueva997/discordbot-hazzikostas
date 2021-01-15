const Discord = require('discord.js');
const client = new Discord.client();
require('dotenv').config()

client.once('ready', () => {
    console.log("Logged in discord")
})

client.login(process.env.discord_hazzikostas_key)
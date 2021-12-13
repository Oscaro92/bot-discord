const dotenv = require("dotenv").config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {} = require('./function');
const prefix = "!";

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id != "919926282005909534") return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    let author = message.author.username;

    console.log(author);

    if (command === "command") {
        message.reply("**Liste des commandes :** \n\n" +
            "!command : Liste les commandes du bot\n" +
            "!");
    } else {
        message.reply("Tu sais lire batard !!! \nTape !command")
    }
    //message.reply().id("883011422924181585");
    //client.channels.cache.get("895615969819521034").send("Ferme ta Gueule ! ")
});

client.login(process.env.BOT_TOKEN);
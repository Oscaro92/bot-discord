const dotenv = require("dotenv").config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {isEmpty} = require('./function');
const prefix = "!";

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id != "919926282005909534") return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "command") {
        message.reply("**Liste des commandes :** \n\n" +
            "!command : Liste les tâches que junior peut réaliser\n" +
            "!insta : Junior te donne le lien de son instagram\n" +
            "!isolator-random @username : Junior insulte une personne de ton choix");
    } else if (command === "insta") {
        message.reply("Follow me : https://www.instagram.com/les_aventures_de_junior/")
    } else if (command === "isolator-random") {
        const userToIsolator = args[0];
        const isolator = ['Ferme ta gueule !', "Bouffe mon foutre !", "Catapulte tes morts !", "Nique ta race !", "Fils de pute !", "Connard !", "Nique ta mère !", "Va te faire enculer !", "Va te faire foutre !"];
        const isolatorRandom = isolator[Math.floor(Math.random() * isolator.length)];

        message.reply(userToIsolator+" "+isolatorRandom);
    }else{
        message.reply("Tu sais lire batard !!! \n\nTape !command")
    }
    //message.reply().id("883011422924181585");
    //client.channels.cache.get("895615969819521034").send("Ferme ta Gueule ! ")
});

client.login(process.env.BOT_TOKEN);
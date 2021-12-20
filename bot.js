const dotenv = require("dotenv").config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "!";

require("./function")()

client.on("message", function(message) { //fonction de base
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
});

client.on("message", function (message){ //
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id != "922563395968974898") return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "command") {
        message.reply("**Liste des commandes :** \n\n" +
            "!findSerie : Junior te trouve une liste de série ou une série au hasard\n" +
            "!findMovie : Junior te trouve une liste de film ou un film au hasard");
    } else if (command === "add") {

        //message.send('')

/*        message.reply('Test en cours ...');

        message.channel.awaitMessages(m => m.author.id === message.author.id,
            { max: 1, time: 60000 }).then(collected => {
                console.log(collected);

        }).catch(() => {
            message.reply('Pas de réponse commande annulée !');
        });*/

        generatorMovSer("Drama", "movie", true, function (rtr){
            console.log(rtr)
        });
    } else if (command === "list") {
        console.log(message)
    } else {
        message.reply("Tu sais lire batard !!! \n\nTape !command")
    }
});

client.login(process.env.BOT_TOKEN);
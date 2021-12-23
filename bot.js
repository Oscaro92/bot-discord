const dotenv = require("dotenv").config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const prefix = "!";
const prefixBis = "#";

require("./functionHall")()

/****************************Salon Junior**********************************/
client.on("message", function (message) {
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

        message.reply(userToIsolator + " " + isolatorRandom);
    } else {
        message.reply("Tu sais lire batard !!! \n\nTape !command")
    }
});


/****************************Salon Hall**********************************/
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id != "919986309102174250") return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "command") {
        message.reply("**Liste des commandes :** \n\n" +
            "!list-genre : Junior te liste tout les genres de film/série possible\n" +
            "!random-watch : Junior te trouve un film ou une série aléatoirement sous sa patte\n" +
            "!next-movies : Junior te donne les prochaines sorties de film");
    } else if (command === "list-genre") {
        listGenre(function (rtr) {
            message.reply("La liste des genres : \n\n" + rtr);
        })
    } else if (command === "random-watch") {
        message.reply("Tape #movie pour avoir un film et tape #serie bah pour avoir une série.");

        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 30000})
            .then(collected => {
                let res1 = "";
                collected.map(collect => {
                    res1 = collect;
                });
                const commandBody = res1.content.slice(prefixBis.length);
                const args = commandBody.split(' ');
                const command = args.shift().toLowerCase();
                const type = removeChara(command, " ", "", 20);

                message.reply("Quel genre de " + type + " veux-tu ?\n" +
                    "Répond au format : #Genre");

                message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 30000})
                    .then(collected => {
                        let res2 = "";
                        collected.map(collect => {
                            res2 = collect;
                        });
                        if (res2.content.startsWith(prefixBis)) {
                            const commandBody = res2.content.slice(prefixBis.length);
                            const args = commandBody.split(' ');
                            const command = args.shift();
                            const genre = removeChara(command, " ", "", 20);

                            checkGenre(genre, function (rtr) {
                                if (rtr) {
                                    if (type === "movie") {
                                        randomMovSer(genre, "movie", function (rtr) {
                                            message.reply("Le contenu aléatoire trouvé est : \n" +
                                                "Titre : " + rtr.randomTitle + "\n" +
                                                "Info : " + rtr.info);
                                        });
                                    } else if (type === "serie") {
                                        randomMovSer(genre, "series", function (rtr) {
                                            message.reply("Le contenu aléatoire trouvé est : \n" +
                                                "Titre : " + rtr.randomTitle + "\n" +
                                                "Info : " + rtr.info);
                                        });
                                    } else {
                                        message.reply("Mauvais format lors de la saisie du topic, exemple : #topic.")
                                    }
                                } else {
                                    message.reply("Mauvais format lors de la saisie du genre, exemple : #Genre. \n PS: Tape !liste-genre pour voir la liste des genres.");
                                }
                            });
                        }
                    })
                    .catch(() => {
                        message.reply('Requête annulé puisque tu mets ta vie ... Ou tu fais de la merde !');
                    });
            })
            .catch(() => {
                message.reply('Requête annulé puisque tu mets ta vie ...');
            });
    } else if (command === "next-movies") {
        nextMovies(function (rtr) {
            if (rtr.error) {
                let infos = rtr.infos;

                infos.forEach(info => {
                    message.reply("Titre : " + info.title + "\n" +
                        "Date de sortie : " + info.release + "\n" +
                        "Info : https://www.imdb.com/title/" + info.imdb_id)
                });
            } else {
                message.reply("Oups j'étais pas concentré ! ")
            }
        });
    } else {
        message.reply("Tu sais lire batard !!! \n\nTape !command")
    }
});


/****************************Salon Vin**********************************/
client.on("message", function (message) {
    //https://airtable.com/shrpVWKLxOTl0XWqk


});


/****************************Target Junior**********************************/
client.on("message", function (message) {
    if (message.author.bot) return;

    let target = message.mentions.roles;
    let targetRole = "";
    target.map(info => {
        targetRole = info.name;
    });

    target = message.mentions.members;
    let targetJu = "";
    target.map(info => {
        targetJu = info.user.username;
    });

    if (targetRole === "Junior" || targetJu === "JUNIOR") {
        message.reply("Non !")
    }
});

client.login(process.env.BOT_TOKEN);
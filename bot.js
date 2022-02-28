const dotenv = require("dotenv").config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const prefix = "!";
const prefixBis = "#";

require("./functionHall")();
require('./functionBeer')();

//922563395968974898 <= Channel test-bot

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

                if (!isEmpty(rtr.infos)) {
                    infos.forEach(info => {
                        message.reply("Titre : " + info.title + "\n" +
                            "Date de sortie : " + info.release + "\n" +
                            "Info : https://www.imdb.com/title/" + info.imdb_id);
                    });
                } else {
                    message.reply("Oups ... J'ai rien trouvé ...");
                }
            } else {
                message.reply("Oups j'étais pas concentré ! ");
            }
        });
    } else {
        message.reply("Tu sais lire batard !!! \n\nTape !command");
    }
});


/****************************Salon Bière**********************************/
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.id != "947959865412812870") return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    const Airtable = require('airtable');
    const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base('app8thzBYysgqeDyd');

    if (command === "command") {
        message.reply("**Liste des commandes :** \n\n" +
            "!list-color : Liste les différentes couleurs de bières\n" +
            "!list-type : Liste les différents style de bières\n" +
            "!list-beer : Junior te liste toutes les 3 dernières bières ajoutées dans le catalogue\n" +
            "!random-beer : Junior te trouve une bière aléatoirement sous sa patte\n" +
            "!beer-by-color : Junior te liste les bières par couleur\n" +
            "!beer-by-type : Junior te liste des bières par style\n" +
            "!beer-by-rating : Junior te liste sa meilleure sélection de bière");
    } else if (command === "list-color") {
        message.reply("La liste des couleurs de bières : Blanche, Blonde, Ambrée, Brune, Noir");
    } else if (command === "list-type") {
        message.reply("La liste des styles de bières : Pale Ale, IPA, Double IPA, Berliner, Lager, Triple, Quadriple, Weissbier, Bière de blé, Bière d'abbaye, Pils, Lambics");
    } else if (command === "list-beer") {
        base('Table 1').select({
            sort: [{field: "Ajout", direction: "desc"}],
            maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            message.reply("Les 3 dernières pépites sont les suivantes : \n\n");
            records.forEach(function (record) {
                const infos = record.fields;
                const channel = client.channels.cache.get('922563395968974898');
                channel.send("Nom de la bière : " + infos.Nom +
                    "\nNom de la brasserie : " + infos.Brasserie +
                    "\nCouleur de la bière : " + infos.Couleur +
                    "\nStyle de bière : " + infos.Style +
                    "\nNote attribuée par Junior : " + infos.Note + "/5" +
                    "\n" + infos.Photo);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) {
                message.reply("Oups j'étais pas concentré ! ")
            }
        });
    } else if (command === "random-beer") {
        base('Table 1').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            const record = records[Math.floor(Math.random() * records.length)];
            const infos = record.fields;
            message.reply("La bière aléatoirement trouvée est : \n\n" +
                "Nom de la bière : " + infos.Nom +
                "\nNom de la brasserie : " + infos.Brasserie +
                "\nCouleur de la bière : " + infos.Couleur +
                "\nStyle de bière : " + infos.Style +
                "\nNote attribuée par Junior : " + infos.Note + "/5" +
                "\n" + infos.Photo);
        }, function done(err) {
            if (err) {
                message.reply("Oups j'étais pas concentré ! ");
            }
        });
    } else if (command === "beer-by-color") {
        message.reply("Tape #Color pour choisir ta couleur");

        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 30000})
            .then(collected => {
                let res1 = "";
                collected.map(collect => {
                    res1 = collect;
                });
                const commandBody = res1.content.slice(prefixBis.length);
                const args = commandBody.split(' ');
                const command = args.shift();
                const tempo = removeChara(command, " ", "", 20);
                let color = [tempo];

                base('Table 1').select({
                    maxRecords: 100,
                    pageSize: 100,
                    filterByFormula: "({Couleur} = '" + color + "')",
                    view: "Grid view"
                }).eachPage(function page(records, fetchNextPage) {
                    console.log(records);
                    message.reply("Je t'ai trouvé ca mon pote :  \n\n");
                    records.forEach(function (record) {
                        const infos = record.fields;
                        const channel = client.channels.cache.get('922563395968974898');
                        channel.send("Nom de la bière : " + infos.Nom +
                            "\nNom de la brasserie : " + infos.Brasserie +
                            "\nCouleur de la bière : " + infos.Couleur +
                            "\nStyle de bière : " + infos.Style +
                            "\nNote attribuée par Junior : " + infos.Note + "/5" +
                            "\n" + infos.Photo);
                    });
                    fetchNextPage();
                }, function done(err) {
                    if (err) {
                        console.log(err);
                        message.reply("Oups j'étais pas concentré ! ");
                    }
                });
            })
            .catch(() => {
                message.reply('Requête annulé puisque tu mets ta vie ...');
            });
    } else if (command === "beer-by-type") {
        message.reply("Tape #Type pour choisir ton style de bière");

        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 30000})
            .then(collected => {
                let res1 = "";
                collected.map(collect => {
                    res1 = collect;
                });
                const commandBody = res1.content.slice(prefixBis.length);
                const args = commandBody.split(' ');
                const command = args.shift();
                const tempo = removeChara(command, " ", "", 20);
                let type = [tempo];

                base('Table 1').select({
                    maxRecords: 100,
                    pageSize: 100,
                    filterByFormula: "({Style} = '" + type + "')",
                    view: "Grid view"
                }).eachPage(function page(records, fetchNextPage) {
                    message.reply("Je t'ai trouvé ca mon pote :  \n\n");
                    records.forEach(function (record) {
                        const infos = record.fields;
                        const channel = client.channels.cache.get('922563395968974898');
                        channel.send("Nom de la bière : " + infos.Nom +
                            "\nNom de la brasserie : " + infos.Brasserie +
                            "\nCouleur de la bière : " + infos.Couleur +
                            "\nStyle de bière : " + infos.Style +
                            "\nNote attribuée par Junior : " + infos.Note + "/5" +
                            "\n" + infos.Photo);
                    });
                    fetchNextPage();
                }, function done(err) {
                    if (err) {
                        console.log(err);
                        message.reply("Oups j'étais pas concentré ! ");
                    }
                });
            })
            .catch(() => {
                message.reply('Requête annulé puisque tu mets ta vie ...');
            });
    } else if (command === "beer-by-rating") {
        base('Table 1').select({
            maxRecords: 100,
            pageSize: 100,
            filterByFormula: "({Note} = '5')",
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            message.reply("J'ai ca en stock mon pote à la compote :  \n\n");
            records.forEach(function (record) {
                const infos = record.fields;
                const channel = client.channels.cache.get('922563395968974898');
                channel.send("Nom de la bière : " + infos.Nom +
                    "\nNom de la brasserie : " + infos.Brasserie +
                    "\nCouleur de la bière : " + infos.Couleur +
                    "\nStyle de bière : " + infos.Style +
                    "\nNote attribuée par Junior : " + infos.Note + "/5" +
                    "\n" + infos.Photo);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.log(err);
                message.reply("Oups j'étais pas concentré ! ");
            }
        });
    } else {
        message.reply("Tu sais lire batard !!! \n\nTape !command");
    }
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
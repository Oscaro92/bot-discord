const dotenv = require("dotenv").config();
const request = require("request")
module.exports = function() {
    this.isEmpty = function (body) {
        const isEmpty = (value) => (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
        return isEmpty(body)
    }
    this.removeChara = function (variable, that, by, nbRepeat) {
        for (i = 1; i <= nbRepeat; i++) {
            variable = variable.replace(that, by)
        }
        return variable
    }
    this.generatorMovSer = function (genre, type, random, callback) {
        const options = {
            method: 'GET',
            url: 'https://data-imdb1.p.rapidapi.com/'+type+'/byGen/'+genre+'/',
            qs: {page_size: '101'},
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_TOKEN,
                'x-rapidapi-host': process.env.RAPIDAPI_HOST,
                useQueryString: true
            }
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var data = JSON.parse(body);

            console.log(data)
            console.log(data.results.length)

            if (random) {
                const randomData = data.results[Math.floor(Math.random() * data.results.length)];

                const json =
                    {
                        error: false,
                        randomTitle: randomData,
                        info: "https://www.google.com/search?q="+removeChara(randomData.title, " ", "+", 20)
                    };

                callback(json);
            } else {
                const sizeData = data.results.length;

                const json =
                    {
                        error: false,
                        numberMovieFound: sizeData,
                        randomMovie: data.results
                    };

                callback(json);
            }
        });

    }
    this.addWine = function () {
        return "Oui";
    }
}
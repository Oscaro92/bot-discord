const request = require("request");
require("./function")();
module.exports = function () {
    this.listGenre = function (callback) {
        const options = {
            method: 'GET',
            url: 'http://47.254.174.28/genres/',
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            let data = JSON.parse(body);
            let results = data.results;
            let final = "";

            results.forEach(result => {
                if (final === "") {
                    final = result.genre
                } else {
                    final = final + ", " + result.genre;
                }
            });

            callback(final)
        });
    }
    this.checkGenre = function (genre, callback) {
        let listGenre = ['Adventure', 'Family', 'Fantasy', 'Crime', 'Drama', 'Comedy', 'Animation', 'Sci-Fi', 'Sport', 'Action', 'Thriller', 'Mystery', 'Western', 'Romance', 'Biography', 'Horror', 'War', 'Musical', 'History', 'Music', 'Documentary', 'Short', 'Talk-Show', 'Game-Show', 'Reality-TV', 'News', 'Adult'];

        callback(listGenre.includes(genre));
    }
    this.randomMovSer = function (genre, type, callback) {
        const options = {
            method: 'GET',
            url: 'http://47.254.174.28/' + type + '/byGen/' + genre + '/',
            qs: {page_size: 100}
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const data = JSON.parse(body);
            let url = data.next.split("?");
            url = url[0];
            const count = data.count;
            const nbPage = Math.ceil(count / 100);
            const page = Math.floor(Math.random() * nbPage);

            const options = {
                method: 'GET',
                url: url,
                qs: {
                    page: page,
                    page_size: 100
                }
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                var data = JSON.parse(body);
                const randomData = data.results[Math.floor(Math.random() * data.results.length)];

                const json =
                    {
                        error: false,
                        randomTitle: randomData.title,
                        info: "https://www.imdb.com/title/"+randomData.imdb_id
                    };

                callback(json);
            });
        });
    }
    this.nextMovies = function (callback) {
        const options = {
            method: 'GET',
            url: "http://47.254.174.28/movie/order/upcoming/",
            qs: {
                page_size: 100
            }
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const data = JSON.parse(body);

            const json =
                {
                    error: true,
                    infos: data.results
                };

            callback(json);
        });
    }
}
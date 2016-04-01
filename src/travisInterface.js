'use strict';
var Travis = require('travis-ci');

class travisInterface {

    constructor(githubToken) {
        this.githubToken = githubToken;
        this.travis = new Travis({
            version: '2.0.0',
            headers: {
                'User-Agent': 'Travis/1.0'
            }
        });

        this.authenticate();
    }

    authenticate() {
        this.travis.auth.github.post({
            github_token: this.githubToken
        }, (function (err, res) {
            if (err) {
                console.log('Github Access Error ' + err);
                return;
            }

            this.travis.authenticate({
                access_token: res.access_token
            }, (function (err) {
                if (err) {
                    console.log('Travis Access Error ' + err);
                    return;
                }

                this.getAccountInfo().then((function (username) {
                    this.getUserRepository(username).then(function (repository) {
                        console.log(repository);
                    });
                }).bind(this));

            }).bind(this));
        }).bind(this));
    }

    getAccountInfo() {
        return new Promise(
            (function (resolve) {
                this.travis.accounts.get(function (err, res) {
                    resolve(res.accounts[0].login);
                });
            }).bind(this));
    }

    getUserRepository(username) {
        return new Promise(
            (function (resolve) {
                this.travis.repos(username).get(function (err, res) {
                    resolve(res);
                });
            }).bind(this));
    }
}

module.exports = travisInterface;

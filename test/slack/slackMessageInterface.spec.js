/*global describe, it, beforeEach, afterEach */
'use strict';

var SlackMessageInterface = require('../../src/slack/slackMessageInterface');
var expect = require('chai').expect;
var sinon = require('sinon');
var Bot = require('slackbots');

var Channel = require('../../test/mockObjects/channel');

describe('Bot Initialization', function () {

    beforeEach(function () {
        this.textCheck = '';

        this.slackbotStub = sinon.stub(Bot.prototype, 'postTo', (name, text, params) => {
            this.textCheck = params.attachments[0].text;
        });

        this.loginStub = sinon.stub(Bot.prototype, 'login', function () {});

        this.slackMessageInterface = new SlackMessageInterface('Fake-token-slack');
        this.slackMessageInterface.bot.self = {id: '1234'};
        this.slackMessageInterface.bot.channels = Channel.createChannelList();
        this.slackMessageInterface.run();
    });

    afterEach(function () {
        this.slackbotStub.restore();
        this.loginStub.restore();
    });

    it('should the BOT token present', function () {
        expect(this.slackMessageInterface.bot.token).to.be.equal('Fake-token-slack');
    });

    it('should the BOT say hello to the the channel when start', function () {
        this.slackMessageInterface.bot.emit('start');

        expect(this.textCheck).to.be.equal('Keep calm I am the alarm please think about to add a star to our project <https://github.com/eromano/ci-alarm|Ci Alarm>');
    });

    it('should Not respond with the Build status if asked by ciAlarmBot', function () {
        this.slackMessageInterface.bot.emit('message', {username: this.slackMessageInterface.bot.name, type: 'message', text: 'status'});

        expect(this.textCheck).to.be.equal('');
    });

    it('should Not respond with the Build status if is not a chat message', function () {
        this.slackMessageInterface.bot.emit('message', {type: 'reconnect_url'});

        expect(this.textCheck).to.be.equal('');
    });

});

'use strict';
var _ = require('lodash');

class repository {

    static createRepository(attributes) {

        var defaultAttributes = {
            'id':_.random(1,1000),
            'slug':'fakeuser/fake-project',
            'description':'fake repo description',
            'last_build_id':120506232,
            'last_build_number':'37',
            'last_build_state':'passed',
            'last_build_duration':52,
            'last_build_language':null,
            'last_build_started_at': new Date(),
            'last_build_finished_at':new Date(),
            'active':true,
            'github_language':'JavaScript'
        };

        return _.extend(defaultAttributes, attributes);
    }
}

module.exports = repository;

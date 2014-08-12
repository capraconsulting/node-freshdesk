module.exports = function(url, apikey) {
    var request = require('request');
    var auth = 'Basic ' + new Buffer(apikey + ':X').toString('base64')


    return {
        get: function(link, callback) {
            request(
                {
                    url: url + link,
                    headers: {
                        'Authorization' : auth
                    }
                },
                callback
            );
        },

        post: function(link, data, callback) {
            request.post(
                {
                    url: url + link,
                    json: data,
                    headers: {
                        'Authorization' : auth
                    }
                },
                callback
            );
        };

        put: function(link, data, callback) {
            request.put(
                {
                    url: url + link,
                    json: data,
                    headers: {
                        'Authorization' : auth
                    }
                },
                callback
            );
        };

        postTicket: function(ticket, callback) {
            post('/helpdesk/tickets.json', ticket, callback);
        };

        putTicket: function(id, ticket, callback) {
            put(
                '/helpdesk/tickets/' + id +'.json',
                ticket,
                callback
            );
        },

        getTickets: function(callback) {
            get('/helpdesk/tickets.json', callback);
        },

        getTicket: function(id, callback){
            get('/helpdesk/tickets/' + id + '.json', callback);
        },

        postNoteToTicket: function(id, note, is_private, callback){
            var data = {
                'helpdesk_note':
                {
                    'body': note,
                    'private': is_private
                }
            };
            post('/helpdesk/tickets/' + id + '/conversations/note.json',
                data, callback);
        },

        postContact: function(contact, callback) {
            post('/contacts.json', contact, callback);
        },

        putContact: function(id, contact, callback) {
            put('/contacts/' + id + '.json', contact, callback);
        },

        getContacts: function(callback) {
            get('/contacts.json?state=all', callback);
        },

        getContactByEmail: function(email, callback) {
            get(
                '/contacts.json?state=all&query=email%20is%20' + email,
                function(err, response, body) {
                    var users = JSON.parse(body);
                    if (users.length !== 0) {
                        return callback(users[0]);
                    }
                    return callback(null);
                }
            );
        }
    };
};

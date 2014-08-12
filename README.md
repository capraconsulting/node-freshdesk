node-freshdesk
==============

A small node module that helps integration your application with FreshDesk.
There is still several API endpoints with FreshDesk that is not implemented in this implementation.
Feel free to fork and make pull requests, or adding issues as you please.

## Install

```npm install node-freshdesk```

## Usage

After having installed it, simply require it, set it up with your own url and API-key, and start calling methods!

```
require('node-freshdesk');
var freshdesk = new node-freshdesk(
  'http://yourcompanyname.freshdesk.com',
  'YourAwesomeAPIKeyThatsQuiteLong');

freshdesk.callMethods();
```

### Functions and responses
| Functions | Returns to callback | Explanation |
| ---------------- | ---------------- | ---------------- |
| **get** (link, callback) | callback(err, res, body) | Base function for using get on FreshDesk API. Can be used if non-implemented API call needed. |
| **put** (link, data, callback) | callback(err, res, body)| Base function for using put on FreshDesk API. Can be used if non-implemented API call needed. |
| **post** (link, data, callback) | callback(err, res, body) | Base function for using post on FreshDesk API. Can be used if non-implemented API call needed. |
| **postTicket** (ticket, callback) | callback(err, res, body) | Posts a single Ticket  |
| **putTicket** (id, ticket, callback) | callback(err, res, body) | Updates a ticket by id. |
| **getTickets** (callback) | callback(err, res, body) | Provides all tickets. |
| **getTicket** (id, callback) | callback(err, res, body) | Provides single ticket. |
| **postNoteToTicket** (id, note, is_private, callback) | callback(err, res, body) | Posts a note (update-event) on a ticket. set is_private to true if you do not wish the requestor to be able to read the comment |
| **postContact** (contact, callback) | callback(err, res, body) | Adds a contact |
| **putContact** (id, contact, callback) | callback(err, res, body) | Updates a contact |
| **getContacts** (callback) | callback(err, res, body) | Provides all contacts (that are not deleted)|
| **getContactByEmail** (email, callback) | callback(contact) | Provides single contact if it exists, and is not deleted. Else it returns null. |

## Examples

### Posting a new ticket
```
var example_ticket = {
  'helpdesk_ticket': {
    'description':'A totally rad description of a what the problem is',
    'subject':'Something like "Cannot log in"',
    'email': 'you@example.com',
  }
};

freshdesk.postTicket(
  example_ticket,
  function(err, res, body) {
    if (err)
      console.log('something is not right');
    else {
      console.log('We got a ticket posted to FreshyFresh, it's right here in the body:');
      console.log(body)
    }
  }
);
```
### Editing an existing ticket
```
var ticketupdate = {
  'helpdesk_ticket': {
    'description':'A new description.',
    'status': 3,
    }
};

freshdesk.putTicket(12, ticketupdate, function(err, res, body) {
  // Handle the callback.
}
```
### Retrieving a user
```
freshdesk.getContactByEmail('you@example.com', function(user) {
  if (user === null)
    console.log('we did not find your user');
  else {
    console.log('We got you, man!');
    console.log(user);
  }
});
```

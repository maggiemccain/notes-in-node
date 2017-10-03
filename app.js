console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];

console.log('Yargs', argv)

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Created note: ', note)
    } else {
        console.log('There is already a note with this title.')
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getNote(argv.title);
} else if (command === 'remove') {
    var fileDeleted = notes.removeNote(argv.title);
    var message = fileDeleted  ? `Note titled ${argv.title} deleted` : 'No note deleted'
    console.log(message)
} else {
    console.log('Command not recognized')
}
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
                        describe: 'Title of note',
                        demand: true, //requires arguement, defaults to false
                        alias: 't' //new syntax for command line
                    };
const bodyOptions = {
                        describe: 'Body of note',
                        demand: true, //requires arguement, defaults to false
                        alias: 'b' //new syntax for command line
                    };
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
        })
    .command('list', 'List all notes')
    .command('read', 'Read a specific note', {
        title: titleOptions})
    .command('remove', 'Remove a specific note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Created note: ');
        notes.logNote(note);
    } else {
        console.log('There is already a note with this title.')
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note Found!');
        notes.logNote(note);
    } else {
        console.log('No note exists by this title.')
    }
} else if (command === 'remove') {
    var fileDeleted = notes.removeNote(argv.title);
    var message = fileDeleted  ? `Note titled ${argv.title} deleted` : 'No note deleted'
    console.log(message)
} else {
    console.log('Command not recognized')
}
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions ={
describe:'Title of the note',
demand:true,
alias:'t'
};
const argv = yargs
.command('add','Add a new note',{
title:titleOptions,
body:{
  describe:'body of the note',
  demand:true,
  alias:'b'
},
})
.command('list','List all notes')
.command('read','Read a note',{
  title:titleOptions,
})
.command('Remove','Remove the note',{
  title:titleOptions,
  body:{
    describe:'Removing the body',
    demand:true,
    alias:'rb'
  }
})
.help()
.argv;
var command = argv._[0];


if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes =notes.getAll();
  console.log(`printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=>notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}

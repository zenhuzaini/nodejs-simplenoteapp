//load mongoose
const mongoose = require('mongoose');

//make the scheme of the collection
const NotesSchema = mongoose.Schema({
    title: String,
    content: String
});

//exports the module (collection scheme of mongodb)
module.exports = mongoose.model('Notes', NotesSchema);
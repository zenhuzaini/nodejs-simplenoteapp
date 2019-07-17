const express = require('express');
const router = express.Router();

const notes_collection = require('../models/Notes');

//to get all the notes
router.get('/', async (req, res) => {
    try {
        const notes = await notes_collection.find();
        //res.json(notes);
        res.render('note_home', { notes });
    } catch (error) {
        res.json({ message: error });
        // res.render('note_home', { notes });
    }
});

//to get one node the notes
router.get('/:id', async (req, res) => {
    try {
        const notes = await notes_collection.findById(req.params.id);
        res.render('checknote', { notes });
    } catch (error) {
        res.json({ message: error });
    }
});

//to save notes
router.post('/', async (req, res) => {
    const note = new notes_collection({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const saveNote = await note.save();
        // res.json(saveNote);
        res.redirect('/notes')
    } catch (error) {
        res.json({ message: error });
    }
});

//to delete
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const delNote = await notes_collection.deleteOne({ _id: id });
        // res.json(delNote);
        res.redirect('/')
    } catch (error) {
        json.res({ message: eror });
    }
});

//to update
router.post('/update/:id', async (req, res) => {
    try {
        const note = await notes_collection.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            }
        );
        // res.json(note);
        res.redirect('/notes/' + req.params.id)
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router; //will  export all the outes
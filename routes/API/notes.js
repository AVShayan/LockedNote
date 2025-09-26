const express = require('express');
const router = express.Router();
const noteController = require('../../Controllers/notesController');

router.route('/')
   .get(noteController.getNotes)
   .post(noteController.createNote)
router.route('/:id')
   .put(noteController.updateNote)
   .delete(noteController.deleteNote)

module.exports = router;
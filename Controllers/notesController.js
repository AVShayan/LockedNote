/* We would be making a REST API that will Create,Update,Delete and Display
   the notes of a user.Only the notes of that user will be shown to him and
   not any other notes.
   This can be implemented using Express Sessions. Once the user registers/
   logs in, we will create a session object that will be unique to a user. */

const Note = require('../Models/Note');
// Display all his notes
const getNotes = async (req,res) => {
    console.log(req.session.userid);
    const note = await Note.find({user_id:req.session.userid});
    if(!note) return res.status(204).json({"message":"No Notes yet!"})
    res.json(note);
}
// Create a new note
const createNote = async (req,res) => {
   // console.log(req.header.cookie);
    // We have a session object of the logged-in user
    if(!req?.body?.title || !req?.body?.content)  return res.status(400).json({"message":"Please provide Title and Content"})
    try{
        const result = await Note.create({
            user_id: req.session.userid,
            title: req.body.title,
            content: req.body.content
    })
    return res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
}
/* The user will click the update/delete button and the id of that particluar note is 
   sent to the server  {Frontend Work} */
// Update an existing note
const updateNote = async(req,res) => {
    if(!req?.body?.title || !req?.body?.content) return res.status(400).json({"message":"Please provide Title and Content!"})
    const note = await Note.findOne({user_id:req.session.userid,_id:req.params.id}).exec();
    if(!note) return res.status(204).json({"message":"No Note Found"})  // Only for REST API Testing
    try{
        note.title = req.body.title;
        note.content = req.body.content;
        const result = await note.save();
    return res.status(201).json(result);
    }catch{
        console.error(err);
    }
}
// Delete an existing note
const deleteNote = async(req,res) => {
    console.log("Reached")
    const note = await Note.findOne({userd_id:req.session.userid,_id:req.params.id}).exec();
    console.log(note);
    try{
        const result = await Note.deleteOne(note);
        return res.status(201).json(result);
    }
    catch{
        console.error(err);
    }
}
// Delete all notes
module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}
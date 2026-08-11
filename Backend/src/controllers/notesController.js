import Note from "../Models/Note.js";

export async function getNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(error){
        console.error("Error in getNotes controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function createNote(req,res){
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const saved = await newNote.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error in createNotes controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{
            new:true,
        });
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNotes controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function deleteNote(req,res){
    try {
        const {title,content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(deletedNote);
    } catch (error) {
        console.error("Error in deleteNotes controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getNotebyid (req, res){
    try {
        const receivedNote = await Note.findById(req.params.id);
        if(!receivedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(receivedNote);
    } catch (error) {
        console.error("Error in getNotebyid controller",error);
        res.status(500).json({message: "Internal server error"});
    }
};
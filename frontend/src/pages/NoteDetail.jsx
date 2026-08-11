import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';


const NoteDetail = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);

      } catch (error) {
        if(error.response?.status === 429){
          toast.error("Slow down");
        }else{
          toast.error("Failed to fetch the note");
        }
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchNote();
  },
  [id]);

  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`)
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setSaving(true);
      await axios.put(`http://localhost:5001/api/notes/${id}`,note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update note");
    } finally{
      setSaving(false);
    }
  };

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <div className='flex items-center justify-between mb-6'>
          <Link to={"/"} className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back to notes
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'/>
            Delete Note
          </button>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input type='text' placeholder='Note Title' className='input input-bordered' value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>
            </div>
            <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
            </div>
            <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? "saving..." : "save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI';
import axios from "axios";
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [IsRateLimited, setIsRateLimited] = useState(false);
  const [Notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () =>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);

      } catch (error) {
        console.log("Error finding notes",error);
        if(error.response.status === 429){
          setIsRateLimited(true);
        }else{
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes()
  },[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {IsRateLimited && <RateLimitUI/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {Notes.length === 0 && !IsRateLimited && <NotesNotFound/>}
        
        {Notes.length > 0 && !IsRateLimited &&  (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Notes.map(note => (
              <NoteCard key={note.id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage

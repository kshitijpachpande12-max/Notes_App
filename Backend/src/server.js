import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dns from 'dns';
import dotenv from "dotenv";
import rateLimiter from './middleware/ratelimiter.js';
import cors from "cors";

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT , ()=> {
    console.log("Server started on port:",PORT);
    });
});
import  express  from "express";
const app = express();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import partsRoutes from "./routes/parts.js";
import transactionsRoutes from "./routes/transactions.js";
import jobsRoutes from "./routes/jobs.js";
import templatesRoutes from "./routes/templates.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/upload.js";
import roomRoutes from "./routes/rooms.js";
import cors from "cors";
import 'dotenv/config'

//middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
    });

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
    }
))
app.use(cookieParser())
app.use(express.static('public'))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/rooms", roomRoutes);


app.listen(8800, () => {

    console.log("Backend server is running!");
    });
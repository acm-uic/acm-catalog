import express from "express";
import cors from "cors";
import http from "http";
dotenv.config({ path: ".env.local" });

const app = express();
const server = http.createServer(app);

app.use(express.json()); // Only used for JSON payloads (not needed for form-data)
app.use(express.urlencoded({ extended: true })); // Same, for urlencoded only
app.use(cors());

app.use("/api", RootRouteV1);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

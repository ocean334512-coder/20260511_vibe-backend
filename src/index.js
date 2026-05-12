import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRouter from "./routers/todos.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI 환경변수가 비어 있습니다. .env 파일을 확인하세요.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/todos", todosRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("연결성공");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패:", err.message);
    process.exit(1);
  });

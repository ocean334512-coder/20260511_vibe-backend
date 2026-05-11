import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    time: { type: String, default: "" },
    status: {
      type: String,
      enum: ["예정", "진행중"],
      default: "예정",
    },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

import TODO from "../models/todo.model";
import {authAccess} from "../middleware/authAccess.middleware.js"
const todoCreater = async (req, res) => {
  const { title, descriptions, status } = req.body;
  if (!title || !descriptions) {
    return res
      .status(401)
      .json({ message: "please provide all field", success: false });
  }
  const newTodo = {
    title,
    descriptions,
    status,
    id: req.email,
  };
  const newTodo1 = await TODO.create(newTodo);
  return res
    .status(200)
    .json({ message: "todo created successfully", data: newTodo1 });
};

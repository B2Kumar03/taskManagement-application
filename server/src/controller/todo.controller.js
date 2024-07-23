import TODO from "../models/todo.model.js";
const todoCreater = async (req, res) => {
  const { title, descriptions, status } = req.body;
  console.log(descriptions);
  if (!title || !descriptions) {
    return res
      .status(401)
      .json({ message: "please provide all field", success: false });
  }
  
  const newTodo = {
    title:title,
    description:descriptions,
    status:status,
    id:req.user.email,
  };
  const newTodo1 = await TODO.create(newTodo);
  return res
    .status(200)
    .json({ message: "todo created successfully", data: newTodo1 });
};

export { todoCreater };

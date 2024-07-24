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
    title: title,
    description: descriptions,
    status: status,
    id: req.user.email,
  };
  const newTodo1 = await TODO.create(newTodo);
  return res
    .status(200)
    .json({ message: "todo created successfully", data: newTodo1 });
};
const todoUpdater = async (req, res) => {
  const { id } = req.params; // MongoDB _id
  const { title, description, status } = req.body;

  // Check if all required fields are provided
  if (!title || !description) {
    return res
      .status(401)
      .json({ message: "please provide all fields", success: false });
  }

  try {
    // Find the todo by _id and update it
    const updatedTodo = await TODO.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        status: status,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const todoDeleter = async (req, res) => {
  const { id } = req.params; // MongoDB _id
  console.log(id);
  try {
    // Find the todo by _id and delete it
    const deletedTodo = await TODO.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const filterTodosByStatus = async (req, res) => {
  const { status } = req.query;

  try {
    // Convert the status query parameter to a boolean
    const statusBoolean = status === "true";

    // Find todos by status
    const todos = await TODO.find({ status: statusBoolean });

    return res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const getAllTodosForUser = async (req, res) => {
  const userId = req.user.email; // Assuming `req.user.email` holds the authenticated user's email

  try {
    // Fetch all todos for the specific user from the database
    const todos = await TODO.find({ id: userId });

    return res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
  }
};
const getAllTodosForUserPagination = async (req, res) => {
  const userId = req.user.email; // Assuming `req.user.email` holds the authenticated user's email

  // Get page and limit from query parameters, and set default values if not provided
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate the starting index of the items to be fetched
  const startIndex = (page - 1) * limit;

  try {
    // Fetch todos for the specific user with pagination
    const todos = await TODO.find({ id: userId }).skip(startIndex).limit(limit);

    // Get the total count of todos for the user
    const totalTodos = await TODO.countDocuments({ id: userId });

    return res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
      pagination: {
        totalTodos,
        currentPage: page,
        totalPages: Math.ceil(totalTodos / limit),
        hasNextPage: startIndex + limit < totalTodos,
        hasPrevPage: startIndex > 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export {
  todoCreater,
  todoUpdater,
  todoDeleter,
  filterTodosByStatus,
  getAllTodosForUser,
  getAllTodosForUserPagination
};

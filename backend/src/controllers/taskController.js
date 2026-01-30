const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized to access this task');
      error.status = 403;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === 'CastError') {
      error.message = 'Invalid task ID';
      error.status = 400;
    }
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    // Add userId to task data
    const taskData = {
      ...req.body,
      userId: req.user.id
    };

    const task = await Task.create(taskData);
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized to update this task');
      error.status = 403;
      throw error;
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === 'CastError') {
      error.message = 'Invalid task ID';
      error.status = 400;
    }
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized to delete this task');
      error.status = 403;
      throw error;
    }

    await Task.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Task deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      error.message = 'Invalid task ID';
      error.status = 400;
    }
    next(error);
  }
};
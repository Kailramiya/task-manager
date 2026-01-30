// API Configuration
const API_URL = 'http://localhost:5000/api/tasks';
const AUTH_URL = 'http://localhost:5000/api/auth';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');

// State
let tasks = [];
let currentFilter = 'all';

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Get JWT token
function getToken() {
  return localStorage.getItem('token');
}

// Get headers with authentication
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  
  // Display user email
  const email = localStorage.getItem('userEmail');
  if (email) {
    userEmail.textContent = `Welcome, ${email}`;
  }

  fetchTasks();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  taskForm.addEventListener('submit', handleSubmit);
  logoutBtn.addEventListener('click', handleLogout);
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentFilter = e.target.dataset.filter;
      updateFilterButtons();
      renderTasks();
    });
  });
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
}

// Fetch all tasks from API
async function fetchTasks() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    const data = await response.json();
    
    if (response.status === 401) {
      // Token expired or invalid
      handleLogout();
      return;
    }

    if (data.success) {
      tasks = data.data;
      renderTasks();
      updateTaskCount();
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    showError('Failed to load tasks. Please check if the server is running.');
  }
}

// Handle form submission - Create new task
async function handleSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(taskForm);
  const taskData = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate') || undefined
  };
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    
    const data = await response.json();
    
    if (response.status === 401) {
      handleLogout();
      return;
    }

    if (data.success) {
      tasks.unshift(data.data);
      renderTasks();
      updateTaskCount();
      taskForm.reset();
      showSuccess('Task created successfully!');
    } else {
      showError(data.message || 'Failed to create task');
    }
  } catch (error) {
    console.error('Error creating task:', error);
    showError('Failed to create task. Please try again.');
  }
}

// Delete task
async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    const data = await response.json();
    
    if (response.status === 401) {
      handleLogout();
      return;
    }

    if (data.success) {
      tasks = tasks.filter(task => task._id !== taskId);
      renderTasks();
      updateTaskCount();
      showSuccess('Task deleted successfully!');
    } else {
      showError(data.message || 'Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    showError('Failed to delete task. Please try again.');
  }
}

// Update task status
async function updateTaskStatus(taskId, newStatus) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await response.json();
    
    if (response.status === 401) {
      handleLogout();
      return;
    }

    if (data.success) {
      const taskIndex = tasks.findIndex(task => task._id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = data.data;
        renderTasks();
        showSuccess('Task status updated!');
      }
    } else {
      showError(data.message || 'Failed to update task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    showError('Failed to update task. Please try again.');
  }
}

// Update entire task
async function updateTask(taskId, taskData) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    
    const data = await response.json();
    
    if (response.status === 401) {
      handleLogout();
      return;
    }

    if (data.success) {
      const taskIndex = tasks.findIndex(task => task._id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = data.data;
        renderTasks();
        showSuccess('Task updated successfully!');
      }
    } else {
      showError(data.message || 'Failed to update task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    showError('Failed to update task. Please try again.');
  }
}

// Render tasks to DOM
function renderTasks() {
    const filteredTasks = filterTasks();
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <p>${currentFilter === 'all' ? 'No tasks yet. Add your first task above!' : `No ${currentFilter} tasks found.`}</p>
            </div>
        `;
        return;
    }
    
    taskList.innerHTML = filteredTasks.map(task => createTaskCard(task)).join('');
    
    // Attach event listeners to task cards
    attachTaskEventListeners();
}

// Create task card HTML
function createTaskCard(task) {
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';
    const createdDate = new Date(task.createdAt).toLocaleDateString();
    
    return `
        <div class="task-card ${task.status}" data-task-id="${task._id}">
            <div class="task-header">
                <div>
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <div class="task-badges">
                        <span class="badge badge-status ${task.status}">${formatStatus(task.status)}</span>
                        <span class="badge badge-priority ${task.priority}">${task.priority}</span>
                    </div>
                </div>
            </div>
            
            ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
            
            <div class="task-meta">
                <div>
                    <small>Created: ${createdDate}</small>
                    ${dueDate ? `<br><small>Due: ${dueDate}</small>` : ''}
                </div>
                <div class="task-actions">
                    <select class="status-select" data-task-id="${task._id}">
                        <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                    <button class="btn-delete" data-task-id="${task._id}">Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Attach event listeners to task cards
function attachTaskEventListeners() {
    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = e.target.dataset.taskId;
            deleteTask(taskId);
        });
    });
    
    // Status select dropdowns
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const taskId = e.target.dataset.taskId;
            const newStatus = e.target.value;
            updateTaskStatus(taskId, newStatus);
        });
    });
}

// Filter tasks based on current filter
function filterTasks() {
    if (currentFilter === 'all') {
        return tasks;
    }
    return tasks.filter(task => task.status === currentFilter);
}

// Update filter button states
function updateFilterButtons() {
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Update task count
function updateTaskCount() {
    const count = tasks.length;
    taskCount.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
}

// Format status text
function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show success message
function showSuccess(message) {
    // Simple alert for now - can be replaced with a toast notification
    console.log('✅ Success:', message);
}

// Show error message
function showError(message) {
    // Simple alert for now - can be replaced with a toast notification
    alert('❌ ' + message);
    console.error('Error:', message);
}
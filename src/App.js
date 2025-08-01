import React, { useState } from 'react';
import { Plus, Trash2, Check, Edit3, Save, X } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, text: 'Buy groceries', completed: true, priority: 'medium' },
    { id: 3, text: 'Schedule team meeting', completed: false, priority: 'low' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState('medium');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([
        ...tasks,
        { 
          id: Date.now(), 
          text: inputValue, 
          completed: false, 
          priority: priority 
        }
      ]);
      setInputValue('');
      setPriority('medium');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingId ? { ...task, text: editText } : task
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-6 px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img 
              src="https://img.alicdn.com/imgextra/i2/O1CN01KDhOma1DUo8oa7OIU_!!6000000000220-1-tps-240-240.gif" 
              alt="Capybara" 
              className="w-20 h-20 rounded-full border-4 border-purple-300 md:w-24 md:h-24"
            />
          </div>
          <h1 className="text-3xl font-bold text-purple-800 mb-1 md:text-4xl">Capybara Tasks</h1>
          <p className="text-purple-600 text-sm md:text-base">Organize your day like a relaxed capybara</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4 md:p-6">
          <div className="flex gap-2 mb-3 md:mb-4 flex-col sm:flex-row">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors text-sm md:text-base"
            />
            <div className="flex gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-2 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white text-sm md:text-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={addTask}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center md:p-3"
              >
                <Plus size={20} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-purple-300 mb-3">
                <Check size={40} className="mx-auto md:w-12 md:h-12" />
              </div>
              <p className="text-purple-500 text-sm md:text-base">No tasks yet. Add your first task!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    task.completed 
                      ? 'bg-purple-50 border border-purple-200' 
                      : 'bg-white border border-purple-300'
                  }`}
                >
                  {editingId === task.id ? (
                    <div className="flex-1 flex items-center space-x-2 flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-2 py-1 rounded border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-sm w-full"
                        autoFocus
                      />
                      <div className="flex space-x-1">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-800 transition-colors p-1"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-600 hover:text-gray-800 transition-colors p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 flex-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            task.completed
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'border-purple-400 hover:border-purple-600'
                          }`}
                        >
                          {task.completed && <Check size={12} />}
                        </button>
                        <span
                          className={`${
                            task.completed
                              ? 'line-through text-purple-500'
                              : 'text-purple-800'
                          } text-sm md:text-base break-words`}
                        >
                          {task.text}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)} flex-shrink-0`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => startEditing(task)}
                          className="text-purple-400 hover:text-purple-600 transition-colors p-1"
                        >
                          <Edit3 size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {tasks.length > 0 && (
          <div className="flex justify-between items-center text-purple-600 text-xs md:text-sm mb-6">
            <div>
              {tasks.filter(t => !t.completed).length} tasks remaining
            </div>
            <div>
              {tasks.filter(t => t.completed).length} completed
            </div>
          </div>
        )}

        <footer className="text-center">
          <a 
            href="https://stellacoding.substack.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-700 transition-colors text-xs md:text-sm cursor-pointer"
          >
            by 史戴拉寫扣週報
          </a>
        </footer>
      </div>
    </div>
  );
}
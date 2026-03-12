const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask, updateTask } = require('../controller/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;

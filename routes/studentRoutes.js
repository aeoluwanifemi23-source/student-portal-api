const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;

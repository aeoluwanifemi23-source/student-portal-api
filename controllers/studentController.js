const Student = require('../models/Student');

// @desc    Create a new student account
// @route   POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const { name, regNumber, email } = req.body;

    if (!name || !regNumber || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, registration number, and email are all required',
      });
    }

    const student = await Student.create({ name, regNumber, email });

    return res.status(201).json({
      success: true,
      message: 'Student account created successfully',
      data: student,
    });
  } catch (error) {
    // Duplicate key error (regNumber or email already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `A student with that ${field} already exists`,
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single student's own details
// @route   GET /api/students/:id
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    // Invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update student profile — ONLY name and regNumber allowed
// @route   PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { name, regNumber, email } = req.body;

    // Enforce restriction: email cannot be updated
    if (email !== undefined) {
      return res.status(403).json({
        success: false,
        message: 'Email address cannot be updated. Only name and registration number can be changed.',
      });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (regNumber !== undefined) updates.regNumber = regNumber;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least a name or registration number to update',
      });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'That registration number is already in use',
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a student account
// @route   DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Student account deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const express = require("express");
const { employeeModel } = require("../schema/employeeModel");
const employee = express.Router();

employee.post("/employee", async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;

    const employee = await employeeModel.create({
      firstName,
      lastName,
      email,
      department,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// Get paginated employees
employee.get("/employee", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const employees = await employeeModel.find().skip(skip).limit(limit);
    const totalCount = await employeeModel.countDocuments();

    res.status(200).json({ employees, totalCount });
  } catch (error) {
    console.error("Error retrieving paginated employees:", error);
    res.status(500).json({ error: "Failed to retrieve paginated employees" });
  }
});

employee.delete('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await employeeModel.findByIdAndDelete(id);

    res.sendStatus(204); 
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

employee.put('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, department } = req.body;

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { firstName, lastName, email, department },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

module.exports = {
  employee,
};

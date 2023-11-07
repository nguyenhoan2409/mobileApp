// controllers/roleController.js
const Role = require("../models/Role");

const roleController = {
    createRole: async (req, res, next) => {
        try {
            const { name, description } = req.body;
    
            const existingRole = await Role.findOne({ name });
    
            if (existingRole) {
                return res.status(400).json({
                    success: false,
                    message: "Role with this name already exists",
                });
            }
    
            const newRole = new Role({
                name,
                description,
            });
    
            await newRole.save();
    
            res.status(201).json({
                success: true,
                message: "Role created successfully!",
                role: newRole,
            });
        } catch (error) {
            next(error);
        }
    },
    

    getAllRoles: async (req, res, next) => {
        try {
            const roles = await Role.find({});
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    },

    getRoleById: async (req, res, next) => {
        try {
            const { id } = req.query; 
            const role = await Role.findById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    },


    updateRoleById: async (req, res, next) => {
        try {
            const { id, name, description } = req.body;

            const role = await Role.findById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }

            role.name = name;
            role.description = description;

            await role.save();

            res.status(200).json({
                success: true,
                message: "Role updated successfully!",
                role
            });
        } catch (error) {
            next(error);
        }
    },

    deleteRoleById: async (req, res, next) => {
        try {
            const { id } = req.query; 
            const role = await Role.findById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            await Role.findByIdAndRemove(id);
            res.status(200).json({
                success: true,
                message: "Role deleted successfully!"
            });
        } catch (error) {
            next(error);
        }
    },
    
};

module.exports = roleController;

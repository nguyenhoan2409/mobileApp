const express = require("express");
const Event = require("../models/Event");

const eventController = {
  // use by seller
  getAllEvent: async (req, res, next) => {
    try {
      const Events = await Event.find({});
      res.status(200).json(Events);
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },

  createEvent: async (req, res, next) => {
    try {
      const isEventExists = await Event.findOne({
        name: req.body.name,
      });
  
      if (isEventExists) {
        return res.status(404).json({ message: "Event already exists!" });
      }
  
      const newEvent = await Event.create(req.body);
      res.status(201).json({
        message: "Create Event Successfully!",
        event: newEvent,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error: error.message });
      next(error);
    }
  },
  

  deleteEvent: async (req, res, next) => {
    try {
      const id = req.query.id || req.params.id;
      const Event = await Event.findById(id);
      if (!Event) {
        return res.status(404).json({ message: "Event not exits" });
      }
      await Event.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Delete Event Sucessfully!",
      });
    } catch (error) {
      return next(error);
    }
  },
};

// export
module.exports = eventController;

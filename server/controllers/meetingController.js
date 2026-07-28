const Meeting = require("../models/Meeting");
const { v4: uuidv4 } = require("uuid");

const createMeeting = async (req, res) => {
  try {
    const { host } = req.body;

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      host,
      participants: [host],
    });

    res.status(201).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMeeting,
};
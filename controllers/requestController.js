import BloodRequest from "../models/BloodRequest.js";

export const createRequest = async (req, res) => {

  try {

    const {
      patientName,
      bloodGroup,
      hospital,
      city,
      area,
      unitsNeeded,
      coordinates
    } = req.body;

    const request = new BloodRequest({

      patientName,
      bloodGroup,
      hospital,
      city,
      area,
      unitsNeeded,

      requestedBy: req.user.id,

      location: {
        type: "Point",
        coordinates
      }

    });

    await request.save();

    res.status(201).json({
      success: true,
      message: "Blood request created",
      request
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



export const getNearbyRequests = async (req, res) => {

  try {

    const { lat, lng } = req.query;

    const requests = await BloodRequest.find({
      status: "pending",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000
        }
      }
    })
    .populate("requestedBy", "name phone")
    .select("-__v");

    res.json({
      success: true,
      total: requests.length,
      requests
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



export const acceptRequest = async (req, res) => {

  try {

    if (req.user.role !== "donor") {
      return res.status(403).json({
        success: false,
        message: "Only donors can accept requests"
      });
    }

    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Request already accepted"
      });
    }

    request.status = "accepted";
    request.acceptedBy = req.user.id;

    await request.save();

    res.json({
      success: true,
      message: "Request accepted successfully",
      request
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};

export const getMyCreatedRequests = async (req, res) => {
  try {

    const requests = await BloodRequest.find({
      requestedBy: req.user.id
    })
    .populate("acceptedBy", "name phone")
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: requests.length,
      requests
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }
};



export const getMyAcceptedRequests = async (req, res) => {

  try {

    if (req.user.role !== "donor") {
      return res.status(403).json({
        success: false,
        message: "Only donors can view accepted requests"
      });
    }

    const requests = await BloodRequest.find({
      acceptedBy: req.user.id
    })
    .populate("requestedBy", "name phone")
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: requests.length,
      requests
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};
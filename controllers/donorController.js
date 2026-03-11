import User from "../models/User.js";

export const getNearbyDonors = async (req, res) => {

  try {

    const { bloodGroup, city } = req.query;

    const query = {
      bloodGroup: { $exists: true, $ne: null }
    };

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const donors = await User.find(query)
      .select("-password");

    res.status(200).json({
      success: true,
      total: donors.length,
      donors
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};
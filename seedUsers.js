import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Hospital from "./models/Hospital.js";

dotenv.config();

// 🔗 CONNECT DB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ✅");

// 🔐 PASSWORD
const password = await bcrypt.hash("123456", 10);

// 📍 RANDOM LOCATION (Nagpur)
function randomLocation() {
  const lat = 21.1458 + (Math.random() - 0.5) * 0.1;
  const lng = 79.0882 + (Math.random() - 0.5) * 0.1;

  return {
    type: "Point",
    coordinates: [lng, lat],
  };
}

/* ===============================
 REAL NAGPUR HOSPITALS
=============================== */
const hospitals = [
  { hospitalName:"AIIMS Nagpur", area:"MIHAN" },
  { hospitalName:"Orange City Hospital", area:"Dhantoli" },
  { hospitalName:"Wockhardt Hospital", area:"Shankar Nagar" },
  { hospitalName:"Care Hospital", area:"Ramdaspeth" },
  { hospitalName:"Kingsway Hospital", area:"Kingsway" },
  { hospitalName:"Meditrina Institute", area:"Ramdaspeth" },
  { hospitalName:"Alexis Hospital", area:"Mankapur" },
  { hospitalName:"Getwell Hospital", area:"Dhantoli" },
  { hospitalName:"Hope Hospital", area:"Sitabuldi" },
  { hospitalName:"Lata Mangeshkar Hospital", area:"Hingna" },
  { hospitalName:"Seven Star Hospital", area:"Sitabuldi" },
  { hospitalName:"Om Hospital", area:"Manish Nagar" },
  { hospitalName:"Shree Hospital", area:"Trimurti Nagar" },
  { hospitalName:"Sanjeevani Hospital", area:"Pratap Nagar" },
  { hospitalName:"Suyash Hospital", area:"Dhantoli" },
  { hospitalName:"Arneja Hospital", area:"Central Avenue" },
  { hospitalName:"Sparsh Hospital", area:"Wardha Road" },
  { hospitalName:"Radiance Hospital", area:"Besa" },
  { hospitalName:"Life Care Hospital", area:"Hudkeshwar" },
  { hospitalName:"Apex Hospital", area:"Ayodhya Nagar" },
  { hospitalName:"City Hospital", area:"Sadar" },
  { hospitalName:"Global Hospital", area:"Koradi Road" },
  { hospitalName:"Sunrise Hospital", area:"Khamla" },
  { hospitalName:"Metro Hospital", area:"Civil Lines" },
  { hospitalName:"Unity Hospital", area:"Jaripatka" },
  { hospitalName:"Sai Hospital", area:"Itwari" },
  { hospitalName:"Pulse Hospital", area:"Nandanvan" },
  { hospitalName:"Healing Touch Hospital", area:"Bajaj Nagar" },
  { hospitalName:"Prime Hospital", area:"Gittikhadan" },
  { hospitalName:"Zenith Hospital", area:"Seminary Hills" },
].map((h, i) => ({
  hospitalName: h.hospitalName,
  email: `hospital${i + 1}@mail.com`,
  phone: `91234567${(i + 10).toString().padStart(2, "0")}`,
  password,
  role: "hospital",
  licenseNumber: `LIC${1000 + i}`,
  city: "Nagpur",
  area: h.area,
  address: `${h.area}, Nagpur`,
  location: randomLocation(),
}));

/* ===============================
 INSERT ONLY HOSPITALS
=============================== */
async function seedHospitals() {
  try {
    // ❌ DO NOT DELETE USERS
    // Only insert hospitals

    await Hospital.insertMany(hospitals);

    console.log("🏥 30 Hospitals Added Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedHospitals();
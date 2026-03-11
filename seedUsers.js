import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import User from "./models/User.js"

dotenv.config()

connectDB()

const bloodGroups = [
"A+","A-","B+","B-","AB+","AB-","O+","O-"
]

const names = [
"Rahul Sharma",
"Aman Verma",
"Priya Patel",
"Neha Singh",
"Rohan Gupta",
"Anjali Mehta",
"Vikram Nair",
"Sneha Joshi",
"Karan Malhotra",
"Pooja Kulkarni",
"Arjun Reddy",
"Divya Iyer",
"Akash Chauhan",
"Meera Nair",
"Aditya Mishra",
"Kavya Desai",
"Harsh Jain",
"Ritika Saxena",
"Nikhil Agarwal",
"Sakshi Kapoor",
"Ayush Yadav",
"Isha Sharma",
"Varun Bansal",
"Tanvi Patil",
"Rajat Khanna",
"Simran Kaur",
"Dev Patel",
"Ankit Dubey",
"Shruti Shinde",
"Yash Thakur",
"Aditi Chatterjee",
"Rishabh Gupta",
"Komal Verma",
"Deepak Kumar",
"Payal Mishra",
"Saurabh Pandey",
"Mohit Arora",
"Nisha Jain",
"Abhishek Singh",
"Shivani Tiwari"
]

// random coordinates around Nagpur
const randomCoordinate = () => {

const lat = 21.1458 + (Math.random() - 0.5) * 0.2
const lng = 79.0882 + (Math.random() - 0.5) * 0.2

return {
type: "Point",
coordinates: [lng, lat]
}

}

const createUsers = async () => {

try{

await User.deleteMany({})

let users = []

for(let i=0;i<names.length;i++){

users.push({
name:names[i],
email:`user${i+1}@lifeline.com`,
password:"123456",
role:"donor",
bloodGroup:bloodGroups[Math.floor(Math.random()*bloodGroups.length)],
phone:`98${Math.floor(10000000 + Math.random()*90000000)}`,
location:randomCoordinate()
})

}

await User.insertMany(users)

console.log("40 Realistic Dummy Users Created 🩸")

process.exit()

}catch(error){

console.error(error)
process.exit(1)

}

}

createUsers()
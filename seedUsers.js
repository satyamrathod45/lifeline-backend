import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import User from "./models/User.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const password = await bcrypt.hash("123456",10)

/* ===============================
 RANDOM LOCATION GENERATOR
=============================== */

function randomLocation(){

 const lat = 21.1458 + (Math.random() - 0.5) * 0.1
 const lng = 79.0882 + (Math.random() - 0.5) * 0.1

 return {
  type:"Point",
  coordinates:[lng,lat]
 }

}


/* ===============================
 USERS
=============================== */

const users = [

{
 name:"Rahul Sharma",
 phone:"9876543201",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Dharampeth",
 location: randomLocation()
},

{
 name:"Amit Verma",
 phone:"9876543202",
 password,
 role:"user",
 bloodGroup:"A+",
 isDonor:true,
 city:"Nagpur",
 area:"Sitabuldi",
 location: randomLocation()
},

{
 name:"Vikram Singh",
 phone:"9876543203",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Sadar",
 location: randomLocation()
},

{
 name:"Aditya Kulkarni",
 phone:"9876543204",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Wardha Road",
 location: randomLocation()
},

{
 name:"Karan Patel",
 phone:"9876543205",
 password,
 role:"user",
 bloodGroup:"AB-",
 isDonor:true,
 city:"Nagpur",
 area:"Manish Nagar",
 location: randomLocation()
},

{
 name:"Rohit Gupta",
 phone:"9876543206",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Pratap Nagar",
 location: randomLocation()
},

{
 name:"Manish Tiwari",
 phone:"9876543207",
 password,
 role:"user",
 bloodGroup:"O-",
 isDonor:true,
 city:"Nagpur",
 area:"Trimurti Nagar",
 location: randomLocation()
},

{
 name:"Ankit Jain",
 phone:"9876543208",
 password,
 role:"user",
 bloodGroup:"A-",
 isDonor:true,
 city:"Nagpur",
 area:"Medical Square",
 location: randomLocation()
},

{
 name:"Sameer Khan",
 phone:"9876543209",
 password,
 role:"user",
 bloodGroup:"AB+",
 isDonor:true,
 city:"Nagpur",
 area:"Besa",
 location: randomLocation()
},

{
 name:"Akash Joshi",
 phone:"9876543210",
 password,
 role:"user",
 bloodGroup:"AB-",
 isDonor:true,
 city:"Nagpur",
 area:"Ambazari",
 location: randomLocation()
},

{
 name:"Nikhil Patil",
 phone:"9876543211",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Hingna",
 location: randomLocation()
},

{
 name:"Arjun Deshmukh",
 phone:"9876543212",
 password,
 role:"user",
 bloodGroup:"B-",
 isDonor:true,
 city:"Nagpur",
 area:"Mankapur",
 location: randomLocation()
},

{
 name:"Prashant Shukla",
 phone:"9876543213",
 password,
 role:"user",
 bloodGroup:"A+",
 isDonor:true,
 city:"Nagpur",
 area:"Indora",
 location: randomLocation()
},

{
 name:"Yash Thakur",
 phone:"9876543214",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Jaripatka",
 location: randomLocation()
},

{
 name:"Abhishek Pandey",
 phone:"9876543215",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Katol Road",
 location: randomLocation()
},

{
 name:"Rakesh Nair",
 phone:"9876543216",
 password,
 role:"user",
 bloodGroup:"A-",
 isDonor:true,
 city:"Nagpur",
 area:"Laxmi Nagar",
 location: randomLocation()
},

{
 name:"Harsh Agarwal",
 phone:"9876543217",
 password,
 role:"user",
 bloodGroup:"AB+",
 isDonor:true,
 city:"Nagpur",
 area:"Itwari",
 location: randomLocation()
},

{
 name:"Shivam Mishra",
 phone:"9876543218",
 password,
 role:"user",
 bloodGroup:"O-",
 isDonor:true,
 city:"Nagpur",
 area:"Hudkeshwar",
 location: randomLocation()
},

{
 name:"Deepak Choudhary",
 phone:"9876543219",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Wadi",
 location: randomLocation()
},

{
 name:"Raj Malhotra",
 phone:"9876543220",
 password,
 role:"user",
 bloodGroup:"A+",
 isDonor:true,
 city:"Nagpur",
 area:"Kamptee Road",
 location: randomLocation()
},

{
 name:"Vivek Kapoor",
 phone:"9876543221",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Gittikhadan",
 location: randomLocation()
},

{
 name:"Sahil Sheikh",
 phone:"9876543222",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Zingabai Takli",
 location: randomLocation()
},

{
 name:"Tarun Soni",
 phone:"9876543223",
 password,
 role:"user",
 bloodGroup:"AB+",
 isDonor:true,
 city:"Nagpur",
 area:"Koradi Road",
 location: randomLocation()
},

{
 name:"Varun Bansal",
 phone:"9876543224",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Civil Lines",
 location: randomLocation()
},

{
 name:"Rajat Khanna",
 phone:"9876543225",
 password,
 role:"user",
 bloodGroup:"A-",
 isDonor:true,
 city:"Nagpur",
 area:"Seminary Hills",
 location: randomLocation()
},

{
 name:"Jay Shah",
 phone:"9876543226",
 password,
 role:"user",
 bloodGroup:"B-",
 isDonor:true,
 city:"Nagpur",
 area:"Trimurti Nagar",
 location: randomLocation()
},

{
 name:"Parth Mehta",
 phone:"9876543227",
 password,
 role:"user",
 bloodGroup:"AB+",
 isDonor:true,
 city:"Nagpur",
 area:"Bajaj Nagar",
 location: randomLocation()
},

{
 name:"Nilesh Patil",
 phone:"9876543228",
 password,
 role:"user",
 bloodGroup:"O+",
 isDonor:true,
 city:"Nagpur",
 area:"Khamla",
 location: randomLocation()
},

{
 name:"Gaurav Jaiswal",
 phone:"9876543229",
 password,
 role:"user",
 bloodGroup:"A+",
 isDonor:true,
 city:"Nagpur",
 area:"Shankar Nagar",
 location: randomLocation()
},

{
 name:"Ashish Sharma",
 phone:"9876543230",
 password,
 role:"user",
 bloodGroup:"B+",
 isDonor:true,
 city:"Nagpur",
 area:"Ayodhya Nagar",
 location: randomLocation()
},

{
 name:"Vishal Kumar",
 phone:"9876543231",
 password,
 role:"user",
 bloodGroup:"O-",
 isDonor:true,
 city:"Nagpur",
 area:"Nandanvan",
 location: randomLocation()
}

]


/* ===============================
 RUN SEED
=============================== */

async function seed(){

 await User.deleteMany()

 await User.insertMany([...users])

 console.log("✅ Users and Hospitals seeded successfully")

 process.exit()

}

seed()
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import visaRequirements from "./models/visaRequirements.js";


dotenv.config();

const visaData = [
  {
    country: "Kenya",
    visaTypes: [
      {
        name: "tourist",
        fee: 500,
        processingTime: "3-7 days",
        requirements: [
          { label: "Passport copy", type: "file", required: true },
          { label: "Passport photo", type: "file", required: true },
          { label: "Travel itinerary", type: "file", required: false },
          { label: "Bank statement (3 months)", type: "file", required: true },
        ],
      },
      
    ],
  },

  {
    country: "South Africa",
    visaTypes: [
      {
        name: "tourist",
        fee: 500,
        processingTime: "4-8 days",
        requirements: [
          { label: "Passport copy", type: "file", required: true },
          { label: "Proof of accommodation", type: "file", required: true },
        ],
      },
    ],
  },

  {
    country: "Egypt",
    visaTypes: [
      {
        name: "tourist",
        fee: 30,
        processingTime: "48-72 hours",
        requirements: [
          { label: "Passport copy", type: "file", required: true },
          { label: "Passport photo", type: "file", required: true },
          { label: "Flight reservation", type: "file", required: false },
        ],
      },
    ],
  },
];

const seedVisaRequirements = async () => {
  try {
    await connectToDB();

    // Clear old data
    await visaRequirements.deleteMany();

    // Insert seed data
    await visaRequirements.insertMany(visaData);

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedVisaRequirements();

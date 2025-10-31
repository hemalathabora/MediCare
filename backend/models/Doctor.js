import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    experience: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, default: true },
    nextAvailable: { type: String },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;

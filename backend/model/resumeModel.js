import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Work Experience Schema
const workExperienceSchema = new Schema({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Education Schema
const educationSchema = new Schema({
  degree: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  graduationDate: {
    type: String,
    required: true,
  },
});

// Main Resume Schema
const resumeSchema = new Schema({
  sections: [
    {
      title: {
        type: String,
        required: true,
      },
      items: [
        {
          type: Schema.Types.ObjectId,
          ref: "WorkExperience",
        },
      ],
    },
    {
      title: {
        type: String,
        required: true,
      },
      items: [
        {
          type: Schema.Types.ObjectId,
          ref: "Education",
        },
      ],
    },
  ],
});

const WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);
const Education = mongoose.model("Education", educationSchema);
const Resume = mongoose.model("Resume", resumeSchema);

export { WorkExperience, Education, Resume };

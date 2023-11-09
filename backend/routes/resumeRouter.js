import express from "express";
const router = express.Router();
import { WorkExperience, Education, Resume } from "../model/resumeModel.js";

router.post("/add", async (req, res) => {
  try {
    const { resume } = req.body;

    // Create Work Experience items
    const workExperienceItems = await WorkExperience.create(
      resume.sections[0].items
    );

    // Create Education items
    const educationItems = await Education.create(resume.sections[1].items);

    // Create Resume with references to Work Experience and Education items
    const createdResume = await Resume.create({
      sections: [
        {
          title: resume.sections[0].title,
          items: workExperienceItems.map((item) => item._id),
        },
        {
          title: resume.sections[1].title,
          items: educationItems.map((item) => item._id),
        },
      ],
    });

    res.status(201).json({
      message: "Resume added to the database successfully",
      resume: createdResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const education = await Education.find();
    const work = await WorkExperience.find();
    res.status(200).json([
      { items: education, title: "Education" },
      { title: "Work Experience", item: work },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

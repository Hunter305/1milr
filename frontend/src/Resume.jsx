import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const Resume = () => {
  const [sections, setSections] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/resume");
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run the effect only once upon component mount

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);

    setSections(reorderedSections);
  };

  return (
    <div
      style={{
        width: "8.27in", // 210mm in inches
        height: "11.69in", // 297mm in inches
        backgroundColor,
        margin: "0 auto", // Center the content horizontally
        padding: "20px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)", // Shadow effect
        border: "1px solid #ccc", // Border
      }}
    >
      <h1>Resume</h1>
      <label>
        Select Background Color:
        <select
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        >
          <option value="white">White</option>
          <option value="lightgrey">Light Grey</option>
          <option value="lightblue">Light Blue</option>
        </select>
      </label>

      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2>{section.title}</h2>
            {section.title === "Education" ? (
              <Droppable droppableId={section.title} key={section.title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {section.items.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>
                              <strong>{item.degree}</strong> - {item.college}
                              <br />
                              {item.location && <span>{item.location}</span>}
                              {item.graduationDate && (
                                <span>Graduated: {item.graduationDate}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : section.title === "Work Experience" ? (
              <Droppable droppableId={section.title} key={section.title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {section.item.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>
                              <strong>{item.position}</strong> - {item.company}
                              <br />
                              {item.location && <span>{item.location}</span>}
                              {item.startDate && (
                                <span>
                                  {item.startDate} - {item.endDate || "Present"}
                                </span>
                              )}
                              {item.description && <p>{item.description}</p>}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : null}
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Resume;

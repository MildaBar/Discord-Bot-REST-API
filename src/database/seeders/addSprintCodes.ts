import db from "../index";

export async function addSprintCodes(
  sprintCodes: string[],
  sprintTitles: string[]
) {
  const existingData = await db.selectFrom("sprints").selectAll().execute();
  if (existingData.length === 0) {
    const sprintCodeObjects = sprintCodes.map((sprintCode, index) => ({
      id: index + 1,
      sprintCode,
      sprintTitle: sprintTitles[index],
    }));
    return await db
      .insertInto("sprints")
      .values(sprintCodeObjects)
      .returningAll()
      .execute();
  }
  console.log("Data already exists. Skipping data insertion.");
}

const sprintCodes = [
  "WD-1.1",
  "WD-1.2",
  "WD-1.3",
  "WD-1.4",
  "WD-2.1",
  "WD-2.2",
  "WD-2.3",
  "WD-2.4",
];
const sprintTitles = [
  "First Steps Into Programming with Python: Project",
  "Intermediate Programming with Python: Project",
  "Object Oriented Programming: Project",
  "Computer Science Fundamentals: Project",
  "HTML and CSS - the Foundation of Web Pages",
  "Improving Websites with Javascript",
  "Learning Your First Framework - Vue.js",
  "Typing and Testing JavaScript",
];

addSprintCodes(sprintCodes, sprintTitles)
  .then(() => console.log("Data inserted successfully."))
  .catch((error) => console.error("Error inserting data:", error));

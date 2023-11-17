import { Database } from "@/database";

export async function addSprintCodes(
  sprintCodes: string[],
  sprintTitles: string[],
  db: Database
) {
  const existingSprintData = await db
    .selectFrom("sprints")
    .selectAll()
    .execute();

  if (existingSprintData.length === 0) {
    const sprintCodeObjects = sprintCodes.map((sprintCode, index) => ({
      id: index + 1,
      sprintCode,
      sprintTitle: sprintTitles[index],
    }));

    const insertData = await db
      .insertInto("sprints")
      .values(sprintCodeObjects)
      .returningAll()
      .execute();

    if (insertData.length > 0) {
      console.log(
        "addSprintCodes: Sprint codes and titles appended successfully."
      );
    }

    return insertData;
  }
  console.log("addSprintCodes: Data already exists. Skipping data insertion.");
}

export const sprintCodes = [
  "WD-1.1",
  "WD-1.2",
  "WD-1.3",
  "WD-1.4",
  "WD-2.1",
  "WD-2.2",
  "WD-2.3",
  "WD-2.4",
];
export const sprintTitles = [
  "First Steps Into Programming with Python: Project",
  "Intermediate Programming with Python: Project",
  "Object Oriented Programming: Project",
  "Computer Science Fundamentals: Project",
  "HTML and CSS - the Foundation of Web Pages",
  "Improving Websites with Javascript",
  "Learning Your First Framework - Vue.js",
  "Typing and Testing JavaScript",
];

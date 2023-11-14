import { Database } from "@/database";

export async function addMessages(templates: string[], db: Database) {
  const existingData = await db
    .selectFrom("messageTemplates")
    .selectAll()
    .execute();
  if (existingData.length === 0) {
    const templateObjects = templates.map((template, index) => ({
      id: index + 1,
      template,
    }));
    const insertData = await db
      .insertInto("messageTemplates")
      .values(templateObjects)
      .returningAll()
      .execute();

    if (insertData.length > 0) {
      console.log("addMessagesTemplate: Messages appended successfully.");
    }

    return insertData;
  }
  console.log(
    "addMessagesTemplate: Data already exists. Skipping data insertion."
  );
}

export const messages = [
  "Impressive work! Well done!👏",
  "Fantastic job! Keep up the good work!🎉",
  "You're making great progress!🔥",
  "Congratulations on your achievement! You're on the path to success!🎉",
  "Well done on your progress! Keep pushing forward!🥳",
  "Great work! Your dedication is paying off!🔥",
  "Congratulations on reaching this milestone! You're doing amazing!👏",
  "Fantastic effort! You're making great strides!🥳",
  "Kudos to you for your hard work! Keep it up!🥳",
  "Amazing job! Your determination is admirable!👏",
  "Congratulations on your success! You're unstoppable!🎉",
  "Well done on your accomplishment! You're on the right track!🎉",
  "Great job on your progress! You're unstoppable!👏",
  "Congratulations on your hard-earned achievement! Keep it up!🔥",
  "You're doing an incredible job! Keep moving forward!🎉",
  "Excellent work! Your efforts are truly paying off!🤩",
  "Congratulations on your dedication and perseverance! Keep it up!🔥",
  "Impressive work! Your commitment is truly commendable!👏",
  "Fantastic job on your accomplishment! You're on the right path!🤩",
];

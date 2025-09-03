import db from "#db/client";
import addFile from "./files.js";
import addFolder from "./folders.js";
import { faker } from '@faker-js/faker'

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderName = ['Dogs', 'Cats', 'Lions'] //Folder names are Animal types
  //File names are just random names.
  for (let i = 0; i < 3; i++) {
    const name = folderName[i]
    const folderId = await addFolder(name) //folderId is returned after folder is added
    for (let j = 0; j < 5; j++) {
      await addFile(faker.person.firstName(), faker.number.int({ min: 10, max: 100 }), folderId)
    }
  }
}

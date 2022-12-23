const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const URI = process.env.DB_CONNECTION_KEY;
main();

async function main() {
  try {
    await mongoose.connect(URI);

    console.log("mongoose connected");
  } catch (err) {
    console.log("mongoose error", err);
  }
}

import { app } from "./app.js";

app.get("/", (req, res) => res.send("API working"));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port number " + process.env.PORT);
});

import * as express from "express";
import { log } from "@utils/log";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  log(`Server is listening on http://localhost:${port}`);
});

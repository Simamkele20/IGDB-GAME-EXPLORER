import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"]
  })
);

app.get("/games", (req, res) => {
  res.send("WELCOMe");
})

const port =  5000;
app.listen(port, () => {
    console.log("Website Server on http://localhost:" + port)
});

// const firebaseAdmin = require("firebase-admin");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const setup = require("./setup");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// public folder
app.use("/assets", express.static("client/dist/assets"));
app.use("/public", express.static("public"));

/* CONFIG FIREBASE ADMIN *
const serviceAccount = require('./secrets/google-service-account.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://anwarul-islam.firebaseio.com"
})
/* CONFIG FIREBASE ADMIN */

setup();

/* CONFIG ROUTES */
const convertRoutes = require("./routes/convert.routes");
const appRoutes = require("./routes/app.routes");

app.use(convertRoutes);
app.use(appRoutes);
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});
/* CONFIG ROUTES */

/* LISTEN TO PORT */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

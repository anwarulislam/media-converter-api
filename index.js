// const firebaseAdmin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const app = express();
const setup = require("./setup");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use(convertRoutes);
app.get("", (req, res) => res.json({ message: "App is running" }));
/* CONFIG ROUTES */

/* LISTEN TO PORT */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

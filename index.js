const firebaseAdmin = require("firebase-admin");
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* CONFIG FIREBASE ADMIN */
const serviceAccount = require('./secrets/google-service-account.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://anwarul-islam.firebaseio.com"
})
/* CONFIG FIREBASE ADMIN */


/* CONFIG ROUTES */
const convertRoutes = require('./routes/convert.routes')

app.use(convertRoutes)
/* CONFIG ROUTES */


/* LISTEN TO PORT */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
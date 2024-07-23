const express = require("express");
require("dotenv").config()
const cors = require("cors")
const port = process.env.PORT || 8000
const { connection } = require("./db");
const {userRoute} = require("./routes/User.route");
const { auth } = require("./middlewares/auth");
const { uploadRoute } = require("./routes/Upload.route");

const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/upload", uploadRoute)



app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log(error)
        console.log("Server is not running")
    }
})

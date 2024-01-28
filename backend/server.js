let express = require("express")
const cors = require("cors")
let connectDB = require("./config/db")

let app = express()

//connect Database
connectDB()

app.use(cors())

//Init Middleware
app.use(express.json({ extended: false }))

app.get("/", (req, res) => res.send("Server is up and running."))

app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/wallet", require("./routes/api/wallet"))

let PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

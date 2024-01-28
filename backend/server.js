let express = require("express")
let connectDB = require("./config/db")
require("./middleware/test_blockchain")

let app = express()

//connect Database
// connectDB()

//Init Middleware
app.use(express.json({ extended: false }))

app.get("/", (req, res) => res.send("API Running"))

app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/wallet", require("./routes/api/wallet"))

let PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

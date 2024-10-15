const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

    app.get('/', (req, res) => {
        res.send(`
            <center>
                <h1>Welcome to the Quiz-Application!</h1>
                <br>
                <p>
                    Get Quiz-Application: 
                <a href="https://github.com/RonakPatel2468/QUIZ_APPLICATION.git" target="_blank">Repository:QUIZ_APPLICATION </a>
                </p>
            </center>
        `);
      });    

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

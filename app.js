const express = require('express');
const bodyParser = require('body-parser');


const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const departmentRoutes = require('./routes/departmentRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const studentsRoutes = require('./routes/studentsRoutes');

const app = express();
app.use(bodyParser.json());
const cors = require ('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Mary Jane Hinayas, MIT");
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/dept', departmentRoutes);
app.use('/api/course', coursesRoutes);
app.use('/api/student', studentsRoutes);



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
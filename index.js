const db = require('./db/connection');
const {employeeTrackerApp} = require('./develop/app');

//const express = require('express');
// require('dotenv').config();

// const PORT = process.env.PORT || 3000;

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/api', apiRoutes);

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// });

// app.use((req, res) => {
//   res.status(404).end();
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected!');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

employeeTrackerApp();

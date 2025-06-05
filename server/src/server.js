const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { server } = require('./app.js');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

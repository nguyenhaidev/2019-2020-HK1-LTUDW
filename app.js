const express = require('express');
const app = express();

app.use('/public', express.static('public'));

require('express-async-errors');
require('./middlewares/locals.mdw')(app);

const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
})
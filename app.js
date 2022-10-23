const express = require('express');
const router = require('./routes/routes')
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// routes
app.use(router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


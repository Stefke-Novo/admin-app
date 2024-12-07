const express = require('express');
const app = express()
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const PORT = 3000;
const app_URL = `http://localhost:${PORT}`
const documentation_route = "/docs"
const documentation_URL = app_URL+documentation_route


// Controller registration
app.use("/user",require("./controllers/UserController"))

// Serve Swagger documentation
app.use(documentation_route, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Express server running at ${app_URL}`);
    console.log(`Express server running at ${documentation_URL}`);
  });



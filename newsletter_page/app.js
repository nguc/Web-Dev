const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

const app = new express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/e235aba172",
        method: "POST",
        headers: {
            "Authorization": "chi d5b45ce614d7c8df075db5de605a0906-us4"
        },
        body: jsonData,
    };

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
            console.log(response.statusCode);
        }
    });

});

app.post("/failure.html", function (req, res) {
    res.redirect("/");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// Api key
// d5b45ce614d7c8df075db5de605a0906-us4

// List id
// e235aba172
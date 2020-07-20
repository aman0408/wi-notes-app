const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
const app = express();
app.use(express.json());
//mysql://
//b3fbb1565fbfe6
//134bd92e
//us-cdbr-east-02.cleardb.com/
var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "password";
var con;
function handleDisconnect() {
  con = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b3fbb1565fbfe6",
    password: "134bd92e",
    database: "heroku_d2407d34e0a5ebf",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  con.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}
function encrypt(text) {
  encryptalgo = crypto.createCipher(algorithm, key);
  let encrypted = encryptalgo.update(text, "utf8", "hex");
  encrypted += encryptalgo.final("hex");
  return encrypted;
}

function decrypt(encrypted) {
  decryptalgo = crypto.createDecipher(algorithm, key);
  let decrypted = decryptalgo.update(encrypted, "hex", "utf8");
  decrypted += decryptalgo.final("utf8");
  return decrypted;
}
handleDisconnect();

//sign up
app.post("/app/user", function (req, res) {
  console.log(req.body);
  if (!req.body.username) {
    res.json({
      message: "username required",
    });
  }
  if (!req.body.password) {
    res.json({
      message: "password required",
    });
  }
  var q1 = "SELECT * FROM users WHERE username=?";
  con.query(q1, req.body.username, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.json({
        status: "username already exists",
      });
    } else {
      var encrypted = encrypt(req.body.password);
      console.log(encrypted);
      var values = [req.body.username, encrypted];
      var query = "INSERT INTO users (username,password) VALUES (?)";
      con.query(query, [values], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          status: "user created",
        });
      });
    }
  });

  //   res.json({});
});

//login
app.post("/app/user/auth", function (req, res) {
  if (!req.body.username) {
    res.json({
      message: "username required",
    });
  }
  if (!req.body.password) {
    res.json({
      message: "password required",
    });
  }
  var encrypted = encrypt(req.body.password);
  var query = "SELECT * FROM users where username = ? AND password= ?";
  con.query(query, [req.body.username, encrypted], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      console.log(result[0].user_id);
      res.json({
        status: "success",
        userId: result[0].user_id,
      });
    } else {
      res.json({
        status: "failed",
        message: "incorrect username or password",
      });
    }
  });
});

//list saved notes
app.get("/app/sites/list", function (req, res) {
  console.log(req.query.user);
  var query = "SELECT * FROM notes where user_id = ?";
  con.query(query, req.query.user, function (err, result) {
    if (err) {
      throw err;
    }
    var a = [];
    for (var i = 0; i < result.length; i++) {
      var decrypted = decrypt(result[i].note);
      a.push(decrypted);
    }
    res.json(a);
  });
});

//add note
app.post("/app/sites", function (req, res) {
  if (!req.query.user) {
    res.json({
      message: "user id is required",
    });
  }
  if (!req.body.note) {
    res.json({
      message: "note is required",
    });
  }
  var query = "INSERT INTO notes (user_id,note) VALUES (?)";
  var values = [req.query.user, encrypt(req.body.note)];
  con.query(query, [values], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({
      status: "success",
    });
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on port %d.", port);
});

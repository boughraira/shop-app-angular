const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const config = require("./config");

const Product = require("./models/product");
const Order = require("./models/order");
const nodemailer = require("nodemailer");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURL, { useNewUrlParser: true });

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
const upload = multer({ storage: storage });


const sendMail = (order, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "boughrairahazem8@gmail.com",
      pass: "ufqlyxjkfyplpajz"
    }
  });

  const mailOptions = {
    from: `"hazem boughraira", "boughrairahazem8@gmail.com"`,
    to: `${order.email}`,
    subject: "Confirmation",
    html: `<h1>Your order has been confirmed</h1><br>
            <h3>Order N°: ${order._id}</h3><br>
            <h3>Your products will be delivered to ${order.firstName} ${order.lastName} <br> Adresse:${order.addressOne} ${order.country} ${order.state} ${order.zip} </h3>
            `
  };
  transporter.sendMail(mailOptions, callback);
};
app.post("/api/sendmail/:id", (req, res) => {
  console.log("request came");

  Order.findById({ _id: req.params.id }, function(err, order) {
    sendMail(order, (err, info) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Failed to send email" });
      } else {
        console.log("Email has been sent");
        res.status(200).json({ message: info });
      }
    });
  });
});

app.post("/api/product",upload.single('images') ,(req, res) => {
  console.log(req.body);
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    rate: req.body.rate,
    stock: req.body.stock,
    image:{
      data:fs.readFileSync(req.file.path),
      contentType:"jpg" || "png" || "jpeg"
     }
  });
  
 
  newProduct.save().then(
    rec => {
      res.status(200).json(rec);
    },
    err => {
      res.status(500).json({ error: "error" });
    }
  );
});

app.get("/api/products", (req, res) => {
  Product.find().then(rec => {
    if (rec) {
      res.status(200).json(rec);
    } else {
      res.status(200).json([]);
    }
  });
});
app.put("/api/product/:id", (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body).then(rec => {
    if (rec) {
      res.status(200).json({ message: "product updated successfuly" });
    } else {
      res.status(500).json({ error: "error" });
    }
  });
});
app.get("/api/product/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, rec) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(rec);
    }
  });
});
app.delete("/api/product/:id", (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }).then(rec => {
    if (rec) {
      res.status(200).json({ message: "product deleted sucessfuly" });
    } else {
      res.status(500).json({ error: "error" });
    }
  });
});

app.get('images', express.static('./public/images'));

app.post("/api/checkout", (req, res) => {
  const newOrder = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    country: req.body.country,
    state: req.body.state,
    zip: req.body.zip,
    items: req.body.items.map(item => item._id) || []
  });
  newOrder.save().then(
    rec => {
      res.status(200).json(rec);
    },
    err => {
      res.status(500).json({ error: "error" });
    }
  );
});
app.get("/api/orders", (req, res) => {
  Order.find()
    .populate("items")
    .exec()
    .then(rec => {
      //  console.log(rec);
      rec.forEach(x => {
        console.log(x);
      });

      res.status(200).json(rec);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
app.delete("/api/order/:id", (req, res) => {
  Order.findOneAndDelete({ _id: req.params.id }).then(rec => {
    if (rec) {
      res.status(200).json(rec);
    } else {
      res.status(500).json({ error: "error" });
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(3000, () => console.log("Listening on port 3000..."));

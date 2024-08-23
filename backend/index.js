const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { type } = require("os");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb+srv://DiApiH9kDBFgzPRs:DiApiH9kDBFgzPRs@cluster0.9kbuvgb.mongodb.net/Product")
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));

// Define the upload directory
const imageFolder = path.join(__dirname, 'upload', 'images');

// Ensure the directory exists, if not, create it
if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
       filename: (req, file, cb) => {
        cb(null, file.originalname); // Set file name
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static(imageFolder));

app.post("/upload", upload.single('product'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({
            success: 0,
            message: "No file uploaded",
        });
    }

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        image: req.body.image, // Use image URL here
    });

    try {
        await product.save();
        console.log("Product saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save product",
        });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove product",
        });
    }
});

// Get all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("Fetched products:", products);
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
});
//schema creating for user model
const Users=mongoose.model('Users',{
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    let check = await Users.findOne({ email: email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
    }
   


    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: username, // Ensure this is mapped correctly
        email: email,
        password: password,
        cartData: cart,
    });

    try {
        await user.save();
        const data = {
            user: {
                id: user._id,
                user
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    }
    catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ success: false, message: "Failed to save user" });

}  
})
// creating endpoint for user login
   app.post('/login',async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if (user){
        const passCompare =req.body.password ===user.password;
        if(passCompare){
            const data ={
                user:{
                id:user.id
            }
        }
        const token =jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }

    }
    else{
        res.json({success:false,errors:"wrong email id"})
    }
   })
   //creating endpoint for newcollection
   app.get('/newcollection',async (req,res)=>{
    let products =await Product.find({});
    let newcollection =products.slice(1).slice(-8);
  console.log("Newcollection fetched");
  res.send(newcollection);

})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})
//creating middleware to fetch user
const fetchUser =async(req,res,next)=>{
    const token =req.header('auth-token');
if(!token){
    res.status(401).send({errors:"please authenticate using valid token "})
}
else{
    try{
const data =jwt.verify(token,'secret_ecom');
req.user =data.user;
next();
    }catch(error){
res.status(401).send({errors:"please authenticate using a valid token"})
    }
}
}
//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData =await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]  +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("added")
})
//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
     console.log("removed",req.body.itemId);
    let userData =await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]  -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")   

})
//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart")
    let userData =await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});

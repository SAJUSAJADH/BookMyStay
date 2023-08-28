require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(5);
const cookieParser = require('cookie-parser');
const axios = require("axios");
const authenticateJWT = require('./middleware/authMiddleware');
const admin = require("firebase-admin");
const serviceAccount = require("./bookmystay-393513-firebase-adminsdk-1gpn3-081d864f4a.json"); 
const path = require('path');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bookmystay-393513.appspot.com",
});

const bucket = admin.storage().bucket();



app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

let cors = require("cors");
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));


const User = require("./model/user");
const Place = require("./model/place");
const Booking = require('./model/booking');
require("./db/connect");


app.post("/api/register", async (req,res)=>{
    const  {username, password} = req.body;
    
    

    
    try
      {
        const userExist = await User.findOne({email:username});

        if(userExist){
          return res.status(422).json({error:"email already exist"});
        }else{
            const user = new User({email:username, password:bcrypt.hashSync(password, salt)});
        
            await user.save();
        
            res.status(201).json(user);}
    
    }catch(err){
      return res.status(422).json(err);
    }
  })

  app.post('/api/signin',async (req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email:email});
    if(userDoc){
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if(passOk){
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id,
          password:userDoc.password
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.json('#errorcode');
      }
    } else {
      res.json('#errorcode');
    }
  })
  
  app.get('/api/verify',(req,res)=>{
    const {token} = req.cookies;
      if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const user = await User.findById(userData.id);
          if(!user){
            return res.json('not logged in')
          }
          const {email,_id,password} = user;
          res.json({email,_id,password})
        });
      } else {
        res.json(null);
      }
  } )


  app.post('/api/profile',authenticateJWT, async (req,res)=>{
    const {firstname,lastname,company,phonenumber,designation,bio} = req.body;
    const userId = req.user.id;
    try{
      const user = await User.findByIdAndUpdate(userId,{
        $set: {
          firstname: firstname,
          lastname: lastname,
          phone: phonenumber,
          bio: bio,
          company: company,
          designation: designation
        }
      },{
        new: true
      });
      if(!user){
          return res.status(404).json({error:'User not found'})
        }else{
          await user.save();
          return res.json({user})
        }
      }
      catch(error){
      console.log(error)
      return res.status(500).json({error: 'Internal server error'});
    }
  })
  
  app.get('/api/additionalInfo',authenticateJWT, async (req,res)=>{
    const userId = req.user.id;
  
    try{
      const user =await User.findById(userId);
      if(!user){
        return res.status(404).json({error: 'User not found'})
      }
      const {phone, bio, company, designation, firstname, lastname} = user;
      return res.json({ user: { phone, bio, company,designation,firstname, lastname } });
    }catch(error){
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  })

  app.post('/api/updatepassword',authenticateJWT, async(req,res)=>{
    const {oldpassword,newPassword} = req.body;
    const userId = req.user.id;
   
    try{
      const user = await User.findById(userId);
      if(!user){
        return res.status(404).json({error:'user not found'})
      }
      const passOk = bcrypt.compareSync(oldpassword,user.password)
      if(passOk){
          const updatedData = {
          password: bcrypt.hashSync(newPassword,salt)
          }

          const result = await User.updateOne({ _id: userId }, updatedData);
          await user.save();
          res.json(result);
        }else{
        return res.json('wrong password');
      }
    }catch(error){
      console.log(error)
    }
  })


  app.post('/api/logout',(req,res)=>{
    res.cookie('token','').json(true);
  })

  app.post('/api/upload',authenticateJWT, async (req,res)=>{



    const userId = req.user.id;
    const {latestImageUrl} = req.body;

    try{
      const user = await User.findById(userId);
      if(!user){
        return res.status(404).json({error:'User not found'})
      }
      user.image = latestImageUrl;
      await user.save();
    

      return res.json({user});
    } 
    
    catch(error){
      console.log(error);
      return res.status(500).json({error:'Internal server error'});
    }
  
});

  app.get('/api/upload',authenticateJWT, async (req,res)=>{
  const userId = req.user.id;
  try{
    const user = await User.findById(userId);
      if(!user){
        res.status(404).json({error:'User not found'})
      }
      return res.json(user);
  }catch(error){
    console.log(error)
    res.status(500).json({error:'Internal server error'})
  }
})

  app.post('/api/upload-by-link',authenticateJWT, async (req, res) => {
  const { link } = req.body;
  const UserId = req.user.id;
  

  try {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return res.json('invalid');
    } else {
      const response = await axios.get(link, {
        responseType: 'arraybuffer',
      });

      
      const newName = Date.now() + '.jpg'; 

      
      const remoteFileName = `places/${newName}`;
      const fileBuffer = Buffer.from(response.data);

      await bucket.file(remoteFileName).save(fileBuffer, {
        metadata: {
          contentType: 'image/jpeg', 
        },
      });
      const [publicUrl] = await bucket.file(remoteFileName).getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      
      res.json(publicUrl);
    }
  } catch (error) {
    console.log(error);
    res.json('notfound');
  }
});

  app.post('/api/places',authenticateJWT, async (req,res)=>{
  const userId = req.user.id;
  const {title, address, filteredArray, description, features, extraInfo, checkin, checkout, maxguest, price} = req.body;
  console.log(req.body)
  try{
    const place = new Place({
      owner: userId, 
      title: title, 
      address: address, 
      photos: filteredArray, 
      description: description, 
      features: features, 
      extrainfo: extraInfo, 
      checkin: checkin, 
      checkout: checkout, 
      maxguest: maxguest,
      price:price
    });

    await place.save();

    res.json(place)

  }catch(error){
    console.log(error)
  }
})

  app.get('/api/listedplaces',authenticateJWT,async(req,res)=>{
  try{
    const userId = req.user.id;
    const placedata = await Place.find({owner:userId});
    res.json(placedata);
  }catch(error){
    res.json(error)
  }
})

  app.post('/api/updateplace',authenticateJWT,async(req,res)=>{
    const UserId = req.user.id;
    const {
      id, title, address, features, 
      description, extraInfo, checkin,
      checkout, maxguest,  price
    } = req.body;

  try{ 
    const placeDoc = await Place.findById(id);
    const owner = placeDoc.owner.toString();

      if(UserId === owner){
        const place = await Place.findByIdAndUpdate(id,{
          $set: {
            title: title,
            address: address,
            features: features,
            description: description,
            extrainfo: extraInfo,
            checkin: checkin,
            checkout: checkout,
            maxguest: maxguest,
            price: price

          }
        },{
          new: true
        });
        await place.save();
        res.json('success')
      }
  }catch(error){
    res.json(error)
    console.log(error)
  }
    
})
  
  app.post('/api/deleteplace',async(req,res)=>{
  try{
    const {id} = req.body;
    const query = { place: id };
    await Booking.deleteMany(query);
    await Place.findByIdAndDelete(id);
    res.json({message:'Document Deleted'})
}
  catch(error){
    res.json(error)
    console.log(error)
  }
})

  app.get('/api/allplaces',async (req,res)=>{
  try{
    const places = await Place.find();
    res.json(places)
  }catch(error){
    res.json(error)
  }
})

  app.get('/api/book/:id',async(req,res) =>{
  const {id} = req.params;
  res.json(await Place.findById(id));
})

  app.post('/api/booknow',authenticateJWT,async(req,res) => {
  const UserId = req.user.id;
  const {place, checkin, checkout, maxguest, name, mobile, price} = req.body;
  try{
    const booking = new Booking({
    place:place,
    user:UserId,
    checkin:checkin,
    checkout:checkout,
    numberofguests:maxguest,
    name:name,
    phone:mobile,
    price:price
  })

    await booking.save();
    res.json(booking);
  }
  catch(error){
    res.json(error)
  }
})

  app.get('/api/bookinghistory', authenticateJWT,async(req,res)=>{
  try{
    const userId = req.user.id;
    res.json(await Booking.find({user:userId}).populate('place'))
  }
  catch(error){
  res.json(error)
  }
})

  app.delete('/api/cancel/:id', async(req,res)=>{
  const {id} = req.params;
  try{
    const booking = await Booking.findByIdAndDelete(id);
    if(booking){
      res.json({message:"cancelled Booking"})
    }else{
      res.json({message:"cannot cancel at this stage"})
  }}catch(error){
      res.json(error)
    }
})

  app.get('/api/search/:query',async(req,res)=>{
  const {query} = req.params;
  try{
    let result = [];
    const places = await Place.find({address: {$regex: query, $options: "i"}})
    const address = await Place.find({title: {$regex: query, $options: "i"}})
    for (var i = 0; i < places.length; i++) {
      result.push(places[i]);
    }
    for (var i = 0; i < address.length; i++) {
      result.push(address[i]);
    }
    res.json(result)
      
  }catch(error){
    res.json(error)
  }
})

  app.listen(5000,()=>{
    console.log("app started on localhost 5000");
})
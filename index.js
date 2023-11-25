const express = require('express')
const app = express()
const cors = require('cors')
// const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xm8ksdz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allcoursesCollection = client.db("learnHubDb").collection("courses");
    // const usersCollectyion = client.db("bistroDb").collection("users");
    // const reviwesCollectyion = client.db("bistroDb").collection("reviews");
    // const cartCollectyion = client.db("bistroDb").collection("carts");


    
//     // / **** Jwt Releted  api ****************
//     app.post('/jwt' , async(req,res)=>{
//       const user = req.body;
//       const token=jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn:'1h'});
//       res.send({ token });
//     })

//     // / **** verify token middaleware ****************
//     const verifyToken = (req, res,next)=>{
//       // console.log( 'inside veri',req.headers.authorization);
//       if (!req.headers.authorization) {
//         return res.status(401).send({message: 'forbidden access '})
        
//       }
//       const token = req.headers.authorization.split(' ')[1];
//       jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode)=>{
//         if (err) {
//           return res.status(401).send({message: 'forbidden access '})
//         }
//         req.decode=decode;
//         next();
//       })

//     }

//     const verifyAdmin = async(req,res,next)=>{
//       const email = req.decode.email;
//       // console.log(email);
//       const query = {email : email};
//       const user = await usersCollectyion.findOne(query);
//       const isAdmin= user?.role == 'admin'
//       if (!isAdmin) {
//        return res.status(403).send({message : 'unauthorized access'})
//       }
//       next();
//     }



//     app.get('/users', verifyToken,verifyAdmin ,async(req,res)=>{
//       try {
//           const result = await usersCollectyion.find().toArray()
//            res.send(result)
//           } catch (error) {
//           console.log(error);}
//   })

//   app.get('/users/admin/:email',verifyToken, async(req,res)=>{
//     const email = req.params.email;
//     if (email !== req.decode.email) {
//       return res.status(403).send({message: 'aunauthgrized '})
//     }
//     const query = {email : email}
//     const user = await usersCollectyion.findOne(query);
//     let admin = false;
//     if (user) {
//       admin=user.role === 'admin'
      
//     }
//     res.send({ admin });

//   })




    // / **** Get Operation Start ****************

    app.get('/courses' , async(req , res)=>{
        try {
            const result = await allcoursesCollection.find().toArray();
            res.send(result)
        } catch (error) {
            console.log(error);}})







//     app.get('/reviews' , async(req , res)=>{
//         try {
//             const result = await reviwesCollectyion.find().toArray();
//             res.send(result)
//         } catch (error) {console.log(error);}})

//     app.get('/cart', async(req,res)=>{
//         try {
//             const email = req.query.email;
//             // console.log(email);
//             const query = {email : email};
//             // console.log(query);
          
//             const result =await cartCollectyion.find(query).toArray();
//             res.send(result)
//         } catch (error) { console.log(error); }})

   
//     // / **** Get Operation End ****************


//     // / **** Delete Operation Start ****************

// app.post('/cart', async(req , res)=>{
//    try {
//     const cartItem = req.body;
//     const result = await cartCollectyion.insertOne(cartItem)
//     res.send(result)
//    } catch (error) {
//     console.log(error);
//    }})
   

//    app.post('/users', async(req,res)=>{
// try {
//     const user = req.body;
//     const query = {email : user.email}
//     const existingUser = await usersCollectyion.findOne(query)
//     if (existingUser) {
//         return res.send('User Already Exist')
//     }
//     const result = await usersCollectyion.insertOne(user)
//     res.send(result)
// } catch (error) {
//    console.log(error); 
// }
//    })
// // /****** Post Operation End ****************

//  // / **** Delete Operation Start ****************
//    app.delete('/cart/:_id' , async(req,res)=>{
//   try {
//     const id = req.params._id;
//     // console.log(id);
//     const query = {_id: new ObjectId(id)}
//     // console.log(query);
//     const result = await cartCollectyion.deleteOne(query)
//     res.send(result)
//   } catch (error) {
//     console.log(error);
//   }

//    })


//    app.delete('/users/:_id',verifyToken,verifyAdmin, async(req,res)=>{
//     const id = req.params._id;
//     const query = {_id : new ObjectId(id)}
//     const result = await usersCollectyion.deleteOne(query)
//     res.send(result)
//    })


// // / **** Delete Operation end ****************

// // / **** Patch Operation Start ****************
// app.patch('/users/admin/:_id',verifyToken,verifyAdmin, async(req ,res)=>{
//     const id = req.params._id;
//     const filter = {_id : new ObjectId(id)};
//     const updatedDoc = {
//          $set:{
//             role:'admin'
//          }
//     }
//     const result = await usersCollectyion.updateOne(filter, updatedDoc)
//     res.send(result)
// })
     



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    try {
        res.send('LearnHub Is Running')
    } catch (error) {
        console.log(error);
    }
 
})




app.listen(port, () => {
  console.log(`LearnHub Server is Running On: ${port}`)
})
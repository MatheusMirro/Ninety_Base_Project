import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';


dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

//3h12min/46s//

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//app.get("/api/products/:id", (req, res) => {
//    const productId = req.params.id;
//    const product = data.products.find(x=>x._id === productId);
//    if (product)
//        res.send(product)
//    else
//        res.status(404).send({ msg: "Produto não encontrado.. =(" })
//});
//
//app.get("/api/products", (req, res) => {
//
//    res.send(data.products);
//});

app.listen(5000, () => {
    console.log("Servidor rodando na rota http://localhost:5000")
});

export default app; 
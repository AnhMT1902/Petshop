import express from "express";
import {routerProduct} from "./src/router/product-router";
import fileUpload from "express-fileupload"

const app = express()
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static('public'));
app.use(express.json())
app.use('/products', routerProduct)
app.listen(3000, () => {
    console.log('server running localhost 3000')
})
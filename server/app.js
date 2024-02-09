import express from "express";
import fileupload from "express-fileupload";
//import routes
import testRoutes from "./routes/test.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
//Middlewares
const app = express();
app.use(express.json())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
//routes
app.use(testRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

export default app;
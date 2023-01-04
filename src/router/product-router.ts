import {request, response, Router} from "express";
import ProductController from "../controller/product_controller";
export const routerProduct = Router();
routerProduct.get('/', ProductController.getAll)
routerProduct.get('/creat', ProductController.showFormCreat)
routerProduct.post('/creat', ProductController.createProduct)
routerProduct.get('/manage', ProductController.showFormManage)
routerProduct.post('/delete/:id', ProductController.deleteProduct)
routerProduct.get('/:id', ProductController.showProductDetail)
routerProduct.get('/edit/:id', ProductController.showFormEdit)
routerProduct.post('/edit/:id', ProductController.editProduct)
routerProduct.post('/search', ProductController.searchProduct)
routerProduct.get('/search/:key', ProductController.showProductByKey)
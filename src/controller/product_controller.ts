import {ProductService} from "../service/product-service";
import {Request, Response} from "express";

// import {ImageService} from "../service/image-service";

export class ProductController {
    private productService: ProductService;


    constructor() {
        this.productService = new ProductService()
    }

    getAll = async (req: Request, res: Response) => {
        let products = await this.productService.findAll(req, res)
        res.render('index', {
            listProducts: products
        })
    }
    showFormCreat = async (req: Request, res: Response) => {
        res.render('crud/creat')
    }
    createProduct = async (req: Request, res: Response) => {
        await this.productService.saveProduct(req, res)
        res.redirect(301, '/products')
    }
    showFormManage = async (req: Request, res: Response) => {
        let products = await this.productService.find(req, res)
        res.render('crud/manageProduct', {
            listProducts: products
        })
    }
    deleteProduct = async (req: Request, res: Response) => {
        let id = +req.params.id
        await this.productService.deleteByID(req, res, id)
        res.redirect(301, '/products/manage')
    }
    showFormEdit = async (req: Request, res: Response) => {
        let id = +req.params.id
        let product = await this.productService.findByID(req, res, id)
        res.render('crud/edit', {products: product})
    }
    editProduct = async (req: Request, res: Response) => {
        let id = +req.params.id
        await this.productService.editByID(req, res, id)
        res.redirect(301, '/products/manage')
    }
    showProductDetail = async (req: Request, res: Response) => {
        let id = +req.params.id
        let product = await this.productService.findByID(req, res, id)
        console.log(product)
        res.render('product/info', {product: product})
    }
    searchProduct = async (req: Request, res: Response) => {
        let key = req.body.key
        res.redirect(301, `/products/search/${key}`)
    }
    showProductByKey = async (req: Request, res: Response) => {
        let key = req.params.key
        let products = await this.productService.findProductByKey(req, res, key)
        res.render('product/product', {
            listProductsSearch: products
        })
    }
}

export default new ProductController()
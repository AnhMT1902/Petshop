import {AppDataSource} from "../data-source";
import {Product} from "../model/product";
import {Request, Response} from "express";
import {UploadedFile} from "express-fileupload";
import {ImageService} from "../service/image-service";

export class ProductService {
    private productRepository: any;
    private imageRepository: ImageService;

    constructor() {
        AppDataSource.initialize().then((connection) => {
            console.log('connect DB success')
            this.productRepository = AppDataSource.getRepository(Product);
        })
        this.imageRepository = new ImageService()
    }

    findByID = async (req: Request, res: Response, id) => {
        let sql = `select *, s.id as id_species
                   from product
                            join image on product.id = id_product
                            join species s on product.species = s.id
                   where id_product = ${id}`;
        return await this.productRepository.query(sql);
    }

    find = async (req: Request, res: Response) => {
        let sql = `select product.id, name, price, species.species
                   from product
                            join species on product.species = species.id`
        return await this.productRepository.query(sql);
    }

    findAll = async (req: Request, res: Response) => {
        let sql = `select product.id, name, price, species.species, image
                   from product
                            join image on product.id = id_product
                            join species on product.species = species.id
                   group by product.id`;
        return await this.productRepository.query(sql);
    }
    saveProduct = async (req: Request, res: Response) => {
        let files = req.files
        if (files != null) {
            let product = req.body
            if (product.name.length > 0 && product.price > 0 && product.age > 0 && product.color.length > 0 && product.description.length > 0) {
                await this.productRepository.save(product)
                let prd = await this.findIdMax(req, res)
                let id = +prd[0].id
                let arrayImage: any = files.image
                let lengthArr = arrayImage.length
                if (!lengthArr) {
                    let image = arrayImage as UploadedFile
                    await image.mv('./public/img/' + image.name)
                    let img = {
                        id_product: id,
                        image: `./img/${image.name}`
                    }
                    await this.imageRepository.saveImage(img)
                } else {
                    for (let index in arrayImage) {
                        let image = arrayImage[index] as UploadedFile
                        await image.mv('./public/img/' + image.name)
                        let img = {
                            id_product: id,
                            image: `/img/${image.name}`
                        }
                        await this.imageRepository.saveImage(img)
                    }
                }
                // for (let index in arrayImage) {
                //     let image = arrayImage[index] as UploadedFile
                //     await image.mv('./public/img/' + image.name)
                //     let img = {
                //         id_product: id,
                //         image: `/img/${image.name}`
                //     }
                //     await this.imageRepository.saveImage(img)
                // }
            } else {
                console.log('loi me r')
            }
        }
    }

    findIdMax = async (req: Request, res: Response) => {
        let sql = `select max(id) as id
                   from product`;
        return await this.productRepository.query(sql);
    }


    deleteByID = async (req: Request, res: Response, id: number) => {
        let sqlProduct = `delete
                          from product
                          where id = ${id}`;
        await this.productRepository.query(sqlProduct);
        await this.imageRepository.deleteImage(id)
    }
    editByID = async (req: Request, res: Response, id: number) => {
        let files = req.files
        if (files !== null) {
            let product = req.body
            let sqlProduct = `update product
                              set name        = '${product.name}',
                                  age         = ${+product.age},
                                  gender      = '${product.gender}',
                                  species     = ${+product.species},
                                  price       = ${+product.price},
                                  color       = '${product.color}',
                                  description =' ${product.description}'
                              where id = ${+id}`
            if (product.name.length > 0 && product.price > 0 && product.age > 0 && product.color.length > 0 && product.description.length > 0) {
                await this.productRepository.query(sqlProduct)
                await this.imageRepository.deleteImage(id)
                let arrayImage: any = files.image
                let lengthArr = arrayImage.length
                if (!lengthArr) {
                    let image = arrayImage as UploadedFile
                    await image.mv('./public/img/' + image.name)
                    let img = {
                        id_product: id,
                        image: `./img/${image.name}`
                    }
                    let sqlImage = `update image
                                    set image = '${img.image}'
                                    where id_product = ${+id}`
                    await this.imageRepository.editImage(sqlImage)
                } else {
                    for (let index in arrayImage) {
                        console.log(index)
                        let image = arrayImage[index] as UploadedFile
                        await image.mv('./public/img/' + image.name)
                        let img = {
                            id_product: id,
                            image: `/img/${image.name}`
                        }
                        let sqlImage = `update image
                                        set image = '${img.image}'
                                        where id_product = ${+id}`
                        await this.imageRepository.editImage(sqlImage)
                    }
                }
            } else {
                console.log('loi me r')
            }
        }
    }
    findProductByKey = async (req: Request, res: Response, key: string) => {
        let sql = `select product.id, name, price, species.species, image
                   from product
                            join image on product.id = id_product
                            join species on product.species = species.id
                   where species.species = '${key}'
                      or name like '%${key}%'
                   group by product.id`;
        return await this.productRepository.query(sql);
    }
}

export default new ProductService()
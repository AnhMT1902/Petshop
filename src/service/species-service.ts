import {AppDataSource} from "../data-source";
import {query, Request, Response} from "express";
import {UploadedFile} from "express-fileupload";
import {Image} from "../model/image";

export class ImageService {
    private imageRepository: any;

    constructor() {
        AppDataSource.initialize().then((connection) => {
            console.log('connect DBimg success')
            this.imageRepository = AppDataSource.getRepository(Image);
        })
    }

    findByIdProduct = async (req: Request, res: Response) => {
        let id = +req.params.id
        return await this.imageRepository.find({
                where: {
                    id_product: id
                }
            }
        )
    }
    saveImage = async (img) => {
        await this.imageRepository.save(img)
    }

    deleteImage = async (id) => {
        let sqlImage = `delete
                        from image
                        where id_product = ${id}`
        return await this.imageRepository.query(sqlImage)
    }
}

export default new ImageService()
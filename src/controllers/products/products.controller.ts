import { Request, Response } from 'express';
import Product from '../../models/products';
import { uploadFile } from '../../utils/utils';

export async function addProduct(req: Request, res: Response) {
    const product = req.body;
    const url = await uploadFile(req.file);

    if (!product || !url) {
        res.status(400).send({ message: "All product is required" });
        return;
    }
    const products = new Product({
        name: product.name,
        description: product.description,
        imageUrl: url,
        price: product.price
    });

    products.save(products).then((data: any) => {
        res.send(data)
    }).catch((err: any) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the product."
        });
    })
}

export async function getProducts(req: Request, res: Response) {
    Product.find()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product."
            });
        });
}

export async function deleteProduct(req: Request, res: Response) {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete product with id=${id}. Maybe product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch((err: any) => {
            res.status(500).send({
                message: "Could not delete product with id=" + id
            });
        });

}

export async function updateProduct(req: Request, res: Response) {
    const product = req.body;
    if (!product) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, product, { useFindAndModify: false })
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update product with id=${id}. Maybe product was not found!`
                });
            } else res.send({ message: "Product was updated successfully." });
        })
        .catch((err: any) => {
            res.status(500).send({
                message: "Error updating product with id=" + id
            });
        });
}
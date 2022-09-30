import Product from "../models/Product.js"

const Products = {
    getAllProducts: async (req, res) => {
        const products = await Product.find()

        res.status(200).json({status: "OK",
                              moment: new Date().toLocaleString(), 
                              products
                            })
    },
    createProduct: async (req, res) => {
        const product = new Product(req.body)

        const uploadedProduct = await product.save()
        
        res.status(201).json({status: "OK", moment: new Date().toLocaleString(), uploadedProduct})
    },
    getProductById: async (req, res) => {
        const product = await Product.findById(req.params.id)

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), product})
    },
    updateProduct: async (req, res) => {
        const { id } = req.params
        const data = req.body

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({status: "OK", moment: new Date().toLocaleString(), updatedProduct})
    },
    patchProduct: async (req, res) => {

    },
    deleteProduct: async (req, res) => {
        
    }
}

export default Products
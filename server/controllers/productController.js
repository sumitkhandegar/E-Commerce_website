import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

// addProductController
export const addProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        // validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(500).send({
                success: false,
                message:"All fields required",
            });
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).send({
                success: false,
                message:"Photo size should be less than 1MB.",
            });
        }

        const products = new productModel({...req.fields, slug:slugify(name)});
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type

        }

        await products.save();
        res.status(201).send({
            success: true,
            message:"Product Created Successfully",
            products,
        });        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error,
        });
    }
};

// getProductController
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort(({createdAt: -1}));
        res.status(200).send({
            success: true,
            message: "All product List",
            TotalProducts: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while getting all product",
        error,
      });
    }
};

// getSingleProductController
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: "Get single product succeed",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while getting single product",
        error,
      });
    }
};

// get productPhotoController 
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while getting product photo",
        error,
      });
    }
};

// updateProductController
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(500).send({
                success: false,
                message: "All fields required",
            });
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).send({
                success: false,
                message: "Photo size should be less than 1MB.",
            });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating product",
            error,
        });
    }
};

// deleteProductController
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while deleting Product",
        error,
      });
    }
};

// SearchProductController
export const SearchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const result = await productModel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
  
      if (result.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'No products found',
        });
      }
  
      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log('SearchProductController error:', error);
      res.status(500).send({
        success: false,
        message: 'Server error',
        error,
      });
    }
  };
  

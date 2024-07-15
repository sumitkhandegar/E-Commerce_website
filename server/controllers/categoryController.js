import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// addCategoryController
export const addCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(401).send({
                message: "Name is required",
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exist",
            });
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "New Category Added",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create Category",
            error,
        });
    }
};

// updateCategoryController
export const updateCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
      res.status(200).send({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error updating category",
        error,
      });
    }
  };

// getCategoryController
export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while getting all category",
        error,
      });
    }
};

// getSIngleCategoryController
export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success: true,
            message: "Get single category succeed",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while getting single category",
        error,
      });
    }
};

// deleteCategoryController
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error while deleting category",
        error,
      });
    }
};
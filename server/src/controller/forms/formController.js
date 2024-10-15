
import mongoose from "mongoose";

// Higher-order function to create a generic controller for any Mongoose model
export const createCRUDController = (Model) => {
    return {
        getAll: async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1; 
                const limit = parseInt(req.query.limit) || 10; 
                const skip = (page - 1) * limit;
                const total = await Model.countDocuments();
                const models = await Model.find().skip(skip).limit(limit);

                return res.json({
                    total,
                    page,
                    totalPages: Math.ceil(total / limit),
                    models,
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ 
                    error: 'Server error.',
                    details: error 
                }); 
            }
        },

        update: async (req, res) => {
            try {
                const model = req.body.model;
                const { _id, ...updateData } = model;

                if (!model._id || !mongoose.Types.ObjectId.isValid(model._id)) {
                    return res.status(400).json({
                        error: "Invalid Parameters",
                        msg: "Something went wrong while processing the request. Invalid Id"
                    });
                }

                const updatedModel = await Model.findOneAndUpdate({ _id: model._id }, updateData, { new: true });
                return res.json(updatedModel);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ 
                    error: 'Server error.',
                    details: error 
                }); 
            }
        },

        create: async (req, res) => {
            try {
                const model = req.body.model;
                const toCreate = new Model(model);
                const error = toCreate.validateSync();

                if (error) {
                    return res.status(422).json(error);
                }

                await toCreate.save();
                return res.json(toCreate);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ 
                    error: 'Server error.',
                    details: error 
                }); 
            }
        },

        delete: async (req, res) => {
            try {
                const id = req.params.id;

                if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({
                        error: "Invalid Parameters",
                        msg: "Something went wrong while processing the request. Invalid Id"
                    });
                }

                await Model.deleteOne({ _id: id });
                return res.json();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ 
                    error: 'Server error.',
                    details: error 
                }); 
            }
        }
    };
};


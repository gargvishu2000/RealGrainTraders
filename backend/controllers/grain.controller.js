import Grain from '../models/grainModel.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

class GrainController {
    // Get all grains with filtering and pagination
    async getAllGrains(req, res) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                sort = '-createdAt',
                type,
                minPrice,
                maxPrice,
                status
            } = req.query;
            
            // Build filter object
            const filter = {};
            if (type) filter.type = type;
            if (status) filter.status = status;
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }
            
            // Count total documents for pagination
            const total = await Grain.countDocuments(filter);
            
            // Execute query with pagination
            const grains = await Grain.find(filter)
                .sort(sort)
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit));
                
            res.status(200).json({ 
                success: true, 
                grains, 
                pagination: {
                    total,
                    page: Number(page),
                    pages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Get a single grain by ID
    async getGrainById(req, res) {
        try {
            const grain = await Grain.findById(req.params.id);
            if (!grain) {
                return res.status(404).json({ success: false, message: 'Grain not found' });
            }
            res.status(200).json({ success: true, grain });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Create a new grain
    async createGrain(req, res) {
        try {
            const grainData = Object.assign({}, req.body);
            
            // Parse numeric values
            grainData.quantity = parseInt(grainData.quantity, 10);
            grainData.price = parseFloat(grainData.price);
            
            // Handle image uploads
            const image1 = req.files?.image1 && req.files.image1[0];
            const image2 = req.files?.image2 && req.files.image2[0];
            const image3 = req.files?.image3 && req.files.image3[0];
            const image4 = req.files?.image4 && req.files.image4[0];

            const images = [image1, image2, image3, image4].filter(item => item !== undefined);

            if (images.length === 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'At least one image is required' 
                });
            }

            // Upload images to cloudinary
            let imageUrls = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, { 
                        resource_type: 'image',
                        folder: 'grain-app/grains'
                    });
                    return result.secure_url;
                })
            );
            
            grainData.image = imageUrls;
            
            const newGrain = new Grain(grainData);
            await newGrain.save();
            
            res.status(201).json({
                success: true, 
                message: "Grain added successfully",
                grain: newGrain
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Update a grain
    async updateGrain(req, res) {
        try {
            const grainId = req.params.id;
            
            // Check if grain exists
            const existingGrain = await Grain.findById(grainId);
            if (!existingGrain) {
                return res.status(404).json({ success: false, message: 'Grain not found' });
            }
            
            const updateData = { ...req.body };
            
            // Handle numeric values
            if (updateData.quantity) updateData.quantity = parseInt(updateData.quantity, 10);
            if (updateData.price) updateData.price = parseFloat(updateData.price);
            
            // Handle image uploads if any
            if (req.files && Object.keys(req.files).length > 0) {
                const image1 = req.files?.image1 && req.files.image1[0];
                const image2 = req.files?.image2 && req.files.image2[0];
                const image3 = req.files?.image3 && req.files.image3[0];
                const image4 = req.files?.image4 && req.files.image4[0];
    
                const images = [image1, image2, image3, image4].filter(item => item !== undefined);
    
                if (images.length > 0) {
                    // Upload new images to cloudinary
                    const imageUrls = await Promise.all(
                        images.map(async (item) => {
                            const result = await cloudinary.uploader.upload(item.path, { 
                                resource_type: 'image',
                                folder: 'grain-app/grains'
                            });
                            return result.secure_url;
                        })
                    );
                    
                    updateData.image = imageUrls;
                }
            }
            
            // Update the grain
            const updatedGrain = await Grain.findByIdAndUpdate(
                grainId,
                updateData,
                { new: true, runValidators: true }
            );
            
            res.status(200).json({ 
                success: true, 
                message: 'Grain updated successfully',
                grain: updatedGrain
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Delete a grain
    async deleteGrain(req, res) {
        try {
            const grain = await Grain.findByIdAndDelete(req.params.id);
            
            if (!grain) {
                return res.status(404).json({ success: false, message: 'Grain not found' });
            }
            
            // TODO: Delete images from cloudinary
            
            res.status(200).json({ success: true, message: 'Grain deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    // Get all available grain types
    async getGrainTypes(req, res) {
        try {
            // Get distinct grain types from the database
            const types = await Grain.distinct('type');
            res.status(200).json({ success: true, types });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    // Search grains by name, type, or other criteria
    async searchGrains(req, res) {
        try {
            const { query, type, minPrice, maxPrice } = req.query;
            
            // Build search filter
            const filter = {};
            
            if (query) {
                filter.$or = [
                    { name: { $regex: query, $options: 'i' } },
                    { supplier: { $regex: query, $options: 'i' } },
                    { notes: { $regex: query, $options: 'i' } }
                ];
            }
            
            if (type) filter.type = type;
            
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }
            
            const grains = await Grain.find(filter)
                .sort('-createdAt')
                .limit(20);
                
            res.status(200).json({ 
                success: true, 
                count: grains.length,
                grains 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    // Add a review to a grain
    async addGrainReview(req, res) {
        try {
            const { rating, comment } = req.body;
            const grainId = req.params.id;
            const userId = req.body.userId;
            
            // Validate input
            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Rating must be between 1 and 5' 
                });
            }
            
            const grain = await Grain.findById(grainId);
            
            if (!grain) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Grain not found' 
                });
            }
            
            // Check if reviews array exists, if not create it
            if (!grain.reviews) {
                grain.reviews = [];
            }
            
            // Check if user already reviewed this grain
            const alreadyReviewed = grain.reviews.find(
                review => review.user.toString() === userId.toString()
            );
            
            if (alreadyReviewed) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'You have already reviewed this grain' 
                });
            }
            
            // Add review
            const review = {
                user: userId,
                rating: Number(rating),
                comment,
                createdAt: Date.now()
            };
            
            grain.reviews.push(review);
            
            // Update average rating
            grain.rating = grain.reviews.reduce((acc, item) => item.rating + acc, 0) / 
                           grain.reviews.length;
            
            await grain.save();
            
            res.status(201).json({ 
                success: true, 
                message: 'Review added successfully' 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default GrainController;
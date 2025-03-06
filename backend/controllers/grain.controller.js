import Grain from '../models/grainModel.js';
import { v2 as cloudinary } from 'cloudinary'
// TODO: Import Grain model once created

class GrainController {
    // Get all grains
    async getAllGrains(req, res) {
        try {
            const grains = await Grain.find({});
            res.status(200).json({ success: true, grains });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a single grain by ID
    async getGrainById(req, res) {
        try {
            const grain = await Grain.findById(req.params.id);
            if (!grain) {
                return res.status(404).json({ message: 'Grain not found' });
            }
            res.status(200).json(grain);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new grain
    async createGrain(req, res) {
        try {
            console.log("Hello");
            const grainData = Object.assign({}, req.body);
            grainData.quantity = parseInt(grainData.quantity, 10);
            grainData.price = parseFloat(grainData.price);
            
            const image1 = req.files.image1 && req.files.image1[0];
            const image2 = req.files.image2 && req.files.image2[0];
            const image3 = req.files.image3 && req.files.image3[0];
            const image4 = req.files.image4 && req.files.image4[0];

            const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

            let imageUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                    return result.secure_url;
                })
            )
            grainData.image = imageUrl;
            console.log(grainData);
            
            const newGrain = new Grain(grainData);
            const savedGrain = await newGrain.save();
            res.status(201).json({success: true, message: "Grain added successfully"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Update a grain
    async updateGrain(req, res) {
        try {
            const grain = await Grain.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!grain) {
                return res.status(404).json({ message: 'Grain not found' });
            }
            res.status(200).json(grain);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete a grain
    async deleteGrain(req, res) {
        try {
            console.log(req.params.id);
            
            const grain = await Grain.findByIdAndDelete(req.params.id);
            if (!grain) {
                return res.status(404).json({ message: 'Grain not found' });
            }
            res.status(200).json({ message: 'Grain deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default GrainController;
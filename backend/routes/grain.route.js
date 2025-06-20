// import express from "express";
// import GrainController from "../controllers/grain.controller.js";
// import upload from "../middlewares/upload.js";

// const grainRouter = express.Router();

// const grainController = new GrainController();

// grainRouter.post(
//     '/',
//     upload.fields([
//         { name: "image1", maxCount: 1 },
//         { name: "image2", maxCount: 1 },
//         { name: "image3", maxCount: 1 },
//         { name: "image4", maxCount: 1 }
//     ]),
//     grainController.createGrain
// );

// grainRouter.get('/', grainController.getAllGrains);
// grainRouter.get('/:id', grainController.getGrainById);
// grainRouter.put('/update', grainController.updateGrain);
// grainRouter.delete('/delete/:id', grainController.deleteGrain);


// export default grainRouter;


// -------------------------------------------------------------------
import express from "express";
import GrainController from "../controllers/grain.controller.js";
import upload from "../middlewares/upload.js";
import authUser from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";

const grainRouter = express.Router();
const grainController = new GrainController();

/**
 * @route   GET /api/grains
 * @desc    Get all grains with optional filtering and pagination
 * @access  Public
 */
grainRouter.get('/', grainController.getAllGrains);

/**
 * @route   GET /api/grains/:id
 * @desc    Get a single grain by ID
 * @access  Public
 */
grainRouter.get('/:id', grainController.getGrainById);

/**
 * @route   POST /api/grains
 * @desc    Create a new grain with images
 * @access  Admin only
 */
grainRouter.post(
    '/',
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    grainController.createGrain
);

/**
 * @route   PUT /api/grains/:id
 * @desc    Update a grain by ID
 * @access  Admin only
 */
grainRouter.put(
    '/:id',
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    grainController.updateGrain
);

/**
 * @route   DELETE /api/grains/:id
 * @desc    Delete a grain by ID
 * @access  Admin only
 */
grainRouter.delete('/:id', adminAuth, grainController.deleteGrain);

/**
 * @route   GET /api/grains/types
 * @desc    Get all available grain types
 * @access  Public
 */
grainRouter.get('/types', grainController.getGrainTypes);

/**
 * @route   GET /api/grains/search
 * @desc    Search grains by name, type, or other criteria
 * @access  Public
 */
grainRouter.get('/search', grainController.searchGrains);

/**
 * @route   POST /api/grains/:id/review
 * @desc    Add a review to a grain
 * @access  Authenticated users
 */
grainRouter.post('/:id/review', authUser, grainController.addGrainReview);

export default grainRouter;
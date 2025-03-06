import express from "express";
import GrainController from "../controllers/grain.controller.js";
import upload from "../middlewares/upload.js";

const grainRouter = express.Router();

const grainController = new GrainController();

grainRouter.post(
    '/',
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    grainController.createGrain
);

grainRouter.get('/', grainController.getAllGrains);
grainRouter.get('/:id', grainController.getGrainById);
grainRouter.put('/update', grainController.updateGrain);
grainRouter.delete('/delete/:id', grainController.deleteGrain);


export default grainRouter;
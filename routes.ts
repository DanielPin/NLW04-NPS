import {Router} from 'express';
import { UserController } from './src/controllers/UserController';
import { SurveysController } from './src/controllers/SurveysController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

export {router};
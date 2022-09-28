import authRouter from "./auth";
import express from 'express'

const routes = express.Router();

routes.use('/', authRouter);

export default routes;

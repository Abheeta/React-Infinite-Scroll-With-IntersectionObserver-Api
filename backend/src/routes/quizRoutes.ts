import getQuiz from "../controllers/questionsController";

const router = require("express").Router();

router.get("/getQuestion", getQuiz);

export default router;


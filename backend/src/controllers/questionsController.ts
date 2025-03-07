
import { Request, Response } from "express";
import City from "../models/City";

interface QueryParams{
    page?: string;
    pageSize?: string;
}

const getQuiz = async(req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<void> => {
    const page: number =  req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize: number = req.query.pageSize ? parseInt(req.query.pageSize as string): 10;

    const documents: number = await City.countDocuments().exec();
    const maxPageNumber: number = Math.ceil(documents / pageSize);
    console.log(maxPageNumber);

    if(page < 1 || page > maxPageNumber){
        res.status(400).json({ message: "Page number out of bounds", maxPageNumber });
    } else {
        try {
            const cities = await City.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
            res.json({cities, maxPageNumber});
        } catch(err){
            res.status(500).send(err);
        }
    }
}

export default getQuiz;
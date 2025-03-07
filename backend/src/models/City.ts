import mongoose, { Document } from "mongoose"

interface ICity extends Document{
    city: string;
    fun_fact: string[];
    country: string;
    clues: string[];
    trivia: string[];
    possible_destinations: string[];
}   

const citySchema = new mongoose.Schema<ICity>(
    {
        city: {type: String, required: true, unique:true},
        fun_fact: [String],
        country: {type: String, required: true},
        clues: [String],
        trivia: [String], 
        possible_destinations:[String]
    }
)

export default mongoose.model<ICity>("City", citySchema)
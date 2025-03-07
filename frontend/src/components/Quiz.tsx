import type React from "react";
import { useState, useEffect, useRef } from "react"


const Quiz: React.FC = () => {

    interface IQuestion{
        city?: string;
        country?: string;
        fun_fact?: string[];
        clues?: string[];
        possible_destinations?: string[];
    }
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [page, setPage] = useState(1);
    let [maxPageNumber, setMaxPageNumber] = useState<number>(0);
    const observer = useRef<IntersectionObserver | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/quiz/getQuestion?page=${page}`;
    const fetchData = async (url: string) => {
        try {
            setError(null);
            setLoading(true);
            return await fetch(url)
            .then(res => res.json())

        } catch (e: any){
            setError(e.message);


        } finally {
            setLoading(false);

        }
    } 


    useEffect(() => {
        
        fetchData(url).then((data) => {
            setQuestions(data.cities as IQuestion[])
            setMaxPageNumber(data.maxPageNumber);

        });
    }, [])

    const loadMoreQuestions = async() => {
        console.log(maxPageNumber, "MAX PAGE NUMBER AFTER ASSIGNMENT")

        if(page > maxPageNumber){
            return;
        } else {
        setPage((prev) => prev + 1);
        await fetchData(url).then((data) => {
            console.log(data.cities, data.maxPageNumber);
            setQuestions((prev) => [...prev, ...data.cities as IQuestion[]])});    
        }
    }

    const lastElementRef = (node: HTMLDivElement) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                loadMoreQuestions();
            }
        })

        if(node) observer.current.observe(node);
    }

   

    return(
        <>
            <div>
                {questions.map((question, index) => (
                    <div key={index} ref={index === questions.length - 1 ? lastElementRef : null}>
                        <p>{question.city}</p>
                        <p>{question.country}</p>
                        <p>{question.fun_fact}</p>
                        <p>{question.clues}</p>
                        <p>{question.possible_destinations}</p>
                    </div>
                ))}
            </div>
            {/* {page > maxPageNumber ? (
                <p>No more questions available!</p>
            ) : (
                <button onClick={loadMoreQuestions} > Load More
                </button>
            )} */}

        </>
    )
} 

export default Quiz;
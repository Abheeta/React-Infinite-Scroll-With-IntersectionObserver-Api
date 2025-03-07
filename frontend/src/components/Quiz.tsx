import type React from "react";
import { useState, useEffect, useRef } from "react";

const Quiz: React.FC = () => {
    interface IQuestion {
        city?: string;
        country?: string;
        fun_fact?: string[];
        clues?: string[];
        possible_destinations?: string[];
    }

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [page, setPage] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState<number>(0);
    const observer = useRef<IntersectionObserver | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const url: string = `${import.meta.env.VITE_BACKEND_URL}/quiz/getQuestion?page=${page}`;

    const fetchData = async (url: string) => {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch(url);
            return await response.json();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(url).then((data) => {
            setQuestions(data.cities as IQuestion[]);
            setMaxPageNumber(data.maxPageNumber);
        });
    }, []);

    const loadMoreQuestions = async () => {
        if (page >= maxPageNumber) return;

        setPage((prev) => prev + 1);
        await fetchData(url).then((data) => {
            setQuestions((prev) => [...prev, ...(data.cities as IQuestion[])]);
        });
    };

    const lastElementRef = (node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreQuestions();
                }
            },
            { root: scrollContainerRef.current, threshold: 1.0 }
        );

        if (node) observer.current.observe(node);
    };

    return (
        <div
            ref={scrollContainerRef}
            className="h-[700px] overflow-y-auto border border-gray-300 p-4"
        >
            {questions.map((question, index) => (
                <div key={index} ref={index === questions.length - 1 ? lastElementRef : null} className="p-2 border-b">
                    <p>City: {question.city}</p>
                    <p>Country: {question.country}</p>
                    <p>Fun Fact: {question.fun_fact?.join(", ")}</p>
                    <p>Clues: {question.clues?.join(", ")}</p>
                    <p>Possible Destinations: {question.possible_destinations?.join(", ")}</p>
                </div>
            ))}
            {loading && <p className="text-center mt-2">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Quiz;

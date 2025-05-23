import { createContext, useState, useEffect } from "react";
import run from "../config/echobot";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState(() => {
        const storedPrompts = localStorage.getItem("prevPrompts");
        return storedPrompts ? JSON.parse(storedPrompts) : [];
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState();
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem("userName") || "";
    });

    useEffect(() => {
        localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
    }, [prevPrompts]);

    useEffect(() => {
        if (!userName) {
            const name = prompt("Welcome! What's your name?");
            if (name) {
                setUserName(name);
            }
        } else {
            localStorage.setItem("userName", userName);
        }
    }, [userName]);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArr = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArr.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArr[i];
            } else {
                newResponse += "<b>" + responseArr[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br></br>");
        let newResponseArr = newResponse2.split(" ");
        for (let i = 0; i < newResponseArr.length; i++) {
            const nextWord = newResponseArr[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        userName,
        setUserName,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;

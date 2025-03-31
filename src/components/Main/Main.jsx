import React, { useContext } from 'react'
import user from '../../assets/user.jpeg'
import EchoBot from '../../assets/EchoBot.ico'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faMicrophone, faPaperPlane, faPenFancy, faAtom, faUsers, faListUl} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { FaSignOutAlt} from 'react-icons/fa';
import { Context } from '../../context/Context'
import Typical from 'react-typical';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

    const [greeting, setGreeting] = useState("Hello");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [showSecondLine, setShowSecondLine] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
          }
        };
    
        if (menuOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

  return (
    <div className='flex-1 min-h-[100vh] pb-[15vh] bg-gray-900 relative'>
        <div className="flex items-center justify-between p-3 text-gray-300 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md shadow-md">
            <p 
                className="text-2xl sm:text-3xl font-serif font-semibold tracking-wide cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{
                    background: "linear-gradient(16deg, #4b90ff, #ff5546)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                EchoBot
            </p>

            <div className="relative flex items-center gap-3">
                <p className="hidden sm:block text-sm text-gray-400">{greeting}, Muskan!</p>
                <img 
                    src={user} 
                    alt="User Avatar" 
                    className="w-10 sm:w-12 rounded-full border border-gray-700 shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                />

                {menuOpen && (
                    <div 
                        ref={menuRef} 
                        className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-3"
                        >
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-700 rounded text-red-400"><FaSignOutAlt /> Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        <div className='max-w-4xl m-auto'>
            {!showResult ? (
                <>
                    <div className="my-8 text-4xl sm:text-5xl font-medium p-5">
                        {/* First Line */}
                        <p
                            style={{
                            background: "-webkit-linear-gradient(16deg, #4b90ff, #ff5546)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            }}
                        >
                            <Typical steps={["Hello, Muskan!", 2000]} wrapper="span" />
                        </p>

                        {/* Second Line */}
                        <p className="text-gray-500">
                            <Typical steps={["How can I assist you today?", 2000]} wrapper="span" />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 text-gray-300">
                        {[
                            { text: "Generate creative content ideas for a blog", icon: faPenFancy },
                            { text: "Explain Quantum Computing in simple terms", icon: faAtom },
                            { text: "Suggest engaging icebreaker questions for meetings", icon: faUsers },
                            { text: "Convert this paragraph into bullet points", icon: faListUl }].map((item, index) => (
                            <button 
                                key={index} 
                                className="h-48 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-300 shadow-lg shadow-gray-900/30 active:scale-95 focus:ring-2 focus:ring-gray-500"
                                aria-label={item.text}
                            >
                                <p className="font-semibold text-sm md:text-base">{item.text}</p>
                                <FontAwesomeIcon 
                                    icon={item.icon} 
                                    size="xl" 
                                    className="p-2 absolute rounded-3xl bg-gray-600/50 backdrop-blur-sm bottom-2.5 right-2.5" 
                                />
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className='py-0 px-[5%] max-h-[70vh] overflow-y-scroll scroll-hidden'>

                    <div className='flex my-10 items-center gap-5'>
                        <img src={user} alt="" className='w-9 rounded-4xl'/>
                        <p className='text-gray-400 font-semibold bg-gray-800 px-4 py-2 rounded-lg break-words max-w-[80%] sm:max-w-[60%]'>{recentPrompt}</p>
                    </div>

                    <div className='flex items-start gap-5'>
                        <img src={EchoBot} alt="Bot Avatar" className='w-10 h-10 rounded-full border border-gray-600'/>
                        {loading ? (
                            <div className='w-full flex flex-col gap-3 fade-in'>
                                <hr className='rounded-md h-5 w-3/4 bg-gray-100 bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] animate-fadeIn'/>
                                <hr className='rounded-md h-5 w-2/3 bg-gray-100 bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] animate-fadeIn'/>
                                <hr className='rounded-md h-5 w-1/2 bg-gray-100 bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff]  animate-fadeIn'/>
                            </div>
                        ) : (
                            <p dangerouslySetInnerHTML={{ __html: resultData }} className='text-gray-300 bg-gray-700 px-4 py-2 rounded-lg break-words'></p>
                        )}
                    </div>
                </div>
            )}
             
                <div className="absolute bottom-0 w-full max-w-4xl px-5 m-auto">
                    <div className="flex items-center justify-between gap-3 sm:gap-5 bg-gray-800/90 backdrop-blur-md border border-gray-700 py-3 px-5 rounded-3xl shadow-md shadow-gray-900/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-500">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder="Ask anything..." 
                            className="flex-1 bg-transparent border-none outline-none p-3 text-sm sm:text-lg md:text-base text-gray-300 placeholder-gray-500 w-38 transition-all duration-200 focus:ring-0 focus:outline-none"
                        />

                        <div className="flex items-center gap-3 sm:gap-4">
                            <FontAwesomeIcon icon={faImages} className="cursor-pointer text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors duration-200" />
                            <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors duration-200" />
                            {input && (
                                <FontAwesomeIcon 
                                    icon={faPaperPlane} 
                                    className="cursor-pointer text-xl sm:text-2xl text-blue-500 hover:text-blue-400 transition-colors duration-200" 
                                    onClick={() => onSent()} 
                                />
                            )}
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm my-4 mx-auto text-center font-light text-gray-400">
                        EchoBot may display inaccurate information, so double-check its responses.
                    </p>
                </div>

        </div>
    </div>
  )
}

export default Main
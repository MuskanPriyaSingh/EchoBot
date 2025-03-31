import { faBars, faBarsStaggered, faCog, faHistory, faPlus, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className='hidden min-h-[100vh] sm:inline-flex flex-col justify-between bg-gray-800 py-6 px-5'>
            <div>
                <FontAwesomeIcon 
                    icon={faBars} 
                    color='slategray' 
                    className='block cursor-pointer rounded-2xl p-2 hover:bg-gray-700' 
                    onClick={() => setExtended(!extended)} 
                />

                <div 
                    onClick={() => newChat()} 
                    className={`mt-[50px] flex items-center gap-[10px] 
                        ${extended ? "w-32 p-2 rounded-4xl" : "w-8 p-2 rounded-2xl"} 
                        bg-neutral-900 text-[14px] text-gray-500 cursor-pointer`}
                >
                    <FontAwesomeIcon icon={faPlus} color='slategray' size='lg' />
                    {extended && <p className='font-bold'>New chat</p>}
                </div>

                {extended && (
                    <div className='flex flex-col fade-animation'>
                        <p className='mt-[30px] mb-[15px] text-white'>History</p>
                        {prevPrompts.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadPrompt(item)} 
                                className='flex items-center gap-4 p-3 text-[14px] text-gray-400 rounded-4xl cursor-pointer hover:bg-gray-700'
                            >
                                <FontAwesomeIcon icon={faBarsStaggered} color='slategray' />
                                <p>{item.slice(0, 28)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <div className='flex items-center gap-3 mb-3 p-2 rounded-4xl cursor-pointer hover:bg-gray-700'> 
                    <FontAwesomeIcon icon={faQuestion} color='slategray' />
                    {extended && <p className='text-gray-400'>Help</p>}
                </div>
                <div className='flex items-center gap-3 mb-3 p-2 rounded-4xl cursor-pointer hover:bg-gray-700'>
                    <FontAwesomeIcon icon={faHistory} color='slategray' />
                    {extended && <p className='text-gray-400'>Activity</p>}
                </div>
                <div className='flex items-center gap-3 mb-3 p-2 rounded-4xl cursor-pointer hover:bg-gray-700'>
                    <FontAwesomeIcon icon={faCog} color='slategray' />
                    {extended && <p className='text-gray-400'>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

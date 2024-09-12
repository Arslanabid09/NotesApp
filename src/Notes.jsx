import React, { useEffect, useState } from 'react';

const Notes = () => {
    const [input, setInput] = useState('');
    const [notes, setNotes] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // For editing a specific note
    const [showActions, setShowActions] = useState(null); // To track which note actions are visible

    const addNote = () => {
        let newNotes;
        if (editIndex !== null) {
            // If editing, replace the note at the editIndex
            newNotes = notes.map((note, index) => (index === editIndex ? input : note));
            setEditIndex(null); // Reset editIndex after editing
        } else {
            // Otherwise, add a new note
            newNotes = [...notes, input];
        }

        localStorage.setItem('notes', JSON.stringify(newNotes));
        setNotes(newNotes);
        setInput('');
    };

    const handleDelete = (index) => {
        const filteredNotes = notes.filter((_, i) => i !== index);
        localStorage.setItem('notes', JSON.stringify(filteredNotes));
        setNotes(filteredNotes);
    };

    const handleEdit = (index) => {
        setInput(notes[index]);
        setEditIndex(index); // Set the index to be edited
        setShowActions(null); // Hide actions after starting the edit
    };

    useEffect(() => {
        let getNotes = JSON.parse(localStorage.getItem('notes'));
        if (getNotes) {
            setNotes(getNotes);
        }
    }, []);

    return (
        <div className='h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center'>
            <div className='flex py-5 w-2/4'>
                <textarea
                    className='w-full font-semibold border-b-2 py-2 px-5 rounded-s-md outline-none border-gray-300 focus:border-blue-500 transition duration-300 resize-none'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Add a note...'
                />
                <button onClick={addNote} className='bg-blue-600 hover:bg-blue-700 px-6 py-4 font-bold rounded-e-md text-white transition duration-300'>
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>

            {/* Notes container */}
            <div className='bg-white w-2/4 p-8 h-96 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-red-900'>
                {/* Notes Display Area */}
                <div className='bg-gray-200 p-5 mt-5 rounded-xl'>
                    <h3 className='text-lg font-bold mb-3 text-gray-700'>Your Notes</h3>
                    {notes.map((note, index) => (
                        <div key={index} className='bg-gray-700 mt-4 break-words text-white flex justify-between items-center font-semibold px-6 py-3 w-full min-h-16 rounded-xl'>
                            <span>{note}</span>

                            {/* Action Menu (Click to Show) */}
                            <div className='relative '>
                                <div
                                    className='cursor-pointer px-6 font-bold text-xl  bg-blue-600 text-white rounded hover:bg-blue-700'
                                    onClick={() => setShowActions(showActions === index ? null : index)}
                                >
                                    ...
                                </div>

                                {/* Show buttons on click */}
                                {showActions === index && (
                                    <div className='absolute right-0 mt-2 p-2 bg-gray-300 rounded shadow-lg flex flex-col space-y-2 z-20'>
                                        <button
                                            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notes;

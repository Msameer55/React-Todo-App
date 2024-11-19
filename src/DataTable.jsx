import React, { useState } from 'react'

const DataTable = () => {
    const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(firstIndex, lastIndex);
    console.log(filteredData);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddButton = () => {
        const {name, age, gender} = formData;
        if (name === "" || age === "" || gender === "") {
           alert("Fields can not be empty")
        } else {
            let newData = {
                id: Math.floor(Math.random() * 100) + 1,
                name: formData.name,
                gender: formData.gender,
                age: formData.age
            }
            setData([...data, newData])
            setFormData({ name: "", gender: "", age: "" })

            console.log(data);
        }
    }

    const handleDelete = (id) => {
        let updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    }

    const handleEditStart = (item) => {
        setEditItem(item);
    }


    const handleEditChange = (e) => {
        setEditItem({ ...editItem, [e.target.name]: [e.target.value] })
    }

    const handleEditSave = (id) => {
        let updatedData = data.map((item) => {
            return item.id === id ? editItem : item
        })
        setData(updatedData);
        setEditItem(null);
    }


    return (
        <div className="main-container">
            <div className="inner-container">
                <div className="todo-container">
                    <div className="todo-inner d-flex">
                        <div className="input">
                            <input type="text"
                                name='name'
                                placeholder='Name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <input type="text"
                                name='gender'
                                value={formData.gender}
                                placeholder='Gender'
                                onChange={handleInputChange}
                            />
                            <input type="text"
                                name='age'
                                value={formData.age}
                                placeholder='Age'
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleAddButton}>Add</button>
                    </div>

                </div>
                <div className="search-container">
                    <input type="text" placeholder='Search by name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="todo-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((item) => {
                                    return (
                                        <>
                                            <tr key={item.id}>
                                                {editItem && editItem.id === item.id ? (
                                                    <>
                                                        <td id={editItem.id} >
                                                            <input type="text" name='name' value={editItem.name} onChange={handleEditChange} />
                                                        </td>
                                                        <td id={editItem.id} >
                                                            <input type="text" name='gender' value={editItem.gender} onChange={handleEditChange} />
                                                        </td>
                                                        <td id={editItem.id} >
                                                            <input type="text" name='age' value={editItem.age} onChange={handleEditChange} />
                                                        </td>
                                                        <td id={editItem.id}>
                                                            <button className='edit' onClick={() => handleEditSave(editItem.id)}>Save</button>
                                                            <button className='delete' onClick={() => setEditItem(null)}>Cancel</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td id={item.id} >{item.name}</td>
                                                        <td id={item.id} >{item.gender}</td>
                                                        <td id={item.id} >{item.age}</td>
                                                        <td id={item.id}>
                                                            <button className='edit' onClick={() => handleEditStart(item)}>Edit</button>
                                                            <button className='delete' onClick={() => { handleDelete(item.id) }}>Delete</button>
                                                        </td>
                                                    </>
                                                )
                                                }

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <div className='pagination'>
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default DataTable
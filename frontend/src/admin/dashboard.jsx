import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
export default function dashboard() {
    const [portfolios, setPortfolios] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/backend/server.php')
            .then(data => data.json())
            .then(json => setPortfolios(json))
    }, [])
    const [message, setMessage] = useState('');
    function handleDelete(event) {
        fetch(`http://localhost:8000/backend/server.php?id=${event}`, {
            method: 'DELETE',
            body: JSON.stringify({ id: event }) // Mengirim ID data yang akan dihapus
        })
            .then(response => response.text())
            .then(data => {
                setMessage(data);
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });
    }

    let getData = portfolios.map((data, id) => (
        <tr key={id} className='border-[1px] border-black p-[8px]'>
            <td className='border-[1px] border-black p-[8px]'>{data.name_project}</td>
            <td className='border-[1px] border-black p-[8px]'>{data.information_project}</td>
            <td>
                <button className='mr-4'>Update</button>
                <button onClick={() => handleDelete(data.id_project)}>Delete</button>
            </td>
        </tr>
    ))

    return (
        <section className="w-full h-screen p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 overflow-y-scroll">
            <button><Link to='/portfolios'>Add</Link></button>
            <table className='border-collapse w-full'>
                <thead>
                    <tr>
                        <th className='font-bold border-[1px] border-black p-[8px]'>Nama Project</th>
                        <th className='font-bold border-[1px] border-black p-[8px]'>Deskripsi Project</th>
                        <th className='font-bold border-[1px] border-black p-[8px]'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {getData}
                </tbody>
            </table>
        </section>
    )
}


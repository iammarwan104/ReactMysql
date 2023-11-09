import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import { Navigate } from "react-router-dom";
export default function portfolios() {
    const [namePortfolio, setNamePortfolio] = useState('')
    const [informationPortfolio, setInformationPortfolio] = useState('')
    const [responseMessage, setResponseMessage] = useState('')

    const [nama_project, setNamaProject] = useState('');
    const [informasi_project, setInformasiProject] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name_project', namePortfolio);
        formData.append('information_project', informationPortfolio);
        // formData.append('img1_project', img1_project);

        fetch('http://localhost:8000/backend/server.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                <Navigate to="/" />
                response.json()
            })
            .then((data) => {
                setResponseMessage(data);
                alert(responseMessage)
            })
            .catch((error) => {
                setResponseMessage('Terjadi kesalahan: ' + error);
            });
    };

    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 50,
        height: 50,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'inline-block',
        width: 'auto',
        height: '100%'
    };


    function Previews(props) {
        const [files, setFiles] = useState([]);
        const { getRootProps, getInputProps } = useDropzone({
            accept: {
                'image/*': []
            },
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            }
        });

        const thumbs = files.map(file => (
            <div className="h-40 mx-auto" key={file.name}>
                <div className="h-full">
                    <img
                        src={file.preview}
                        className="h-full"
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                </div>
            </div>
        ));

        useEffect(() => {
            // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }, []);

        return (
            <section className="container h-fit text-center">
                <aside className="flex flex-col items-center"  >
                    {thumbs}
                </aside>
                <div {...getRootProps({ className: 'dropzone' })} >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <p>PNG, JPG, GIF up to 10MB</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full h-screen p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 overflow-y-scroll">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">Portfolios</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="nama-lengkap">Nama lengkap</label>
                        <input id="nama-lengkap" name="nama_project" type="text" placeholder="Setia Budiman" onChange={e => setNamePortfolio(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Keterangan</label>
                        <textarea id="textarea" name="informasi_project" type="textarea" onChange={e => setInformationPortfolio(e.target.value)} placeholder="Seorang Android developer yang telah berpengalaman dalam Android programming dari tahun 2017 dan saat ini telah bekerja sebagai professional Software Engineer for  Android di PT. XL Axiata Tbk untuk mengembangkan salah satu produk dari XL Axiata." className="block w-full h-36 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                    </div>
                    <div className="flex gap-4 col-span-2">
                        <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed h-fit rounded-md">
                            <Previews />
                        </div>
                        <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed h-fit rounded-md">
                            <Previews />
                        </div>
                        <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed h-fit rounded-md">
                            <Previews />
                        </div>
                        <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed h-fit rounded-md">
                            <Previews />
                        </div>
                    </div>
                    <div className="flex col-span-2 justify-end mt-6">
                        <button type="submit" className="px-6 py-2 mx-auto leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </div>
            </form>
        </section >
    )
}
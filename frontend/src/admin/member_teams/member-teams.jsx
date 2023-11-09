import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';

export default function memberTeams() {
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
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
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
            <div className="h-52 mx-auto" key={file.name}>
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
            <section className="container text-center">
                <aside style={thumbsContainer} >
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
        <section className="w-3/4 h-screen p-6 bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 overflow-y-scroll">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">Member Teams</h1>
            <form className="w-full">
                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="nama-lengkap">Nama lengkap</label>
                        <input id="nama-lengkap" type="text" placeholder="Setia Budiman" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="pekerjaan">Pekerjaan</label>
                        <select id="pekerjaan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">Software Engeneer</option>
                            <option value="CA">Android Developer</option>
                            <option value="FR">Web Developer</option>
                            <option value="DE">Back End Web Developer</option>
                            <option value="DE">Front End Web Developer</option>
                            <option value="DE">Fullstack Developer</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" type="email" placeholder="budiman29@gmail.com" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="facebook">Facebook</label>
                        <input id="facebook" type="text" placeholder="Setia Budiman" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="instagram">Instagram</label>
                        <input id="instagram" type="text" placeholder="@_budian_10" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="no-whatsapp">Whatsapp</label>
                        <input id="no-whatsapp" type="number" placeholder="082347824914" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Keterangan</label>
                        <textarea id="textarea" type="textarea" placeholder="Seorang Android developer yang telah berpengalaman dalam Android programming dari tahun 2017 dan saat ini telah bekerja sebagai professional Software Engineer for  Android di PT. XL Axiata Tbk untuk mengembangkan salah satu produk dari XL Axiata." className="block w-full h-36 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">
                            Image
                        </label>
                        <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <Previews />
                        </div>
                    </div>

                    <div className="flex justify-center col-span-2 mt-4">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </div>
            </form>
        </section >
    )
}
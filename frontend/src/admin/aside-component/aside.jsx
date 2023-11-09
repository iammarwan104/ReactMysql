import { Link } from "react-router-dom"
import logoMakkode from '../../assets/Logo Makkode 1.png'
export default function aside() {
    return (
        <aside className="bg-slate-500 rounded-lg flex flex-col h-screen w-1/4 px-8" >
            <Link className="flex gap-2 items-center  text-white py-4 text-2xl font-bold hover:text-white" to='/'><img src={logoMakkode} alt="Logo Makkode" className="w-12" /> <span>Makkode</span></Link>
            <Link className="text-white block rounded-lg p-2 text-lg active:bg-blue-500 hover:bg-blue-400 hover:text-white" to='/portfolios'>Add Portfolio</Link>
            <Link className="text-white block rounded-lg p-2 text-lg active:bg-blue-500 hover:bg-blue-400 hover:text-white" to='/member-teams'>Add Member Teams</Link>
        </aside>
    )
}
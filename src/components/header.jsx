import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header className="w-full h-[80px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="/logo.png" className="h-full w-[160px] absolute left-[0px] object-cover"/>
                <div className="h-full flex justify-center items-center w-full text-lg gap-[50px]">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>

                </div>
            


            </div>
        </header>
    )
}
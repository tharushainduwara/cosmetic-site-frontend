export default function Header(){
    return(
        <header className="w-full h-[80px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="/logo.png" className="h-full w-[160px] absolute left-[0px] object-cover"/>
                <div className="h-full flex justify-center items-center w-full text-lg gap-[50px]">
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>

                </div>
            


            </div>
        </header>
    )
}
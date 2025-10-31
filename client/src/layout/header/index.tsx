import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons for menu toggle

type HeaderProps = {
    cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const image1 = "/Baghublogo.png";

    return (
        <header className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">

                <div className="flex items-center space-x-3">
                    <a href="/">
                        <span className="sr-only">Baghub</span>
                        <img src={image1} alt="Baghub logo" className="h-10 w-auto" />
                    </a>
                    <a
                        href="#about"
                        className="hidden md:inline-block font-bold text-gray-800 hover:text-gray-500 px-3 py-2 text-sm transition"
                    >
                        About
                    </a>
                </div>


                <div className="hidden md:flex space-x-4 items-center">
                    <form>
                        <input className="outline-1 outline-solid rounded-sm p-1 font-bold" type="text" placeholder="Seach" />
                        <button className="ml-2 p-1 outline-1 font-bold rounded-sm">Search</button>
                    </form>

                    <div className="relative">
                        <a
                            href="#cart"
                            className="text-gray-800 hover:text-gray-500 text-sm font-bold transition"
                        >
                            Cart
                        </a>
                        <span className="badge bg-black-900 text-black ms-1 rounded-pill">{cartCount}</span>
                    </div>

                   
                    <div className="flex space-x-2">
                        <button className="font-bold text-sm text-gray-800 hover:text-gray-500">
                            Login
                        </button>
                        <button className="font-bold text-sm text-gray-800 hover:text-gray-500">
                            Sign Up
                        </button>
                    </div>
                </div>

               
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

          
            {isOpen && (
                <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3 space-y-3 shadow-md">
                    <a
                        href="#about"
                        className="block text-gray-800 font-medium hover:text-gray-500"
                    >
                        About
                    </a>
                    <a
                        href="#cart"
                        className="block text-gray-800 font-medium hover:text-gray-500"
                    >
                        Cart ({cartCount})
                    </a>
                    <form className="flex items-center space-x-2">
                        <input
                            className="border border-gray-400 rounded-sm p-1 text-sm flex-1"
                            type="text"
                            placeholder="Search"
                        />
                        <button className="p-1 outline-1 font-bold text-sm  rounded-sm">
                            Search
                        </button>
                    </form>
                    <div className="flex space-x-2 pt-2">
                        <button className="font-bold text-sm text-gray-800 hover:text-gray-500">
                            Login
                        </button>
                        <button className="font-bold text-sm text-gray-800 hover:text-gray-500">
                            Sign Up
                        </button>
                    </div>
                </div>
                
            )}
        </header>
    );
}

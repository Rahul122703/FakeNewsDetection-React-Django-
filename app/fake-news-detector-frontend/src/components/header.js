import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <Link 
                    to="/" 
                    className="flex items-center space-x-2 no-underline hover:scale-105 transition-transform duration-300"
                    style={{ textDecoration: "none" }}
                >
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" className="h-10" />
                    <span className="font-bold text-xl text-gray-900 tracking-wide">
                        FakeNewsMiniProject
                    </span>
                </Link>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-700 text-2xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✖" : "☰"}
                </button>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link 
                        to="/checkbyimage" 
                        className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-105 ${
                            activeContainer === 3 ? "bg-gray-300 text-gray-900 shadow-md" : "text-gray-700"
                        }`}
                        style={{ textDecoration: "none" }}
                    >
                        Check News By Image
                    </Link>
                    <Link 
                        to="/checkbytitle" 
                        className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-105 ${
                            activeContainer === 2 ? "bg-gray-300 text-gray-900 shadow-md" : "text-gray-700"
                        }`}
                        style={{ textDecoration: "none" }}
                    >
                        Check News By Title
                    </Link>
                </nav>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2 transition-all duration-300">
                    <Link 
                        to="/checkbyimage" 
                        className={`block w-full px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-105 ${
                            activeContainer === 3 ? "bg-gray-300 text-gray-900 shadow-md" : "text-gray-700"
                        }`}
                        style={{ textDecoration: "none" }}
                    >
                        Check News By Image
                    </Link>
                    <Link 
                        to="/checkbytitle" 
                        className={`block w-full px-4 py-2 text-sm font-semibold tracking-wide uppercase rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-105 ${
                            activeContainer === 2 ? "bg-gray-300 text-gray-900 shadow-md" : "text-gray-700"
                        }`}
                        style={{ textDecoration: "none" }}
                    >
                        Check News By Title
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;

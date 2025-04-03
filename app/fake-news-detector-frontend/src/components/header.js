import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" className="h-10" />
                    <span className="font-bold text-xl text-gray-900 tracking-wide">FakeNewsMiniProject</span>
                </Link>

                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✖" : "☰"}
                </button>

                <nav className={`md:flex items-center space-x-6 ${isOpen ? "block" : "hidden"} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 shadow-md md:shadow-none`}>
                    {/* <select 
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-transform hover:scale-105"
                        onChange={(e) => window.location.href = e.target.value}
                    >
                        <option value="" disabled>News Categories</option>
                        {[
                            { path: "/category/sport", label: "Sport" },
                            { path: "/category/world", label: "World" },
                            { path: "/category/society", label: "Society" },
                            { path: "/category/books", label: "Books" },
                            { path: "/category/lifeandstyle", label: "Life & Style" },
                            { path: "/category/artanddesign", label: "Art & Design" },
                            { path: "/category/usnews", label: "US News" },
                            { path: "/category/commentisfree", label: "Comment Is Free" },
                            { path: "/category/fashion", label: "Fashion" },
                            { path: "/category/news", label: "News" },
                            { path: "/category/education", label: "Education" },
                            { path: "/category/politics", label: "Politics" },
                            { path: "/category/tvandradio", label: "TV & Radio" },
                            { path: "/category/business", label: "Business" },
                            { path: "/category/uknews", label: "UK News" },
                            { path: "/category/environment", label: "Environment" },
                            { path: "/category/football", label: "Football" },
                        ].map((item, index) => (
                            <option key={index} value={item.path}>{item.label}</option>
                        ))}
                    </select> */}
                    <Link 
                        to="/checkbyimage" 
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition hover:bg-gray-100 ${activeContainer === 3 ? "bg-gray-200 text-gray-900" : "text-gray-700"}`}
                    >
                        Check News By Image
                    </Link>
                    <Link 
                        to="/checkbytitle" 
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition hover:bg-gray-100 ${activeContainer === 2 ? "bg-gray-200 text-gray-900" : "text-gray-700"}`}
                    >
                        Check News By Title
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;

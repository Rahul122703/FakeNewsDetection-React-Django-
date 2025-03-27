import React from "react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="h-8" />
                    <span className="font-semibold text-gray-900 text-lg">News</span>
                    <span className="text-gray-500 text-lg">Guardian</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {/* Category Dropdown */}
                    <select 
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 outline-none"
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
                    </select>

                    {/* Links */}
                    <Link 
                        to="/checkbytitle" 
                        className={`px-3 py-2 text-sm font-medium transition ${activeContainer === 2 ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"}`}
                    >
                        Check News By Title
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;

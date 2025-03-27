import React from "react";
import { Link } from "react-router-dom";

function Header({ activeContainer }) {
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="h-7" />
                    <span className="font-semibold text-blue-700">News</span>
                    <span className="text-blue-400">Guardian</span>
                </Link>
                
                <nav className="hidden md:flex space-x-6">
                    <div className="relative group">
                        <button className="text-gray-700 font-medium focus:outline-none">News Categories</button>
                        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            {[
                                { path: "/category/sport", label: "Sport" },
                                { path: "/category/world", label: "World" },
                                { path: "/category/society", label: "Society" },
                                { path: "/category/books", label: "Books" },
                                { path: "/category/lifeandstyle", label: "Life and Style" },
                                { path: "/category/artanddesign", label: "Art and Design" },
                                { path: "/category/usnews", label: "US News" },
                                { path: "/category/commentisfree", label: "Comment Is Free" },
                                { path: "/category/fashion", label: "Fashion" },
                                { path: "/category/news", label: "News" },
                                { path: "/category/education", label: "Education" },
                                { path: "/category/politics", label: "Politics" },
                                { path: "/category/tvandradio", label: "TV and Radio" },
                                { path: "/category/business", label: "Business" },
                                { path: "/category/uknews", label: "UK News" },
                                { path: "/category/environment", label: "Environment" },
                                { path: "/category/football", label: "Football" },
                            ].map((item, index) => (
                                <Link key={index} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                    
                    <Link to="/checkbytitle" className={activeContainer === 2 ? "text-blue-500 font-semibold" : "text-gray-700"}>Check News By Title</Link>
                    <Link to="/newsquiz" className={activeContainer === 3 ? "text-blue-500 font-semibold" : "text-gray-700"}>News Quiz</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
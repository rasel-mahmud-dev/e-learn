function TopicSearch() {
    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">JavaScript Courses</h1>
                <p className="text-gray-600">JavaScript relates to <span className="font-bold">Development, IT & Software</span>
                </p>
                <p className="text-gray-600"><i className="fas fa-users"></i> 16,746,775 learners</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Courses to get you started</h2>
                <p className="text-gray-600">Explore courses from experienced, real-world experts.</p>
            </div>

            <div className="tabs mb-6">
                <a className="tab tab-bordered tab-active">Most popular</a>
                <a className="tab tab-bordered">New</a>
                <a className="tab tab-bordered">Beginner Favorites</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                    <figure className="px-10 pt-10">
                        <img src="https://via.placeholder.com/400x200" alt="JavaScript Course" className="rounded-xl"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">The Complete JavaScript Course 2024: From Zero to Expert!</h2>
                        <p className="text-gray-600">Jonas Schmedtmann</p>
                        <p className="text-gray-800 font-bold">$74.99</p>
                        <div className="badge badge-primary">Bestseller</div>
                        <p className="mt-2">Rating: 4.7 (208,803)</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TopicSearch

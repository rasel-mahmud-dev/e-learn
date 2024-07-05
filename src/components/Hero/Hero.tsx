
const Hero = () => {
    return (
        <section className="bg-base-200 py-20">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-5xl font-bold">
                        Get <span className="text-primary">2500+</span> <br />
                        Best Online Courses <br />
                        From EduBlink
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.
                    </p>
                    <button className="btn btn-primary mt-6">Find courses ➜</button>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative">
                        <img src="https://demo.edublink.co/wp-content/uploads/2023/05/girl-1.webp" alt="Student" className="w-full h-auto" />
                        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
                            <div className="avatar-group -space-x-4">
                                <div className="avatar">
                                    <div className="w-10">
                                        <img src="https://demo.edublink.co/wp-content/uploads/2023/05/girl-1.webp" alt="Instructor 1" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-10">
                                        <img src="https://via.placeholder.com/40" alt="Instructor 2" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-10">
                                        <img src="https://demo.edublink.co/wp-content/uploads/2023/05/girl-1.webp" alt="Instructor 3" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-10">
                                        <img src="https://via.placeholder.com/40" alt="Instructor 4" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold">200+</span> <br /> Instructors
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
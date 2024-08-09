import fs from 'fs';

function loadTopicsFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').map(topic => topic.trim().toLowerCase()).filter(topic => topic.length > 0);
}

// Define the mappings for categories and sub-categories
const categoryMappings = {
    "web-development": "development",
    "programming-languages": "development",
    "data-science": "development",
    "mobile-apps": "development",
    "game-development": "development",
    "development-tools": "development",
    "software-testing": "development",
    "software-engineering": "development",
    "databases": "development",
    "language": "language"
};

const subCategoryMappings = {
    "html": "web-development",
    "css": "web-development",
    "javascript": "web-development",
    "react-js": "web-development",
    "node-js": "web-development",
    "mongodb": "databases",
    "php": "web-development",
    "machine-learning": "data-science",
    "python": "data-science",
    "deep-learning": "data-science",
    "artificial-intelligence-ai": "data-science",
    "generative-ai-genai": "data-science",
    "langchain": "data-science",
    "natural-language-processing-nlp": "data-science",
    "data-analysis": "data-science",
    "english-grammar": "language",
    "english-speaking": "language",
    "english-listening": "language",
    "web3": "web-development",
    "express-js": "web-development",
    "graphql": "web-development",
    "ethereum-js": "web-development",
    "smart-contracts": "web-development",
    "blockchain": "web-development",
    "dapp-development": "web-development"
};

function extractTopics(title, description, topics) {
    const combinedText = `${title} ${description}`.toLowerCase();
    const matchedTopics = new Set(); // Using Set to avoid duplicates

    topics.forEach(topic => {
        if (combinedText.includes(topic.toLowerCase())) {
            matchedTopics.add(topic);
        }
    });

    const delimiters = /\s+|,|\./; // Adjust delimiters as needed
    combinedText.split(delimiters).forEach(word => {
        const lowerCaseWord = word.trim().toLowerCase();

        let index = topics.indexOf(lowerCaseWord)
        if (lowerCaseWord && index !== -1) {
            matchedTopics.add(topics[index]);
        }
    });

    return Array.from(matchedTopics);
}
// Function to get course details
function getCourseDetails(course, topics) {
    const { title, description } = course;
    const topicsFound = extractTopics(title, description, topics);
    const subCategories = topicsFound.map(topic => subCategoryMappings[topic] || "web-development");
    const categories = subCategories.map(subCategory => categoryMappings[subCategory] || "development");

    return {
        title,
        duration: course.duration,
        description,
        numLectures: course.numLectures,
        level: course.level,
        img: course.img,
        price: course.price,
        categories: [...new Set(categories)],
        sub_categories: [...new Set(subCategories)],
        topics: [...new Set(topicsFound)]
    };
}

// Load topics from file
const topics = loadTopicsFromFile('topics.txt');

// Example course object
const course = {
    title: "The Web Developer Bootcamp 2024",
    duration: "74 total hours",
    description: "10 Hours of React just added. Become a Developer With ONE course - HTML, web3, CSS, JavaScript, React, Node, MongoDB and More!",
    numLectures: "729 lectures",
    level: "All Levels",
    img: "https://img-b.udemycdn.com/course/240x135/625204_436a_3.jpg",
    price: "Current price: $74.99"
};

// Get the course details
const courseDetails = getCourseDetails(course, topics);
console.log(courseDetails);

/* 
========================================
   SYNTAX SPHERE - MOCK DATA
   Contains Courses, Categories, and Testimonials
========================================
*/

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    instructor: "Code Academy Team",
    price: "৳ 5000",
    originalPrice: "৳ 8000",
    rating: 4.8,
    students: 1200,
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoId: "Q33KBiDriJY", // Codecademy: What is Coding?
    description:
      "Master HTML, CSS, JavaScript, and React to build professional web applications from scratch.",
    features: [
      "200+ Pre-recorded Videos",
      "10 Real-world Projects",
      "Certificate of Completion",
      "24/7 Support",
    ],
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Dr. Angela Yu",
    price: "৳ 4500",
    originalPrice: "৳ 7000",
    rating: 4.9,
    students: 950,
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoId: "8j0UDiN7my4", // Codecademy: Learn Python
    description:
      "Learn Python from the ground up and apply it to real-world data science problems.",
    features: [
      "Python Masterclass",
      "Data Visualization",
      "Machine Learning Basics",
      "Live Q&A Sessions",
    ],
  },
  {
    id: 3,
    title: "Java Masterclass",
    instructor: "Tim Buchalka",
    price: "৳ 4000",
    originalPrice: "৳ 6500",
    rating: 4.7,
    students: 800,
    category: "Software Engineering",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoId: "tN6oJu2DqCM", // Codecademy: Learn SQL (Placeholder for generic tech)
    description:
      "Deep dive into Java programming. Covers Core Java, OOP, Collections, and Multi-threading.",
    features: [
      "In-depth Java Concepts",
      "Object-Oriented Programming",
      "Interview Preparation",
      "Source Code Included",
    ],
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Gary Simon",
    price: "৳ 3500",
    originalPrice: "৳ 5000",
    rating: 4.6,
    students: 1500,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoId: "F18K9q5D_mg", // Generic placeholder
    description:
      "Learn the art of User User Interface and User Experience design using Figma and Adobe XD.",
    features: [
      "Figma Mastery",
      "Design Systems",
      "Prototyping",
      "Portfolio Review",
    ],
  },
  {
        id: 5,
        title: "React JS Full Course",
        instructor: "Dave Gray",
        price: "৳ 5500",
        originalPrice: "৳ 8500",
        rating: 4.8,
        students: 2100,
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        videoId: "RVFAyFWO4go", 
        description: "A complete all-in-one tutorial for React.js. Learn hooks, state management, and build real-world apps.",
        features: [
            "React Hooks (useState, useEffect)",
            "Functional Components",
            "React Router",
            "State Management"
        ]
    },
    {
        id: 6,
        title: "C++ Programming: Beginner to Advanced",
        instructor: "freeCodeCamp",
        price: "৳ 4200",
        originalPrice: "৳ 6000",
        rating: 4.9,
        students: 3000,
        category: "Software Engineering",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        videoId: "hCH5HhftB5Q", 
        description: "Master C++ from scratch. This course covers everything from basic syntax to advanced object-oriented programming concepts.",
        features: [
            "Pointers & Memory Management",
            "Object Oriented Programming",
            "STL (Standard Template Library)",
            "Data Structures Implementation"
        ]
    },
    {
        id: 7,
        title: "Data Structures & Algorithms",
        instructor: "Programming with Mosh",
        price: "৳ 6000",
        originalPrice: "৳ 9000",
        rating: 4.9,
        students: 5000,
        category: "Computer Science",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        videoId: "BBpAmxU_NQo", 
        description: "Ace your coding interviews by mastering Data Structures and Algorithms. Essential for top-tier tech jobs.",
        features: [
            "Big O Notation",
            "Arrays & Linked Lists",
            "Trees & Graphs",
            "Sorting Algorithms"
        ]
    },
];

const categories = [
  {
    id: 1,
    name: "Web Development",
    icon: "💻",
    count: "15 Courses",
  },
  {
    id: 2,
    name: "Data Science",
    icon: "📊",
    count: "8 Courses",
  },
  {
    id: 3,
    name: "App Development",
    icon: "📱",
    count: "10 Courses",
  },
  {
    id: 4,
    name: "Cyber Security",
    icon: "🔒",
    count: "5 Courses",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Frontend Developer",
    text: "Syntax Sphere changed my life! The Full Stack course was comprehensive and easy to follow. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "Data Analyst",
    text: "The Python course is amazing. The instructors explain complex concepts very clearly. I got a job right after effective completion.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

// Mock User Data
const mockUser = {
    name: "Xero Student",
    email: "student@syntaxsphere.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xero"
};

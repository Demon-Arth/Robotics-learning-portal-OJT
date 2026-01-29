/**
 * Mock Data for Robotics Portal
 */

export const MOCK_COURSES = [
    {
        id: "c_arduino_101",
        title: "Intro to Arduino",
        description: "Master the basics of microcontroller programming and circuit design with Arduino. Perfect for absolute beginners.",
        thumbnail: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=600",
        price: 2499,
        category: "Beginner",
        rating: 4.8,
        students: 120,
        modules: [
            { id: "m1", title: "Getting Started with Arduino IDE", duration: "10 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "m2", title: "Understanding Digital Output", duration: "15 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
            { id: "m3", title: "Blinking an LED", duration: "12 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
    },
    {
        id: "c_sensors_201",
        title: "Sensor Projects",
        description: "Learn to interface various sensors like ultrasonic, temperature, and motion sensors with your robotics projects.",
        thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600",
        price: 3999,
        category: "Intermediate",
        rating: 4.6,
        students: 85,
        modules: [
            { id: "m1", title: "Ultrasonic Distance Sensor", duration: "20 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "m2", title: "Temperature & Humidity (DHT11)", duration: "25 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
    },
    {
        id: "c_drone_basics",
        title: "Drone Basics",
        description: "Take to the skies! Understand the aerodynamics, mechanics, and electronics behind quadcopters.",
        thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600",
        price: 6499,
        category: "Advanced",
        rating: 4.9,
        students: 200,
        modules: [
            { id: "m1", title: "Drone Aerodynamics", duration: "30 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "m2", title: "Flight Controller Setup", duration: "40 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
    },
    {
        id: "c_ros_intro",
        title: "Intro to ROS",
        description: "Dive into the Robot Operating System (ROS), the industry standard for programming complex robots.",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
        price: 7999,
        category: "Advanced",
        rating: 4.7,
        students: 50,
        modules: [
            { id: "m1", title: "What is ROS?", duration: "15 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
            { id: "m2", title: "Publishers and Subscribers", duration: "35 min", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
    }
];

const challengesData = [
    {
        title: "Implementing Secure Authentication with JWT",
        tags: ["Node.js", "JWT", "Security"],
        description: "While building the authentication system, I needed to ensure that only logged-in users could access protected features. I implemented JWT-based authentication in the backend and used middleware to verify tokens before allowing access to secure routes. This ensures that only authenticated users can interact with restricted parts of the application."
    },
    {
        title: "Connecting React Frontend with the Backend API",
        tags: ["React", "REST API", "Express"],
        description: "The React frontend needed to communicate with backend services for features like login, donations, and food requests. I implemented API communication between the frontend and backend and configured the server to allow secure cross-origin requests. This allowed smooth and reliable data exchange across the application."
    },
    {
        title: "Handling Image Uploads for Food Donations",
        tags: ["Node.js", "Multer", "MongoDB"],
        description: "The donation form required users to upload images of food items when creating a listing. I implemented a file upload system in the backend to process image files and store their paths in the database. These images are then displayed in the frontend, making the donation listings clearer and more informative."
    },
    {
        title: "Triggering Animations Only When Elements Are Visible",
        tags: ["React", "Intersection Observer", "UI Animation"],
        description: "Some animations in my portfolio were triggering immediately when the page loaded instead of when users reached the section. I implemented a visibility detection approach that observes when elements enter the viewport during scrolling. This ensures animations trigger at the right moment and improves performance."
    },
    {
        title: "Sending Email Notifications for Food Requests",
        tags: ["Node.js", "Nodemailer", "Backend Events"],
        description: "When a user requests a food donation, the donor needs to be notified immediately. I implemented an automated email notification system that sends requester details directly to the donor. This helps donors respond quickly and makes the coordination process more efficient."
    }
];

export default challengesData;

let currentQuestion = 1;
const totalQuestions = 6;

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`q${currentQuestion}`);
    if (!validateInput(currentQuestionElement)) {
        showError('Please answer the question before proceeding.');
        return;
    }

    currentQuestionElement.classList.remove('active');
    currentQuestion++;

    if (currentQuestion <= totalQuestions) {
        document.getElementById(`q${currentQuestion}`).classList.add('active');
        updateProgressBar();
    } else {
        showResult();
    }

    if (currentQuestion > totalQuestions) {
        document.getElementById('nextBtn').style.display = 'none';
    }
    smoothScrollToTop();
}

function validateInput(questionElement) {
    const input = questionElement.querySelector('input, select');
    if (input.type === 'text' || input.tagName === 'SELECT') {
        return input.value.trim() !== '';
    } else if (input.type === 'number') {
        return input.value !== '' && !isNaN(input.value) && input.value >= 0;
    } else if (input.type === 'radio') {
        const radioButtons = questionElement.querySelectorAll('input[type="radio"]');
        return Array.from(radioButtons).some(radio => radio.checked);
    }
    return true;
}

function updateProgressBar() {
    const progress = (currentQuestion - 1) / totalQuestions * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.textContent = message;
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('#survey'));
    setTimeout(() => errorDiv.remove(), 3000);
}

function showResult() {
    const interests = document.getElementById('interests').value.split(',').map(i => i.trim());
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
    const career = document.getElementById('career').value;
    const experience = parseInt(document.getElementById('experience').value);
    const complexity = parseInt(document.getElementById('complexity').value);
    const duration = document.querySelector('input[name="duration"]:checked').value;

    const projectSuggestions = generateProjectSuggestions(interests, skills, career, experience, complexity, duration);
    
    let resultHTML = '<h2 class="fade-in">Suggested Projects</h2>';
    projectSuggestions.forEach((project, index) => {
        resultHTML += `
            <div class="project-card fade-in" style="animation-delay: ${index * 0.2}s">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Skills to develop:</strong> ${project.skills.join(', ')}</p>
                <p><strong>Estimated time:</strong> ${project.estimatedTime}</p>
                <p><strong>Difficulty:</strong> ${project.difficulty}</p>
                <p><strong>Career path:</strong> ${project.careers.join(', ')}</p>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHTML;
    animateProjectCards();
    updateProgressBar();
}

function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}


function generateProjectSuggestions(interests, skills, career, experience, complexity, duration) {
    const projects = [
        {
            title: "Personal Portfolio Website",
            description: "Create a stunning portfolio website to showcase your projects and skills.",
            skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
            careers: ["software", "design"],
            experienceLevel: 1,
            complexity: 2,
            estimatedTime: "2-4 weeks",
            difficulty: "Beginner",
            duration: "short"
        },
        {
            title: "Data Visualization Dashboard",
            description: "Build an interactive dashboard to visualize complex datasets.",
            skills: ["Python", "Data Analysis", "D3.js"],
            careers: ["data", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Mobile App Prototype",
            description: "Design and prototype a mobile app that solves a real-world problem.",
            skills: ["UX Design", "Prototyping", "User Research"],
            careers: ["design", "software"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "3-5 weeks",
            difficulty: "Intermediate",
            duration: "short"
        },
        {
            title: "Digital Marketing Campaign",
            description: "Plan and execute a digital marketing campaign for a fictional product launch.",
            skills: ["Social Media Marketing", "Content Creation", "Analytics"],
            careers: ["marketing"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Project Management Tool",
            description: "Develop a web-based project management tool with task tracking and team collaboration features.",
            skills: ["Full-stack Development", "Database Design", "UX/UI"],
            careers: ["software", "management"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "AI-powered Chatbot",
            description: "Create a chatbot using natural language processing to assist users with common queries.",
            skills: ["Python", "NLP", "Machine Learning"],
            careers: ["ai", "software"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Cybersecurity Audit Tool",
            description: "Develop a tool to perform basic security audits on web applications.",
            skills: ["Network Security", "Python", "Web Technologies"],
            careers: ["cybersecurity", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "E-commerce Website",
            description: "Build a fully functional e-commerce website with product listings, cart, and checkout.",
            skills: ["Full-stack Development", "Payment Integration", "Database Management"],
            careers: ["software", "management"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "Social Media Analytics Dashboard",
            description: "Create a dashboard to track and analyze social media metrics across multiple platforms.",
            skills: ["Data Analysis", "API Integration", "Data Visualization"],
            careers: ["data", "marketing"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Machine Learning Image Classifier",
            description: "Develop an image classification model using machine learning techniques.",
            skills: ["Python", "Machine Learning", "Computer Vision"],
            careers: ["ai", "data"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced",
            duration: "long"
        }
    ];

    return projects
        .filter(project => project.careers.includes(career))
        .filter(project => Math.abs(project.experienceLevel - (experience / 2)) <= 2)
        .filter(project => Math.abs(project.complexity - complexity) <= 1)
        .filter(project => project.duration === duration)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference or use default light theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
themeToggle.checked = savedTheme === 'dark';

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Add smooth scrolling to top when changing questions
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize the progress bar
updateProgressBar();
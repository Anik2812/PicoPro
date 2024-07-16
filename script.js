let currentQuestion = 1;
const totalQuestions = 6;

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`q${currentQuestion}`);
    if (!validateInput(currentQuestionElement)) {
        showError('Please answer the question before proceeding.');
        return;
    }

    currentQuestionElement.classList.remove('active');
    currentQuestionElement.classList.add('fade-out');
    setTimeout(() => {
        currentQuestionElement.style.display = 'none';
        currentQuestion++;

        if (currentQuestion <= totalQuestions) {
            const nextQuestionElement = document.getElementById(`q${currentQuestion}`);
            nextQuestionElement.style.display = 'block';
            setTimeout(() => {
                nextQuestionElement.classList.add('active');
                nextQuestionElement.classList.add('fade-in');
            }, 50);
            updateProgressBar();
        } else {
            showResult();
        }

        if (currentQuestion > totalQuestions) {
            document.getElementById('nextBtn').style.display = 'none';
        }
        smoothScrollToTop();
    }, 300);
}

function validateInput(questionElement) {
    if (!questionElement) return false;

    const input = questionElement.querySelector('input, select');
    if (!input) return false;

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
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${progress}%`;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.textContent = message;
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('#survey'));
    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

function showResult() {
    const interests = document.getElementById('interests').value.split(',').map(i => i.trim().toLowerCase());
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim().toLowerCase());
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
                <div class="project-actions">
                    <button class="btn-details" onclick="showProjectDetails(${index})">More Details</button>
                    <button class="btn-save" onclick="saveProject(${index})">Save Project</button>
                </div>
            </div>
        `;
    });

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = resultHTML;
    resultContainer.style.display = 'block';
    setTimeout(() => {
        resultContainer.classList.add('fade-in');
        animateProjectCards();
    }, 50);
    updateProgressBar();
    lazyLoadProjectCards();
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
        },
        {
            title: "Health and Fitness App",
            description: "Create an app to track workouts, diet, and health metrics.",
            skills: ["Mobile Development", "API Integration", "UX/UI Design"],
            careers: ["software", "health"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Virtual Reality Experience",
            description: "Develop a VR application for educational or entertainment purposes.",
            skills: ["Unity", "3D Modeling", "VR Development"],
            careers: ["software", "gaming"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Recipe Sharing Platform",
            description: "Build a web app where users can share and discover new recipes.",
            skills: ["Web Development", "Database Design", "UX/UI Design"],
            careers: ["software", "culinary"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Travel Itinerary Planner",
            description: "Create a tool to help users plan their travel itineraries and manage bookings.",
            skills: ["Web Development", "API Integration", "UX/UI Design"],
            careers: ["software", "travel"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Weather Forecast App",
            description: "Develop a mobile app that provides real-time weather updates and forecasts.",
            skills: ["Mobile Development", "API Integration", "UX/UI Design"],
            careers: ["software", "weather"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "3-5 weeks",
            difficulty: "Intermediate",
            duration: "short"
        },
        {
            title: "Language Learning Platform",
            description: "Build an app to help users learn new languages through interactive lessons.",
            skills: ["Web Development", "Game Design", "UX/UI Design"],
            careers: ["software", "education"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-10 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Financial Budgeting Tool",
            description: "Create an application to help users manage their personal finances and budgets.",
            skills: ["Web Development", "Data Analysis", "UX/UI Design"],
            careers: ["finance", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Home Automation System",
            description: "Develop a system to control home devices through a mobile app.",
            skills: ["IoT", "Mobile Development", "API Integration"],
            careers: ["software", "engineering"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Online Learning Management System",
            description: "Build a platform for managing online courses and student progress.",
            skills: ["Web Development", "Database Design", "UX/UI Design"],
            careers: ["education", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "Personal Finance Tracker",
            description: "Create an app to track income, expenses, and savings goals.",
            skills: ["Mobile Development", "Data Analysis", "UX/UI Design"],
            careers: ["finance", "software"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Smart Home Security System",
            description: "Develop a system to monitor and secure home premises using IoT devices.",
            skills: ["IoT", "Security", "Mobile Development"],
            careers: ["engineering", "software"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Interactive Storybook for Kids",
            description: "Build an interactive storybook app with animations and sounds.",
            skills: ["Mobile Development", "Animation", "UX/UI Design"],
            careers: ["software", "education"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Virtual Event Platform",
            description: "Create a platform to host and manage virtual events with live streaming and networking.",
            skills: ["Web Development", "Streaming Technologies", "UX/UI Design"],
            careers: ["software", "events"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "AI-driven Content Recommendation Engine",
            description: "Develop an AI engine to recommend content based on user preferences.",
            skills: ["Python", "Machine Learning", "Data Analysis"],
            careers: ["ai", "software"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Fitness Tracking Wearable",
            description: "Create a wearable device to track fitness activities and sync with a mobile app.",
            skills: ["IoT", "Mobile Development", "Bluetooth"],
            careers: ["engineering", "health"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Blockchain-based Voting System",
            description: "Develop a secure voting system using blockchain technology.",
            skills: ["Blockchain", "Security", "Web Development"],
            careers: ["software", "security"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Online Marketplace Platform",
            description: "Build a platform for users to buy and sell products online.",
            skills: ["Web Development", "Payment Integration", "Database Design"],
            careers: ["software", "commerce"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "Remote Team Collaboration Tool",
            description: "Create a tool to facilitate collaboration among remote teams with chat, file sharing, and task management features.",
            skills: ["Web Development", "Real-time Communication", "UX/UI Design"],
            careers: ["software", "management"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Online Bookstore",
            description: "Develop an online bookstore with features like book listings, reviews, and purchase options.",
            skills: ["Web Development", "Payment Integration", "Database Management"],
            careers: ["software", "commerce"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-10 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Smart Farming System",
            description: "Create a system to monitor and manage farm conditions using IoT devices.",
            skills: ["IoT", "Data Analysis", "Mobile Development"],
            careers: ["engineering", "agriculture"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Job Search Platform",
            description: "Build a platform for job seekers to find and apply for jobs, and for employers to post job listings.",
            skills: ["Web Development", "Database Design", "UX/UI Design"],
            careers: ["software", "hr"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-10 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Online Voting System",
            description: "Create a secure and anonymous online voting system for small-scale elections.",
            skills: ["Web Development", "Security", "Database Design"],
            careers: ["software", "security"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Real-time Stock Market Tracker",
            description: "Develop an application to track and display real-time stock market data.",
            skills: ["Web Development", "API Integration", "Data Visualization"],
            careers: ["finance", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "6-8 weeks",
            difficulty: "Intermediate",
            duration: "medium"
        },
        {
            title: "Remote Patient Monitoring System",
            description: "Create a system to monitor patient health remotely using IoT devices and mobile apps.",
            skills: ["IoT", "Mobile Development", "Data Analysis"],
            careers: ["health", "software"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Social Networking Platform",
            description: "Build a platform for users to connect, share, and interact with each other.",
            skills: ["Web Development", "Database Design", "UX/UI Design"],
            careers: ["software", "communication"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "Virtual Reality Classroom",
            description: "Develop a VR application for virtual classrooms and remote learning.",
            skills: ["VR Development", "3D Modeling", "Education"],
            careers: ["software", "education"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Sustainable Energy Monitoring System",
            description: "Create a system to monitor and manage sustainable energy resources.",
            skills: ["IoT", "Data Analysis", "Mobile Development"],
            careers: ["engineering", "environment"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Online Exam Platform",
            description: "Develop a platform for conducting and managing online exams with features like question banks, timed tests, and automatic grading.",
            skills: ["Web Development", "Database Design", "Security"],
            careers: ["education", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "AI-based Personal Assistant",
            description: "Create a personal assistant using AI to manage schedules, set reminders, and answer queries.",
            skills: ["Python", "Machine Learning", "NLP"],
            careers: ["ai", "software"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced",
            duration: "long"
        },
        {
            title: "Remote Learning Platform",
            description: "Build a platform for remote learning with features like live classes, course materials, and student-teacher interaction.",
            skills: ["Web Development", "Streaming Technologies", "UX/UI Design"],
            careers: ["education", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "8-12 weeks",
            difficulty: "Intermediate",
            duration: "long"
        },
        {
            title: "AR-based Shopping Experience",
            description: "Create an augmented reality shopping app to visualize products in a real-world environment.",
            skills: ["AR Development", "Mobile Development", "UX/UI Design"],
            careers: ["software", "commerce"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "12-16 weeks",
            difficulty: "Advanced",
            duration: "long"
        }
    ];

    let filteredProjects = projects.filter(project => {
        const careerMatch = project.careers.includes(career);
        const experienceMatch = Math.abs(project.experienceLevel - (experience / 2)) <= 2;
        const complexityMatch = Math.abs(project.complexity - complexity) <= 1;
        const durationMatch = project.duration === duration;
        const interestMatch = interests.some(interest => project.skills.map(s => s.toLowerCase()).includes(interest));
        const skillMatch = skills.some(skill => project.skills.map(s => s.toLowerCase()).includes(skill));

        return careerMatch && experienceMatch && complexityMatch && durationMatch && (interestMatch || skillMatch);
    });

    if (filteredProjects.length < 3) {
        filteredProjects = projects.filter(project => {
            const careerMatch = project.careers.includes(career);
            const complexityMatch = Math.abs(project.complexity - complexity) <= 2;
            const durationMatch = project.duration === duration || 
                                  (duration === 'medium' && ['short', 'long'].includes(project.duration)) ||
                                  (duration === 'long' && project.duration === 'medium');

            return careerMatch && complexityMatch && durationMatch;
        });
    }

    filteredProjects.sort((a, b) => {
        const scoreA = calculateRelevanceScore(a, interests, skills, career, experience, complexity);
        const scoreB = calculateRelevanceScore(b, interests, skills, career, experience, complexity);
        return scoreB - scoreA;
    });

    return filteredProjects.slice(0, 3);
}

function calculateRelevanceScore(project, interests, skills, career, experience, complexity) {
    let score = 0;

    if (project.careers.includes(career)) score += 3;
    score += 3 - Math.abs(project.experienceLevel - (experience / 2));
    score += 3 - Math.abs(project.complexity - complexity);

    const matchedInterests = interests.filter(interest => project.skills.map(s => s.toLowerCase()).includes(interest));
    const matchedSkills = skills.filter(skill => project.skills.map(s => s.toLowerCase()).includes(skill));
    score += matchedInterests.length + matchedSkills.length;

    return score;
}

function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate');
    });
}

function showProjectDetails(index) {
    const project = generateProjectSuggestions(
        document.getElementById('interests').value.split(',').map(i => i.trim().toLowerCase()),
        document.getElementById('skills').value.split(',').map(s => s.trim().toLowerCase()),
        document.getElementById('career').value,
        parseInt(document.getElementById('experience').value),
        parseInt(document.getElementById('complexity').value),
        document.querySelector('input[name="duration"]:checked').value
    )[index];

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p><strong>Skills to develop:</strong> ${project.skills.join(', ')}</p>
            <p><strong>Estimated time:</strong> ${project.estimatedTime}</p>
            <p><strong>Difficulty:</strong> ${project.difficulty}</p>
            <p><strong>Career path:</strong> ${project.careers.join(', ')}</p>
            <h3>Project Steps:</h3>
            <ol>
                <li>Research and plan the project scope</li>
                <li>Set up the development environment</li>
                <li>Create a project timeline and milestones</li>
                <li>Begin implementation, focusing on core features</li>
                <li>Regularly test and debug your work</li>
                <li>Refine and optimize the project</li>
                <li>Prepare documentation and presentation</li>
                <li>Seek feedback and make final improvements</li>
            </ol>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    modal.style.display = "block";
}

function saveProject(index) {
    const project = generateProjectSuggestions(
        document.getElementById('interests').value.split(',').map(i => i.trim().toLowerCase()),
        document.getElementById('skills').value.split(',').map(s => s.trim().toLowerCase()),
        document.getElementById('career').value,
        parseInt(document.getElementById('experience').value),
        parseInt(document.getElementById('complexity').value),
        document.querySelector('input[name="duration"]:checked').value
    )[index];

    let savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
    savedProjects.push(project);
    localStorage.setItem('savedProjects', JSON.stringify(savedProjects));

    alert('Project saved successfully!');
}

function createTags(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(this.value.trim());
            this.value = '';
        }
    });

    function addTag(text) {
        if (text === '') return;
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = text;
        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-tag';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = function() {
            container.removeChild(tag);
        };
        tag.appendChild(removeBtn);
        container.appendChild(tag);
    }
}

function updateExperienceVisualization() {
    const experience = document.getElementById('experience');
    const bar = document.querySelector('.experience-bar');
    if (experience && bar) {
        bar.style.width = `${Math.min(experience.value * 2, 100)}%`;
    }
}

function updateComplexityVisualization() {
    const complexity = document.getElementById('complexity');
    const bar = document.querySelector('.complexity-bar');
    if (complexity && bar) {
        bar.style.width = `${(complexity.value / 5) * 100}%`;
    }
}

function lazyLoadProjectCards() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('visible');
                observer.unobserve(card);
            }
        });
    }, options);

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

function createBackgroundElements() {
    const container = document.querySelector('.background-decoration');
    for (let i = 0; i < 50; i++) {
        const element = document.createElement('div');
        element.classList.add('background-element');
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        element.style.animationDuration = `${Math.random() * 10 + 5}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(element);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const interestsInput = document.getElementById('interests');
    const skillsInput = document.getElementById('skills');
    if (interestsInput && document.getElementById('interest-tags')) {
        createTags('interests', 'interest-tags');
    }
    if (skillsInput && document.getElementById('skill-tags')) {
        createTags('skills', 'skill-tags');
    }

    const experienceInput = document.getElementById('experience');
    if (experienceInput) {
        experienceInput.addEventListener('input', updateExperienceVisualization);
    }

    const complexityInput = document.getElementById('complexity');
    if (complexityInput) {
        complexityInput.addEventListener('input', updateComplexityVisualization);
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('light-theme');
        });
    }

    createBackgroundElements();

    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            const questionElement = input.closest('.question');
            if (questionElement && validateInput(questionElement)) {
                questionElement.classList.add('valid');
            } else if (questionElement) {
                questionElement.classList.remove('valid');
            }
        });
    });

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
    });

    // Initialize progress bar
    updateProgressBar();
});
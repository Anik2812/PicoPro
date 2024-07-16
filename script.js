let currentQuestion = 1;
const totalQuestions = 5;

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
}

function validateInput(questionElement) {
    const input = questionElement.querySelector('input, select');
    if (input.type === 'text' || input.tagName === 'SELECT') {
        return input.value.trim() !== '';
    } else if (input.type === 'number') {
        return input.value !== '' && !isNaN(input.value) && input.value >= 0;
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

    const projectSuggestions = generateProjectSuggestions(interests, skills, career, experience, complexity);
    
    let resultHTML = '<h2 class="fade-in">Suggested Projects</h2>';
    projectSuggestions.forEach((project, index) => {
        resultHTML += `
            <div class="project-card fade-in" style="animation-delay: ${index * 0.2}s">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Skills to develop:</strong> ${project.skills.join(', ')}</p>
                <p><strong>Estimated time:</strong> ${project.estimatedTime}</p>
                <p><strong>Difficulty:</strong> ${project.difficulty}</p>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHTML;
}

function generateProjectSuggestions(interests, skills, career, experience, complexity) {
    const projects = [
        {
            title: "Personal Portfolio Website",
            description: "Create a stunning portfolio website to showcase your projects and skills.",
            skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
            careers: ["software", "design"],
            experienceLevel: 1,
            complexity: 2,
            estimatedTime: "2-4 weeks",
            difficulty: "Beginner"
        },
        {
            title: "Data Visualization Dashboard",
            description: "Build an interactive dashboard to visualize complex datasets.",
            skills: ["Python", "Data Analysis", "D3.js"],
            careers: ["data", "software"],
            experienceLevel: 3,
            complexity: 4,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate"
        },
        {
            title: "Mobile App Prototype",
            description: "Design and prototype a mobile app that solves a real-world problem.",
            skills: ["UX Design", "Prototyping", "User Research"],
            careers: ["design", "software"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "3-5 weeks",
            difficulty: "Intermediate"
        },
        {
            title: "Digital Marketing Campaign",
            description: "Plan and execute a digital marketing campaign for a fictional product launch.",
            skills: ["Social Media Marketing", "Content Creation", "Analytics"],
            careers: ["marketing"],
            experienceLevel: 2,
            complexity: 3,
            estimatedTime: "4-6 weeks",
            difficulty: "Intermediate"
        },
        {
            title: "Project Management Tool",
            description: "Develop a web-based project management tool with task tracking and team collaboration features.",
            skills: ["Full-stack Development", "Database Design", "UX/UI"],
            careers: ["software", "management"],
            experienceLevel: 4,
            complexity: 5,
            estimatedTime: "8-12 weeks",
            difficulty: "Advanced"
        }
    ];

    return projects
        .filter(project => project.careers.includes(career))
        .filter(project => Math.abs(project.experienceLevel - (experience / 2)) <= 2)
        .filter(project => Math.abs(project.complexity - complexity) <= 1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
}
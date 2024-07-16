let currentQuestion = 1;
const totalQuestions = 3;

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`q${currentQuestion}`);
    if (currentQuestionElement.querySelector('input, select').value === '') {
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
        document.querySelector('button').style.display = 'none';
    }
}

function updateProgressBar() {
    const progress = (currentQuestion - 1) / totalQuestions * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.progress-bar'));
    setTimeout(() => errorDiv.remove(), 3000);
}

function showResult() {
    const interests = document.getElementById('interests').value.split(',').map(i => i.trim());
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
    const career = document.getElementById('career').value;

    const projectSuggestions = generateProjectSuggestions(interests, skills, career);
    
    let resultHTML = '<h2 class="fade-in">Suggested Projects</h2>';
    projectSuggestions.forEach((project, index) => {
        resultHTML += `
            <div class="project-card fade-in" style="animation-delay: ${index * 0.2}s">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Skills to develop:</strong> ${project.skills.join(', ')}</p>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHTML;
}

function generateProjectSuggestions(interests, skills, career) {
    const projects = [
        {
            title: "Personal Portfolio Website",
            description: "Create a stunning portfolio website to showcase your projects and skills.",
            skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
            careers: ["software", "design"]
        },
        {
            title: "Data Visualization Dashboard",
            description: "Build an interactive dashboard to visualize complex datasets.",
            skills: ["Python", "Data Analysis", "D3.js"],
            careers: ["data", "software"]
        },
        {
            title: "Mobile App Prototype",
            description: "Design and prototype a mobile app that solves a real-world problem.",
            skills: ["UX Design", "Prototyping", "User Research"],
            careers: ["design", "software"]
        },
        {
            title: "Digital Marketing Campaign",
            description: "Plan and execute a digital marketing campaign for a fictional product launch.",
            skills: ["Social Media Marketing", "Content Creation", "Analytics"],
            careers: ["marketing"]
        },
        {
            title: "Project Management Tool",
            description: "Develop a web-based project management tool with task tracking and team collaboration features.",
            skills: ["Full-stack Development", "Database Design", "UX/UI"],
            careers: ["software", "management"]
        }
    ];

    return projects
        .filter(project => project.careers.includes(career))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
}
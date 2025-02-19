console.log('Script chargé');

// API Constants
const ADZUNA_APP_ID = 'ede76ec8';
const ADZUNA_API_KEY = '66b38453355e158dacffeea6e09b7108';
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs/fr/search/1';

// UI Control Functions
function toggleDropdown() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function toggleSubDropdown(subDropdownId) {
    var subMenu = document.getElementById(subDropdownId);
    subMenu.classList.toggle("show");
}

function selectOption(option) {
    const input = document.getElementById("messageInput");
    input.value = option;
    
    // Define the responses for each section
    const responses = {
        'Développement personnel': "SUP'RH met l'accent sur le développement des compétences personnelles à travers des programmes de Soft Skills et des activités dédiées, comme le Club Rotaract et des formations sur les nouvelles technologies.",
        'Partenariats internationaux': "SUP'RH propose plusieurs programmes internationaux avec des institutions comme YSchools, UQAM, et des universités aux États-Unis, permettant une ouverture sur le monde et des opportunités d'études à l'international.",
        'Insertion professionnelle': "Le taux d'insertion des diplômés de SUP'RH est élevé, avec des partenariats solides avec des entreprises locales et internationales. Les étudiants bénéficient de stages en entreprise et d'événements comme le Forum de recrutement.",
        'Vie étudiante': "SUP'RH offre une vie étudiante dynamique avec des événements comme le 'Friday Couscous & Friends', des clubs artistiques, et un campus équipé de technologies modernes.",
        'Programmes académiques': "SUP'RH propose une variété de programmes de Bac+3 à Bac+5 dans des domaines comme le marketing digital, la gestion des ressources humaines et l'intelligence artificielle, avec des formations à la fois locales et internationales."
    };

    // Show the user's selection in the chat
    appendMessage(option, 'user');

    // If we have a predefined response for this option, use it
    if (responses[option]) {
        appendMessage(responses[option], 'bot');
    } else if (option.toLowerCase().includes('stage')) {
        fetchInternships();
    } else {
        // For other queries, use the AI
        generateText(option);
    }

    // Clear the input and close the dropdown
    input.value = "";
    const dropdown = document.getElementById("menuDropdown");
    dropdown.style.display = "none";
}

// Message Handling
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (message === "") return;

    appendMessage(message, 'user');
    input.value = "";

    if (message.toLowerCase().includes("stage")) {
        fetchInternships();
    } else if (message.toLowerCase().includes("section")) {
        generateText(message);
    } else {
        generateText(message);
    }
}

function appendMessage(message, sender) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fonction pour récupérer les offres de stage
async function fetchInternships() {
    try {
        const response = await fetch(`${ADZUNA_BASE_URL}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=5&what=stage`);
        const data = await response.json();
        displayInternships(data);
    } catch (error) {
        appendMessage("Une erreur s'est produite lors de la récupération des offres de stage.", 'bot');
        console.error('Erreur API:', error);
    }
}

function displayInternships(data) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';

    if (!data.results || data.results.length === 0) {
        messageDiv.innerHTML = `<p>Aucune offre de stage trouvée.</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
    }

    let messageContent = `<div class="internship-listings">
        <h3>📢 Offres de stage disponibles :</h3><br>`;

    data.results.forEach((job, index) => {
        messageContent += `
        <div class="internship-item">
            <h4>🔹 ${index + 1}. ${job.title}</h4>
            <p>🏢 <strong>Entreprise :</strong> ${job.company?.display_name || "Non précisé"}</p>
            <p>📍 <strong>Lieu :</strong> ${job.location?.display_name || "Non précisé"}</p>
            <p>📅 <strong>Date :</strong> ${new Date(job.created).toLocaleDateString()}</p>
            <p>💰 <strong>Salaire :</strong> ${job.salary_is_predicted == 1 ? "Estimation disponible" : "Non précisé"}</p>
            <p>📜 <strong>Description :</strong> ${job.description.substring(0, 150)}...</p>
            <a href="${job.redirect_url}" target="_blank" class="info-button">🔗 Voir l'offre</a>
        </div>
        <br>`;
    });

    messageContent += '</div>';
    messageDiv.innerHTML = messageContent;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// IA Interaction Functions
const aiButton = document.getElementById("aiButton");
const messageInput = document.getElementById("messageInput");

aiButton.addEventListener('click', () => {
    if (messageInput.value.trim() !== "") {
        sendMessage();
    } else {
        messageInput.focus();
    }
});

// Fonction pour générer la réponse de l'IA
async function generateText(prompt) {
    try {
        // Only use AI for non-predefined queries
        const response = await fetch(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputs: prompt })
            }
        );

        const data = await response.json();

        if (data && data.length > 0 && data[0].generated_text) {
            appendMessage(data[0].generated_text, 'bot');
        } else {
            appendMessage("Désolé, je n'ai pas pu générer une réponse.", 'bot');
        }
    } catch (error) {
        appendMessage("Une erreur s'est produite lors de la génération de la réponse.", 'bot');
        console.error('Erreur IA:', error);
    }
}

// Initialisation du chatbot
window.onload = function() {
    appendMessage("Bonjour! Je suis Sup'Alpha. Comment puis-je vous aider?", 'bot');
};

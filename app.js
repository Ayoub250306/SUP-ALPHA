const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// Connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'qr'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données :', err.stack);
    return;
  }
  console.log('✅ Connecté à la base de données MySQL');
});

// 📂 Correction du chemin d'accès
const maVersionPath = path.resolve('C:\\Users\\HP\\Vitabot\\Ma nouvelle version');
console.log(`📂 Dossier statique défini sur : ${maVersionPath}`);

// Middleware pour servir les fichiers statiques (CSS, JavaScript)
app.use(express.static(maVersionPath));

// Route principale - sert le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(maVersionPath, 'html.html'), (err) => {
    if (err) {
      console.error(`❌ Erreur en envoyant index.html:`, err);
      res.status(500).send('Erreur interne du serveur');
    }
  });
});

// Function to get predefined answers for sections
async function fetchDescription(sectionName) {
  return new Promise((resolve, reject) => {
    // Define predefined answers
    const predefinedAnswers = {
      'Développement personnel': "SUP'RH met l'accent sur le développement des compétences personnelles à travers des programmes de Soft Skills et des activités dédiées, comme le Club Rotaract et des formations sur les nouvelles technologies.",
      
      'Partenariats internationaux': "SUP'RH propose plusieurs programmes internationaux avec des institutions comme YSchools, UQAM, et des universités aux États-Unis, permettant une ouverture sur le monde et des opportunités d'études à l'international.",
      
      'Insertion professionnelle': "Le taux d'insertion des diplômés de SUP'RH est élevé, avec des partenariats solides avec des entreprises locales et internationales. Les étudiants bénéficient de stages en entreprise et d'événements comme le Forum de recrutement.",
      
      'Vie étudiante': "SUP'RH offre une vie étudiante dynamique avec des événements comme le 'Friday Couscous & Friends', des clubs artistiques, et un campus équipé de technologies modernes.",
      
      'Programmes académiques': "SUP'RH propose une variété de programmes de Bac+3 à Bac+5 dans des domaines comme le marketing digital, la gestion des ressources humaines et l'intelligence artificielle, avec des formations à la fois locales et internationales."
    };

    // Check if we have a predefined answer for this section
    if (predefinedAnswers[sectionName]) {
      resolve(predefinedAnswers[sectionName]);
    } else {
      // If not a predefined section, query the database
      const query = 'SELECT description FROM sup_rh_info WHERE section = ?';
      connection.execute(query, [sectionName], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          reject('❌ Erreur lors de la récupération des données');
          return;
        }

        if (results.length > 0) {
          resolve(results[0].description);
        } else {
          reject('⚠️ Section non trouvée');
        }
      });
    }
  });
}

// Route to get section description
app.get('/section/:name', async (req, res) => {
  const sectionName = req.params.name;

  try {
    const description = await fetchDescription(sectionName);
    res.json({ description: description });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur démarré à http://localhost:${port}`);
});

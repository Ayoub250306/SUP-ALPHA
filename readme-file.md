# SUP'RH Chatbot Interface

A dynamic chatbot interface for SUP'RH educational institution that provides information about programs, internships, and student life. The chatbot, named Sup'Alpha, uses AI to answer queries and helps users navigate through various aspects of the institution.

## 🚀 Features

- Interactive chat interface
- AI-powered responses using Mistral-7B
- Real-time internship listings via Adzuna API
- Predefined responses for common queries
- Dropdown menu for quick access to information
- Mobile-responsive design
- International partnerships information
- Student life details
- Professional development resources

## 📁 Project Structure

The project consists of four main files:

### 1. `html.html`
- Main interface structure
- Chat container and message display
- Menu system with dropdowns
- Form integration for evaluations
- Responsive layout elements

### 2. `java.js`
- Core functionality implementation
- API integrations:
  - Adzuna API for internship listings
  - Mistral-7B AI model for chat responses
- Message handling and display
- Menu interaction logic
- Predefined responses management

### 3. `style.css`
- Complete styling for the chat interface
- Responsive design elements
- Custom animations and transitions
- Theme colors and variables
- Message bubbles styling
- Button and input styling
- Menu dropdown styling

### 4. `app.js`
- Express.js server setup
- MySQL database integration
- Static file serving
- API endpoints for section descriptions
- Predefined answers management
- Error handling

## 🔧 Configuration

### API Keys Required:
```javascript
// Adzuna API
ADZUNA_APP_ID = 'ede76ec8'
ADZUNA_API_KEY = '66b38453355e158dacffeea6e09b7108'

// Hugging Face API
Authorization Bearer: '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'
```

### Database Configuration:
```javascript
host: 'localhost'
user: 'root'
password: '12345'
database: 'qr'
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install express mysql2 cors
   ```
3. Set up the MySQL database
4. Update API keys in `java.js`
5. Start the server:
   ```bash
   node app.js
   ```
6. Access the application at `http://localhost:3000`

## 💡 Features Details

### Chatbot Capabilities
- Answers questions about SUP'RH programs
- Provides information about:
  - Personal development
  - International partnerships
  - Professional integration
  - Student life
  - Academic programs
- Real-time internship listings
- AI-powered responses for custom queries

### User Interface
- Clean and modern design
- Easy-to-use chat interface
- Quick access menu
- Mobile-responsive layout
- Interactive elements and animations

## 🛠️ Technical Details

### Frontend
- HTML5, CSS3, JavaScript
- FontAwesome icons
- Responsive design
- Custom animations

### Backend
- Node.js with Express
- MySQL database
- RESTful API endpoints
- File system management

### APIs
- Adzuna API for internship data
- Mistral-7B AI model for chat
- Custom endpoints for section information

## 🔒 Security

- API keys should be stored securely
- Database credentials should be protected
- Input validation implemented
- CORS enabled for API requests
- Error handling for all endpoints

## 📝 Notes

- The chatbot uses both predefined responses and AI-generated content
- Internship listings are updated in real-time
- The system supports both French and English responses
- Regular updates to predefined content recommended

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is private and proprietary to SUP'RH. All rights reserved.

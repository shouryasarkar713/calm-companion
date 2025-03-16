# Mental Health Assistant Chatbot

An AI-powered mental health assistant designed to provide empathetic support, guided exercises, and valuable resources for users. The project features a dynamic frontend built with React and a robust backend using Flask, integrated with Azure OpenAI services and the MOYA framework to orchestrate multiple specialized agents.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Mental Health Assistant Chatbot offers immediate, compassionate support through a conversational AI. It not only provides textual interactions with emotion detection but also includes:

- **Interactive Exercises**: Guided exercises (e.g., deep breathing, journaling, CBT techniques) to help users manage anxiety, depression, and stress.
- **Help Section**: Quick links to professional resources, crisis helplines, and therapist connection options.

The project leverages the MOYA framework to manage and orchestrate various agents that focus on different aspects of mental health:

- **Active Listening Agent**: Engages users with empathetic responses.
- **Guided Coping Agent**: Offers mindfulness, CBT, and stress management strategies.
- **Multi-Disciplinary Agent**: Provides holistic advice across wellness, career, and behavioral health.
- **Privacy Guard Agent**: Ensures user data confidentiality.
- **Resource Navigation Agent**: Helps locate local support resources.
- **Critical Condition Agent**: Provides urgent assistance and crisis management.
- **Classifier Agent**: Routes user messages to the most appropriate support agent.

## Features
- **Chat Interface**: A responsive React UI that supports text input, voice input (simulated), and text-to-speech output.
- **Emotion Detection**: Analyzes user messages to adjust response tone based on detected emotions (positive, negative, anxious, calm, or neutral).
- **Interactive Exercises**: Engaging exercise cards (e.g., deep breathing, journaling, CBT techniques) with hover effects and call-to-action buttons.
- **Help Resources**: Links to professional mental health resources and emergency contacts, along with a "TherapistConnect" component for immediate help.
- **Multi-Agent Orchestration**: A backend system that routes user messages through a set of specialized agents using the MOYA framework and Azure OpenAI.

## Technologies
- **Frontend**: React, TypeScript, React Router, Lucide React icons, custom utility functions for styling.
- **Backend**: Python, Flask, MOYA framework components (agents, classifiers, orchestrator), Azure OpenAI API integration.
- **APIs & Services**: Azure OpenAI for natural language processing; IP geolocation for resource localization.

## File Structure
```
/project-root
├── frontend
│   ├── components
│   │   ├── ChatInterface.tsx           # Main chat interface component
│   │   ├── ExerciseCard.tsx            # Interactive exercise card component
│   │   ├── ExerciseGrid.tsx            # Grid layout for exercises
│   │   └── TherapistConnect.tsx        # Help section with links and emergency contacts
│   ├── hooks
│   │   └── use-toast.ts                # Toast notification hook
│   └── lib
│       └── utils.ts                    # Utility functions (e.g., className concatenation)
├── backend
│   └── appi.py                         # Flask API that orchestrates agent responses
├── README.md                           # This documentation file
└── package.json                        # Frontend dependencies and scripts
```

## Installation

### Prerequisites
- **Node.js and npm/yarn**: For the frontend.
- **Python 3.7+ and pip**: For the backend.
- **Azure OpenAI API Key**: Ensure you have your API key and endpoint details ready.
- **Optional**: Environment for managing environment variables (e.g., dotenv).

### Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
# or
yarn install
```
Start the development server:
```bash
npm start
# or
yarn start
```

### Backend Setup
Navigate to the backend folder:
```bash
cd backend
```
Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
Install required packages:
```bash
pip install -r requirements.txt
```
Run the Flask application:
```bash
python appi.py
```

## Usage
- **Chat Interface**: The frontend displays a chat window where users can type messages, use simulated voice input, and listen to the chatbot’s responses.
- **Interactive Exercises**: Navigate through the interactive exercise cards to start guided mindfulness, CBT, or journaling exercises.
- **Help Section**: Click on the resource links to access professional mental health resources, call helplines, or book sessions.

## Configuration & Environment Variables
For security, sensitive configuration values (like API keys) should be stored in environment variables. You can create a `.env` file in your backend directory:
```ini
AZURE_API_KEY=your_azure_openai_api_key_here
AZURE_API_BASE=https://aoi-iiit-hack-2.openai.azure.com/
```
Be sure to update the backend code in `appi.py` to read these variables instead of hardcoding them.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Open a pull request with a description of your changes.

## License
This project is licensed under the MIT License.


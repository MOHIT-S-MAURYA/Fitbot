# Fitbot - Fitness Chatbot

Fitbot is a web-based fitness chatbot built using Flask, Streamlit, and the Replicate API. It provides users with health, fitness, and nutrition advice based on user input.

## Project Structure

The project is organized as follows:

your_flask_project/
├── fitbot_web.py
├── static/
│ ├── styles.css
│ └── scripts.js
└── templates/
└── index.html



- `fitbot_web.py`: Main Flask application file containing the server-side logic.
- `static/`: Folder for storing static files such as stylesheets (`styles.css`) and scripts (`scripts.js`).
- `templates/`: Folder containing HTML templates, including the main application template (`index.html`).

## Setup Instructions

1. Clone the repository

    git clone https://github.com/your_username/your_flask_project.git
    cd your_flask_project

2. Install dependencies:

    pip install -r requirements.txt

3. Run the Flask application:

    python app.py


## Configuration

- Replicate API Key: Set the Replicate API key in the `fitbot_web.py` file:

  # fitbot_web.py
  os.environ['REPLICATE_API_TOKEN'] = 'your_replicate_api_key'


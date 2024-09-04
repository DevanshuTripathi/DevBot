# DevBot: A Chatbot
## Project Overview
It’s a web-based chatbot application that engages users in conversations, providing responses based on the prompts it receives. I integrated a custom backend with Google's Gemini API to generate intelligent responses. The user interface is crafted using HTML, CSS, and JavaScript, with Django handling the backend operations. Additionally, I ensured that all user interactions are saved in a Django model, allowing conversations to be retrieved and analyzed later.
## Distinctiveness and Complexity
### Distinctiveness:
My project stands out due to its integration of Google's Gemini API, which is not commonly used in many beginner-level chatbot projects. This API enables the chatbot to deliver high-quality, contextually relevant responses. Furthermore, I implemented a custom Django backend to handle user interactions and save chat history, showcasing a deeper understanding of Django's capabilities.
### Complexity:
The complexity of my project lies in several key areas:

1. Integration with Gemini API: I incorporated a sophisticated external API to provide dynamic and context-aware responses, requiring careful handling of API requests and responses.
2. Custom Django Models: I designed and implemented custom Django models to store user interactions. This involves creating a robust schema to ensure efficient data retrieval and management.
3. Frontend and Backend Interaction: The project features a seamless interaction between the frontend and backend, requiring an understanding of both JavaScript for dynamic updates and Django for server-side processing.

## Project Files
Here's a summary of the main files in the project:
1. 'chatbot/': Contains Django App files.
   1. 'models.py': Defines the Django models for storing user interactions.
   2. 'views.py': Handles the logic for processing user input and generating responses using the Gemini API.
   3. 'urls.py': Configures URL routing for the chatbot application.
2. 'templates/': Contains HTML templates for rendering the chatbot interface.
   1. 'layout.html': Base template with common layout elements.
   2. 'login.html': Template for login page.
   3. 'register.html': Template for registering a user page.
   4. 'index.html': Main page with the chatbot and logout option and welcoming page.
3. 'static/': Contains static files such as CSS and JavaScript and images.
   1. 'style.css': Custom styles for the chatbot interface.
   2. 'script.js': JavaScript for handling user input, sending requests to the backend, and updating the chat interface dynamically.
4. 'requirements.txt': Lists Python packages required to run the application.
## How to Run the Application
1. Clone the Repository
   ```
   git clone https://github.com/me50/DevanshuTripathi/tree/web50/projects/2020/x/capstone.git
   ```
2. Install Dependencies
   ```
   pip install -r requirements.txt
   ```
3. Set Up Environment Variables:
   Create a .env file in the project root directory. Add your API key and other sensitive information here. For example:
   ```
   API_KEY=your_api_key_here
   ```
4. Run Migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Start Server:
   ```
   python manage.py runserver
   ```
6. Open your web browser and navigate to http://127.0.0.1:8000/ to use the chatbot.
## Additional Information
- **Database**: The chatbot application uses Django models to store user interactions. The database configuration defaults to SQLite for development but can be configured to use PostgreSQL or another database system for production.
- **API Usage**: The chatbot utilizes Google's Gemini API for generating responses. Ensure you have an API key and that it is properly configured in the Django settings.
   
   

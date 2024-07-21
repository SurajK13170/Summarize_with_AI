# Summarize_with_AI

## Features

- **User Authentication**: Secure login and registration.
- **File Upload**: Upload files for summarization.
- **Text Input**: Enter text directly for summarization.
- **AI Summarization**: Uses AI to summarize texts.
- **History**: View past summaries and access them with a click.
- **Delete History**: Delete past summarise content with-in a click.

## Technologies Used

- **Front-end**: React.js
- **Back-end**: Node.js (Express.js)
- **AI Integration**: Gemini AI
- **Styling**: CSS

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SurajK13170/Summarize_with_AI
    cd Dunlin
    ```

2. Install dependencies for the server and client:
    ```bash
    # Install server dependencies
    cd Backend
    npm install
    
    # Install client dependencies
    cd ../Frontend/dunlin
    npm install
    ```

3. Start the development server:
    ```bash
    # Start server
    npm run dev
    
    # Start client
    npm start
    ```

## Usage

1. **Register**: Create a new account.
2. **Login**: Login with your credentials.
3. **Upload File**: Click on the upload area to select and upload a file.
4. **Enter Text**: Enter text directly into the input area.
5. **Summarize**: Click on the "Summarize" button to get the summary.
6. **History**: View past summaries in the history section. Click on an item to view its summary.
7. **Delete History**: Delete past summaries History. Click on an delete button to delete history.

## API Endpoints

- **POST /user/register**: Register a new user.
- **POST /user/login**: Login a user.
- **POST /upload**: Upload a file or text for summarization.
- **GET /upload/history**: Get the history of summaries.
- **GET /upload/history/:id**: Get a specific summary by ID.
- **DELETE /upload/history/:id**: Delete a specific summary by ID.


## Contact

For any inquiries or feedback, please reach out to surajkumar1317024@gmail.com.


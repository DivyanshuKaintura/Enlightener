# How to Run the Project

This project is created using React as frontend and uagents as backend and flask for routing.

## Install the required modules

Firstly you need to install all the required node modules for the project.

### `npm install`

## Run the script

You can run the project using:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Initiating the backend 

The server consist of 4 agents: 2 each for Deepfake Detection and Gemini Chat-bot.

Move to 'backend' folder

### `cd backend`

## Run the servers first

Start the main server for Gemini
### `python main_server.py`

Start the Gemini agent
### `python gemini_agent.py`

Start the main server for Deepfake detection
### `python deep_main.py`

Start the Deepfake agent
### `python deep_agent.py`


## Installation of weights.keras
You need to download the weights.keras file from this [link](https://drive.google.com/file/d/1yXIi2eEQTjYcqVxeCvMnKvRzJIhuruJN/view?usp=drive_link).
Now paste the file in the directory:
### `backend/ensembler/weights/`

Now you are all set.

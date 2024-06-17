# Accademium Orientation Survey Prototype

- 👉🏻 [Live Preview](https://accademium-orientation-survey.vercel.app/)
- 🎥 [Video Walkthrough - Kaltura](https://video.hanze.nl/mediashare/69b65d97f2070fce/media/Video_Walkthrough_Ivan+Patarov_414334/0_86eqxhg2)
- 📺 [Video Walkthrough - YouTube]
  (https://www.youtube.com/watch?v=zMLe1_y9GXQ)

## Overview

This document outlines the final version of the prototype for "Accademium", specifically focusing on the Orientation Survey component. This prototype represents the next step in the design process, evolving from a high-fidelity click-through prototype created in Adobe XD to a fully interactive application developed with React and TypeScript.

## Purpose

The primary aim of this prototype is to demonstrate the complex type of interactivity within the Accademium platform. It showcases how user responses are handled, stored, and used to provide personalized recommendations for study fields.

## Functionality

#### 1. User Interaction and Local State Management:

- Users interact with an orientation survey designed to capture their preferences, strengths, and interests.
- As users progress through the survey, their responses are stored in the local state of the application.

#### 2. Integration with OpenAI API:

- Upon completing the survey, the local state (containing the user's responses) is sent to the OpenAI API.
- The AI model processes the responses and generates personalized recommendations for study fields based on the provided answers.

#### 3. Gamification and User Control:

- After receiving initial recommendations, users can refine their results using the "Randomize" button.
- The "Randomize" button, represented by a dice icon, provides an additional set of three recommendations aligned with the user's survey responses.

## Features

#### 1. High-Fidelity User Interface

- Enhances the visual and interactive elements from the hi-fi prototype, ensuring a polished and engaging user experience.
- Utilizes intuitive design principles to guide users seamlessly through the orientation survey and recommendation process.

#### 2. Real-Time Data Handling

- Captures and manages user responses in real-time, maintaining data accuracy and security throughout the survey interaction.
- Enables immediate updates and feedback based on user inputs, enhancing responsiveness and user satisfaction.

#### 3. AI-Driven Recommendations

- Employs OpenAI's advanced models to analyze user data and generate personalized study field recommendations.
- Provides tailored suggestions based on user preferences and survey responses, aiding users in making informed academic decisions.

#### 4. Gamification with User Control

- Introduces gamified elements such as the "Randomize" button, represented by a dice icon, at the end of the survey.
- Allows users to explore alternative study field recommendations aligned with their interests, enhancing engagement and satisfaction.
- Enhances user control by providing options to refine recommendations, promoting a personalized and enjoyable experience.

## Installation

You can access the prototype directly from [this link](https://accademium-orientation-survey.vercel.app/).

Alternatively, you can run the prototype locally:

1. Navigate to `accademium-orientation-survey` folder.
2. Open a terminal (e.g., Git Bash) and ensure you are inside the `accademium-orientation-survey` folder.
3. Run `npm install` to install the necessary dependencies.
4. After the installation is complete, run the command `npm run dev` in the terminal.
5. Open your preferred web browser and go to `localhost:5173` to access the prototype.

## Usage

The application utilizes the OpenAI API, and each API call costs approximately **~$0.01**. A typical session generally totals around **~$0.02** due to making two separate calls - one for the initial study field recommendations and another for the randomized study field recommendations.

The application currently operates within a budget of approximately **$5 dollars**, so please use it sparingly.

Additionally, if you are running the application from a location other than the live preview link or the folder provided in the graduation hand-in, you will need to generate your own API key for the OpenAI API.

For further instructions on generating an API key and additional information on usage guidelines, please consult the [OpenAI documentation](https://platform.openai.com/docs/overview).

## Future Development

- Implement additional gamification elements to further enhance user engagement and interaction.
- Enhance AI capabilities to provide even more personalized and accurate recommendations.
- Gather user feedback to continually refine and improve the prototype's usability and functionality.

# ArtAssistantGPT

Your insightful and thoughtful art assistant

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

1. Node v21.6.2 (or higher)
2. Pnpm v8.15.4 (or higher)
3. [OpenAI Account](https://platform.openai.com/)
4. [OpenAI API Key](https://platform.openai.com/api-keys)
5. [OpenAI Billing Credit](https://platform.openai.com/account/billing/overview) (Suggested amount is $5)
6. [OpenAI Assistant](https://platform.openai.com/api-keys)

    - Name: `Art Assistant`
    - Intructions: 
        ```
        You are an expert painter. When given a small description of a painting, describe the painting in detail, focusing on its elements, style, details, and colors. Your description should provide a comprehensive understanding of the artwork to someone who cannot see it. Ensure that you include information about:

        Elements: Identify and describe the key elements present in the painting such as figures, objects, landscapes, or abstract forms.

        Style: Analyze the artistic style employed in the painting. Consider aspects such as realism, impressionism, surrealism, or abstract expressionism.

        Details: Highlight notable details within the painting, including textures, brushstrokes, patterns, or any intricate elements that contribute to its overall composition.

        Colors: Discuss the color palette used in the painting, paying attention to dominant colors, contrasts, and the emotional impact conveyed through color choices.

        Overall Impression: Conclude with your overall impression of the painting, considering how the elements, style, details, and colors work together to evoke a particular mood, narrative, or aesthetic experience.
        ```

## Overview

An AI chatbot that is a certified jokester! If you are looking for a laugh you came to the right place. JokeGPT will brighten your day with custom jokes personalized to your humor! 

## Installation

1. Install dependencies
    ```bash
    pnpm i
    ```
2. Create `.env`
   ```bash
   cp .env.template .env
   ```
3. Set `OPENAI_API_KEY`
4. Set `ASSISTANT_ID`

## Usage

Execute the following command to start the service:

```bash
~/Developer/artassistantgpt [main] $ pnpm dev

> jokegpt@0.1.0 dev
> next dev

   ▲ Next.js 14.1.4
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1615ms
```

Now, go to http://localhost:3000 to interact with ArtAssistantGPT!

## Checklist

# Project Checklist

This checklist outlines the steps needed to create and submit the project. Make sure to follow each step carefully.

1. **Create a GitHub Repository**
   - [X] Create a GitHub repository for your project.
   - [X] Add all members of your group to the repository.

2. **Create README.md File**
   - [X] Create a README.md file that describes your project.

3. **Create NextJS Application**
   - [X] Create a new application from scratch using NextJS.

4. **Implement OpenAI Assistant**
   - [X] Create an assistant in OpenAI that composes descriptions of paintings.
   - [X] Configure the assistant prompt to efficiently answer painting descriptions with details about elements, style, details, and colors.
   - [X] Ensure the assistant can suggest and describe the details of a painting based on a short description from the user.

5. **Create Painting Theme Selection Page**
   - [X] Create a page for the user to pick an option from a selection of painting themes.
   - [X] Include a button to send a message to the assistant for it to generate a painting description with the selected theme.
   - [X] Use the OpenAI Assistants API to create threads and messages for the assistant.
   - [X] Display the generated text output in a text box when the assistant answers.

6. **Image Generation**
   - [ ] Create a button for the user to request the image to be generated based on the content of the text box.
   - [ ] Create a short form after the button for the user to choose the image generation parameters.
   - [ ] Include a button to request the image to be generated.
   - [ ] Ask the Image Generation API to generate the image.
   - [ ] Display a loader while the image is being generated.
   - [ ] Display the generated image in the page once it is ready.

7. **Submission**
   - [ ] Submit your project in the submission form.


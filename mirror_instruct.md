# Project: AI Cosmetic Derenderer (MVP Phase 1)
Melaleuca Interactive Reflection & Reality Experience

## 1. Overview
A browser-based tool designed for convention kiosks. Users upload or paste a photo of themselves wearing makeup. The tool uses **Gemini-3-Pro-image-preview** (or Nano Banana Pro) to remove the makeup and reveal a 80% accurate representation of their natural skin tone and texture without altering their core facial features.

## 2. Technical Stack
* **Framework:** Next.js or React (Vite)
* **Styling:** Tailwind CSS (for a clean, kiosk-ready UI)
* **AI SDK:** Google Generative AI SDK
* **State Management:** React Hooks (useState/useEffect)

## 3. Core Functional Requirements

### A. The "Input" Module
* **Drag & Drop Zone:** A large, prominent area for file uploads.
* **Paste Listener:** Ability to `Ctrl+V` (or `Cmd+V`) a screenshot directly into the app.
* **Preview Area:** Immediate display of the source image once uploaded.

### B. AI Integration (The "Clean Canvas" Logic)
* **Model:** `gemini-3-pro-image-preview`
* **Request Type:** Multimodal Image-to-Image.
* **System Instructions:** > "You are a professional cosmetic skin analyst. Your task is to 'derender' the provided portrait. 
    > 1. Analyze the skin tone in areas with minimal makeup (like the neck or hairline).
    > 2. Remove all visible makeup (foundation, eye shadow, lipstick, blush, mascara).
    > 3. DO NOT change the user's facial structure, bone structure, or eye shape. 
    > 4. Preserve natural skin textures, freckles, or moles.
    > 5. Output a high-fidelity 'natural' version of the person."

### C. The "Comparison" UI
* **Split View:** After processing, show the "Original" and "Natural Base" side-by-side.
* **Processing State:** A clean loading animation (e.g., "Analyzing skin tones...") to keep the user engaged during the 3-5 second API call.

## 4. Instructions for Coding Agent (Antigravity/Claude Code)

1.  **Initialize Project:** Create a responsive, dark-themed UI. Use a "Kiosk" aesthetic (minimalist, large buttons, bold typography).
2.  **Image Handling:** * Implement a `handlePaste` function to capture images from the clipboard.
    * Implement a `handleDrop` function for file dragging.
3.  **API Integration:**
    * Set up an API route to securely call the Google Gemini API.
    * Pass the base64 encoded image to the model with the derendering prompt.
4.  **Preservation Guardrails:** * Ensure the prompt specifically forbids the AI from "beautifying" or changing the ethnicity/features of the subject. The goal is "Clean Skin," not "New Person."

## 5. Success Criteria
* The tool successfully accepts a pasted screenshot.
* The AI returns an image where lipstick, foundation, and eyeshadow are removed while the person remains clearly recognizable.
* The UI remains stable and performs well on a touch-screen browser.
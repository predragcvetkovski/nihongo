# [NihonGO30](https://nihongo.site) - Your 30-Day Journey to Japanese Basics

![Open-source language learning app powered by AI](/nihongo.png)

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## 🌟 Overview

NihonGO30 is an Open-source, interactive, web application designed to guide beginners through the fundamentals of the Japanese language over a structured 30-day plan. The project aims to make learning Japanese accessible, engaging, and effective by combining daily lessons, practical exercises, and modern AI-powered assistance.

Whether you're planning a trip to Japan, want to understand anime and manga in its original form, or are simply passionate about learning new languages, NihonGO30 provides a solid starting point.

## 🎯 Goal of the Project

The primary goal of NihonGO30 is to empower individuals with no prior Japanese knowledge to:

1.  **Master the Basics:** Learn to read and write Hiragana and Katakana, understand fundamental grammar concepts, and acquire essential vocabulary.
2.  **Build Confidence:** Gain the confidence to form simple sentences, understand basic conversations, and engage with Japanese content.
3.  **Establish a Learning Habit:** Provide a structured daily plan that encourages consistent study and lays the groundwork for continued learning.
4.  **Leverage Modern Technology:** Utilize the capabilities of AI (specifically the Gemini API) to offer interactive practice, feedback, and dynamic learning experiences.
5.  **Create an Enjoyable Experience:** Offer a beautifully designed, intuitive, and user-friendly platform that makes learning Japanese a pleasure, not a chore.

Ultimately, NihonGO30 strives to be a comprehensive yet beginner-friendly companion for anyone embarking on their Japanese learning adventure.

## ✨ Key Features

NihonGO30 is packed with features to support your learning:

*   **📅 Structured 30-Day Lesson Plan:** Carefully curated daily lessons covering:
    *   **Hiragana & Katakana:** Full introduction to both phonetic scripts, including stroke order and writing practice.
    *   **Basic Kanji:** Introduction to essential Kanji characters relevant to daily life and beginner vocabulary.
    *   **Core Grammar:** Fundamental sentence structures, particles, verb conjugations, and adjective usage.
    *   **Essential Vocabulary:** Thematic vocabulary lists integrated into daily lessons.
    *   **Cultural Notes:** Insights into Japanese culture to enrich the learning experience.
*   **✍️ Interactive Writing Practice:**
    *   Dedicated canvas for practicing Hiragana, Katakana, and Kanji characters with stroke order guidance.
    *   Modal-based practice accessible directly from Kana tables.
*   **🗣️ Audio Pronunciation:** Text-to-speech functionality for Kana, vocabulary words, and example sentences to aid pronunciation.
*   **🧠 AI-Powered Practice (via Gemini API):**
    *   **Conceptual Pronunciation Checks:** Users can type greetings or phrases, and the AI provides feedback.
    *   **Word Formation & Quizzes:** AI generates prompts for users to form words or answer questions based on learned material.
    *   **Sentence Building & Translation:** Practice constructing sentences or translating simple phrases with AI evaluation.
    *   **Reading Comprehension:** AI helps assess understanding of short Japanese passages.
*   **📊 Progress Tracking:** Visual progress bar and completion status for each day's lesson.
*   **🔁 Spaced Repetition System (SRS) for Vocabulary:**
    *   Vocabulary items from completed lessons are added to an SRS queue.
    *   Users can review vocabulary in a dedicated modal, marking items as "known" or "unknown" to adjust review intervals.
*   **📱 Responsive Design:** Fully responsive interface for learning on desktops, tablets, or smartphones.
*   **🎨 Modern Glassmorphic UI:** A visually appealing and intuitive user interface designed to be engaging.
*   **🧩 Diverse Exercise Types:** Including fill-in-the-blank, Kana identification, and interactive AI prompts.
*   **🔒 Unlocking System:** Lessons are unlocked sequentially, encouraging users to follow the structured path.

## 🛠️ Technology Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI Integration:** Google Gemini API
*   **State Management:** React Hooks (useState, useEffect, useCallback, useMemo)
*   **Persistence:** Browser `localStorage` for progress and SRS data.
*   **Styling:** A combination of Tailwind CSS utility classes and custom CSS for the glassmorphic theme.

## 🚀 How to Use

1.  **Access the Application:** Open the `index.html` file in your web browser. (Assuming local setup or deployment).
2.  **Start with Day 1:** Follow the lessons sequentially. Each day builds upon the previous one.
3.  **Engage with Content:** Read explanations, study Kana and Kanji, learn vocabulary, and pay attention to grammar rules.
4.  **Complete Exercises:** Actively participate in the fill-in-the-blank exercises, writing practice, and AI-powered practice sections.
5.  **Mark Lessons Complete:** Once you feel comfortable with a day's content, mark it as complete to track your progress and unlock vocabulary for SRS.
6.  **Review Vocabulary:** Regularly use the SRS review feature to reinforce your vocabulary learning.
7.  **Be Consistent:** Try to dedicate some time each day to make steady progress.

## 🌱 Future Ideas (Potential Enhancements)

While NihonGO30 aims to be comprehensive for its 30-day scope, potential future enhancements could include:

*   More advanced grammar topics and Kanji.
*   Authentic audio recordings from native speakers.
*   Gamification elements (points, badges, streaks).
*   User accounts for cross-device progress syncing.
*   Community features for learners to interact.
*   Direct audio input for more accurate pronunciation practice with AI.
*   More diverse AI-driven scenarios and conversation practice.

---

Happy Learning! がんばってください (Ganbatte kudasai - Good luck / Do your best!)


## Publisher

[Nihongo](https://nihongo.site)


## Credits

* Gemini Code assistant by [Google AI Studio](https://aistudio.google.com/) 
* The original kanjis and kanas source are from the [KanjiVG](https://kanjivg.tagaini.net/) project
* The images are generated with the project [Kanimaji](https://maurimo.github.io/kanimaji/index.html) with some modifications [available here](https://github.com/jcsirot/kanimaji)


## License

[MIT](/LICENSE)
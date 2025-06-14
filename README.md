# NihonGO30 - Your 30-Day Journey to Japanese Basics!

## 🌟 Overview

NihonGO30 is an Open-source, interactive, web application designed to guide beginners through the fundamentals of the Japanese language over a structured 30-day plan. The project aims to make learning Japanese accessible, engaging, and effective by combining daily lessons, practical exercises, and modern AI-powered assistance.

Whether you're planning a trip to Japan, want to understand anime and manga in its original form, or are simply passionate about learning new languages, NihonGO30 provides a solid starting point.

The name of the app, **Nihongo** (日本語), is the Japanese word for the "Japanese language."

The name is a direct and fitting choice for an app designed to teach Japanese. It is broken down as follows:

* **Nihon (日本):** This is the name for "Japan" in Japanese. It is composed of two kanji characters:
    * **日 (ni):** meaning "sun" or "day."
    * **本 (hon):** meaning "origin" or "root."
    Together, they create the poetic meaning "Land of the Rising Sun."

* **Go (語):** This kanji character is a suffix that means "language" or "word."

Therefore, when you combine them, **Nihongo (日本語)** literally translates to "Japan language," or more simply, the Japanese language. Using this name for the app immediately communicates its purpose to anyone familiar with the term.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 🎯 Goal of the Project

The primary goal of NihonGO30 is to empower individuals with no prior Japanese knowledge to:

1.  **Master the Basics Effectively:** Learn to read and write Hiragana and Katakana, understand fundamental grammar, and acquire essential vocabulary through a clear, step-by-step approach.
2.  **Build Confidence Through Interaction:** Gain the confidence to form simple sentences and understand basic concepts via interactive exercises and AI feedback.
3.  **Establish a Learning Habit:** Provide a structured daily lesson plan that encourages consistent study and lays the groundwork for continued learning.
4.  **Leverage Modern Technology:** Utilize the capabilities of AI (specifically the Gemini API) to offer interactive practice, feedback, and dynamic learning experiences.
5.  **Create an Enjoyable Learning Experience:** Offer a beautifully designed, intuitive, and user-friendly platform that makes learning Japanese engaging.

Ultimately, NihonGO30 strives to be a comprehensive yet beginner-friendly companion, transforming language learning into an achievable goal.

**Why I built this:**

I started building this project while testing the latest Gemini 2.5 models on Google AI Studio, and with the Code assistant and Cloud Run I was able to get it to production in less than 3 hours. This as a personal project to solidify my own understanding of Japanese and to build something useful for others who are just starting their learning journey. I'm a big believer in the power of open-source and wanted to create a resource that is accessible to everyone. 

## ✨ Key Features

NihonGO30 is packed with features to support your learning:

*   **📅 Structured 30-Day Plan:** Carefully curated daily lessons covering:
    *   **Hiragana & Katakana:** Full introduction to both phonetic scripts, including stroke order and writing practice.
    *   **Basic Kanji:** Introduction to essential Kanji characters.
    *   **Core Grammar:** Fundamental sentence structures, particles, verb conjugations, and adjective usage.
    *   **Essential Vocabulary:** Thematic vocabulary lists.
    *   **Cultural Notes:** Insights into Japanese culture.
*   **✍️ Interactive Writing Practice:**
    *   Dedicated canvas for practicing Hiragana, Katakana, and Kanji characters with stroke order guidance.
    *   Modal-based practice accessible directly from Kana tables.
*   **🗣️ Audio Pronunciation:** Text-to-speech functionality for Kana, vocabulary words, and example sentences.
*   **🎤 Pronunciation Practice:** Real-time audio recording and AI feedback on pronunciation of target Japanese phrases.
*   **🧠 AI-Powered Practice (via Gemini API):**
    *   **Pronunciation Checks:** AI provides feedback on spoken greetings/phrases.
    *   **Word Formation & Quizzes:** AI generates prompts for users to form words or answer questions.
    *   **Sentence Building & Translation:** Practice constructing sentences or translating simple phrases with AI evaluation.
    *   **Reading Comprehension:** AI helps assess understanding of short Japanese passages.
*   **📊 Progress Tracking:** Visual progress bar and completion status for each lesson.
*   **🔁 Spaced Repetition System (SRS) for Vocabulary:**
    *   Vocabulary items from completed lessons are added to an SRS queue.
    *   Users can review vocabulary in a dedicated modal, marking items as "known" or "unknown."
*   **📱 Responsive Design:** Fully responsive interface for learning on desktops, tablets, or smartphones.
*   **🧩 Diverse Exercise Types:** Including fill-in-the-blank, Kana identification, and interactive AI prompts.
*   **🔒 Unlocking System:** Lessons are unlocked sequentially, guiding users through the curriculum.

## 🛠️ Technology Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **AI Integration:** Google Gemini API
*   **State Management:** React Hooks (useState, useEffect, useCallback, useMemo)
*   **Persistence:** Browser `localStorage` for progress and SRS data.
*   **Styling:** Tailwind CSS utility classes and custom CSS for the glassmorphic theme.
*   **Fonts:** Poppins, Noto Sans JP.

## 🚀 How to Use

1.  **Access the Application:** Open the `index.html` file in your web browser.
2.  **Begin Your Journey (Lesson 1):** Follow the lessons sequentially. Each one builds upon the last.
3.  **Engage with Lesson Content:** Read explanations, study Kana and Kanji, learn vocabulary, and pay attention to grammar rules.
4.  **Complete Exercises:** Actively participate in the fill-in-the-blank exercises, writing practice, and AI-powered practices.
5.  **Mark Lessons Complete:** Once you feel comfortable with a day's content, mark it as complete to track your progress and unlock vocabulary for SRS.
6.  **Review Vocabulary:** Regularly use the SRS review feature to reinforce your vocabulary learning.
7.  **Stay Consistent:** Try to dedicate some time each day to continue your learning adventure!

## 🌱 Future Ideas (Potential Enhancements)

*   More advanced grammar topics and Kanji.
*   User accounts and cloud-based progress syncing.
*   Gamification elements (points, badges, streaks).
*   More varied AI interaction scenarios.

---

Happy Learning! がんばってください (Ganbatte kudasai - Good luck / Do your best!)


## Publisher

[Nihongo.site](https://nihongo.site)


## Credits

* Gemini Code assistant by [Google AI Studio](https://aistudio.google.com/) 
* The original kanjis and kanas source are from the [KanjiVG](https://kanjivg.tagaini.net/) project
* The images are generated with the project [Kanimaji](https://maurimo.github.io/kanimaji/index.html) with some modifications [available here](https://github.com/jcsirot/kanimaji)

## License

[MIT](/LICENSE)

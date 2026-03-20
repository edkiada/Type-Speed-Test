# Frontend Mentor - Typing Speed Test solution

## Overview

### The challenge

Users should be able to:

- Select difficulty levels(easy, medium, hard) and test mode(Timed 60s, Passage) before starting the game.

- Disinct styles arr applied to correctly typed character, errors, and the current active character to enhance the typing experience.

- When user typing, the timer will work at the same time, and calculate the WPM and accuracy ratio after complete game.

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

#### Desktop Version
<div align="center">
  <img src="./screenshots/desktop.jpg" width="800" alt="Desktop Screenshot">
</div>

#### Mobile Version
<div align="center">
  <img src="./screenshots/mobile.jpg" width="800" alt="Mobile Screenshot">
</div>

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [vue 3](https://vuejs.org/) - Reactive components via Composition API.
- [Vite](https://nextjs.org/) - Fast frontend build tool.
- [Vue Router](https://styled-components.com/) - Seamless page navigation logic.
- [Sora Font](https://fonts.google.com/specimen/Sora) - Enhanced typing readability.

### What I learned

This is my first project using Vue 3 and Vite, and the biggest challenge was definitely the mobile RWD.
Initially, I struggled with the `<select>` element because its default system styling was too inconsistent with the project's design. I spent an entire afternoon experimenting with different UI strategies to ensure the difficulty and mode selectors looked great on all screen sizes. In the end, I successfully implemented a responsive switch: using a clean button group for desktop and space-saving dropdown for mobile. It was a "Great" moment when it finally worked!

### Continued development

- Sound Effects: Adding immersive typing sounds for a better user experience.
- Animations: Implementing Vue transitions for smoother UI state change.
- Custom Mode: Allowing users to upload or paste their own practice text.

### Useful resources

- [Vue 3 Docs](https://vuejs.org/) - Crucial for understanding the Composition API and reactive state.
- [MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) - Helped in styling custom components and handling pseudo-classes.

### AI Collaboration

- Gemini: Acted as a personalized mentor to facilitate my transition from JavaScript to Vue 3.
- Learning & Logic: The AI provided initial structural concepts and framework-specific patterns, which I analyzed and implemented to build the project's reactive logic from scratch.
- Provlem Solving: Collaborated with AI to debug complex RWD transition and optimize data-fetching methods.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io) - For providing the professional design files and the challenging project requirements.
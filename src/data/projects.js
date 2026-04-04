const projects = [
  {
    id: 1,
    title: 'Vaulted',
    description:
      'App for cataloguing physical collections: cards, figures, vinyl, manga, games. Log what you own, add photos and notes, and share your vault publicly. Built with React, Vite, Zustand, Node.js, PostgreSQL, and Cloudinary. Includes JWT auth and offline-first sync via IndexedDB.',
    image: '/vaulted-logo-icon.png',
    containImage: true,
    imageBg: 'radial-gradient(ellipse at center, #1e0a3c 0%, #0d0118 60%, #050509 100%)',
    deploy: 'https://vaulted-collecting.com',
    repo: 'https://github.com/Mimosquera/Vaulted',
  },
  {
    id: 2,
    title: 'New Flow',
    description:
      'Full-stack appointment management system for a barbershop. Customers book appointments and see live availability; staff manage schedules through an employee dashboard. React frontend, Node.js/Express API, PostgreSQL, JWT auth, bilingual support, and SMS/email notifications.',
    image: '/new-flow-logo.png',
    deploy: 'https://newflowbarbershop.com',
    repo: 'https://github.com/Mimosquera/New-Flow',
  },
  {
    id: 3,
    title: 'Happy Nic Day',
    description:
      "Birthday app I built for my partner. Floating hearts, a wandering balloon with gyroscope shake detection, a candle you blow out using the mic and Web Audio API, randomized questions, and a compliment machine. Built with React and Vite.",
    image: '/cake.png',
    deploy: 'https://nicday.netlify.app',
    repo: 'https://github.com/Mimosquera/Happy-Nic-Day',
    containImage: true,
  },
  {
    id: 4,
    title: 'Pet Tag',
    description:
      'Pet name generator built as a bootcamp group project. Pick an animal type, choose a set of characteristics, and the app generates a name. Names can be saved and managed in local storage. Built with HTML, CSS, and JavaScript.',
    emoji: '🐾',
    emojiColor: 'rgb(52, 122, 122)',
    deploy: 'https://achensen.github.io/Pet-Tag/index.html',
    repo: 'https://github.com/achensen/Pet-Tag',
  },
];

export default projects;

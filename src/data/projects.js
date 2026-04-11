const projects = [
  {
    id: 1,
    title: 'Vaulted',
    description:
      'App for cataloguing physical collections: cards, figures, vinyl, manga, games. Log what you own, add photos and notes, and share your vault publicly. Built with React, Vite, Zustand, Node.js, PostgreSQL, and Cloudinary. Includes JWT auth and offline-first sync via IndexedDB.',
    image: '/vaulted-logo-icon.png',
    containImage: true,
    imageBg: 'radial-gradient(ellipse at center, #1c1a28 0%, #141320 60%, #0e0d16 100%)',
    deploy: 'https://vaulted-collecting.com',
    repo: 'https://github.com/Mimosquera/Vaulted',
  },
  {
    id: 2,
    title: 'New Flow',
    description:
      'Full-stack appointment management system for a barbershop. Customers book appointments and see live availability; staff manage schedules through an employee dashboard. React frontend, Node.js/Express API, PostgreSQL, JWT auth, bilingual support, and SMS/email notifications.',
    image: '/newflow-logo-transparent.png',
    containImage: true,
    imagePadding: '2.5rem',
    imageBg: 'radial-gradient(ellipse at center, #1a3a4c 0%, #0c1e2a 60%, #050a0f 100%)',
    deploy: 'https://newflowbarbershop.com',
    repo: 'https://github.com/Mimosquera/New-Flow',
  },
  {
    id: 3,
    title: 'Happy Nic Day',
    description:
      "Birthday app I built for my partner. Floating hearts, a wandering balloon with gyroscope shake detection, a candle you blow out using the mic and Web Audio API, randomized questions, and a compliment machine. Built with React and Vite.",
    image: '/nic-day-heart-only.svg',
    deploy: 'https://nicday.love',
    repo: 'https://github.com/Mimosquera/Happy-Nic-Day',
    containImage: true,
    imageBg: 'radial-gradient(ellipse at center, #221430 0%, #150d1f 60%, #0d0a12 100%)',
  },
];

export default projects;


// try {let var}
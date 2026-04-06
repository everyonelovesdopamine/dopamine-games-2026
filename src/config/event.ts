export const EVENT = {
  name: 'The Dopamine Games',
  tagline: 'perform. play. party. together.',
  date: '6. Juni 2026',
  location: 'Adidas Sports Base Berlin',
  description: 'a community-driven fitness experience where performance, play, and connection come together. teams of two compete in inclusive challenges. when the workouts are done, the day turns into a full community celebration.',
  slug: 'dopamine-games-2026',
};

export const COLORS = {
  black: '#141514',
  pink: '#F78DB9',
  blue: '#185BC5',
  white: '#FFFFFF',
  darkGrey: '#707070',
  grey: '#D0D0D0',
  lightGrey: '#EFEFEF',
};

export const CATEGORY_LEVELS = {
  core: {
    id: 'core',
    label: 'CORE',
    description: 'for the ones building their base and stepping into the arena. consistent work, real progress, first taste of competition. this is where it starts.',
  },
  elite: {
    id: 'elite',
    label: 'ELITE',
    description: 'for the ones who train with intent and compete to win. high performance, high standards, no shortcuts. this is where you push the edge.',
  },
};

export const CATEGORIES = [
  { id: 'mm-core', label: 'MM Core', description: "men's team, core category", gender: 'MM', level: 'core' },
  { id: 'mm-elite', label: 'MM Elite', description: "men's team, elite category", gender: 'MM', level: 'elite' },
  { id: 'ff-core', label: 'FF Core', description: "women's team, core category", gender: 'FF', level: 'core' },
  { id: 'ff-elite', label: 'FF Elite', description: "women's team, elite category", gender: 'FF', level: 'elite' },
  { id: 'mf-core', label: 'MF Core', description: 'mixed team, core category', gender: 'MF', level: 'core' },
  { id: 'mf-elite', label: 'MF Elite', description: 'mixed team, elite category', gender: 'MF', level: 'elite' },
];

export const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const SHOE_SIZES_UK = ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14'];

export const OPEN_PLAY_ROOMS = [
  {
    id: 'room-a',
    name: 'Room A',
    sessions: [
      { time: '14:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '15:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '17:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '18:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
    ],
  },
  {
    id: 'room-b',
    name: 'Room B',
    sessions: [
      { time: '14:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '15:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '17:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '18:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
    ],
  },
  {
    id: 'room-c',
    name: 'Room C',
    sessions: [
      { time: '14:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '15:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '17:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '18:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
    ],
  },
  {
    id: 'room-d',
    name: 'Room D',
    sessions: [
      { time: '14:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '15:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '17:00', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
      { time: '18:30', name: 'Session Placeholder', description: 'Coming soon', duration: 90, capacity: 20, coach: 'TBA' },
    ],
  },
];

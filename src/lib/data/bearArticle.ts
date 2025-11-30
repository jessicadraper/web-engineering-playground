// src/lib/data/bearArticle.ts
import BearList from '../components/BearList.svelte';

export const bearArticleContent = [
  { type: 'h2', text: 'The Trouble with Bears' },
  { type: 'p', text: 'By Evan Wild' },
  {
    type: 'p',
    text: 'Tall, lumbering, angry, dangerous. The real live bears of this world are proud, independent creatures, self-serving and always on the hunt for food.',
  },
  { type: 'h3', text: 'Types of Bears' },
  {
    type: 'table',
    header: ['Bear Type', 'Coat', 'Adult size', 'Habitat', 'Lifespan', 'Diet'],
    data: [
      [
        'Wild',
        'Brown or black',
        '1.4 to 2.8 meters',
        'Woods and forests',
        '25 to 28 years',
        'Fish, meat, plants',
      ],
      [
        'Urban',
        'North Face',
        '18 to 22',
        'Condos and coffee shops',
        '20 to 32 years',
        'Starbucks, sushi',
      ],
    ],
  },
  { type: 'h3', text: 'Habitats and Eating habits' },
  {
    type: 'p',
    text: 'Wild bears eat a variety of meat, fish, fruit, nuts, and other naturally growing ingredients...',
  },
  {
    type: 'img',
    src: 'media/wild-bear.jpg',
    alt: 'Wild bear in forest',
  },
  {
    type: 'p',
    text: 'Urban (gentrified) bears on the other hand have largely abandoned the old ways...',
  },
  {
    type: 'img',
    src: 'media/urban-bear.jpg',
    alt: 'Urban bear near buildings',
  },
  {
    type: 'h3',
    text: 'Mating rituals',
  },
  {
    type: 'p',
    text: 'Bears are romantic creatures by nature...',
  },
  { type: 'component', component: BearList },
  {
    type: 'bio',
    text: 'Evan Wild is an unemployed plumber from Doncaster...',
  },
  // { type: 'component', component: AboutAuthor },
  // { type: 'component', component: CommentSection },
];

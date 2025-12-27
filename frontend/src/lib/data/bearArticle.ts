// src/lib/data/bearArticle.ts
import BearList from '../components/BearList.svelte';

export const bearArticleContent = [
  { type: 'h2', text: 'The Trouble with Bears' },
  {
    type: 'p',
    text: 'By Evan Wild',
    styles:
      'border-b border-t border-stone-100 py-2 text-lg text-stone-500 mb-8',
  },
  {
    type: 'p',
    text: 'Tall, lumbering, angry, dangerous. The real live bears of this world are proud, independent creatures, self-serving and always on the hunt for food.',
  },
  { type: 'h3', text: 'Types of Bears' },
  {
    type: 'table',
    caption: 'Comparison table between wild and urban bears',
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
    src: '/media/wild-bear.jpg',
    alt: 'Wild bear in forest',
  },
  {
    type: 'p',
    text: 'Urban (gentrified) bears on the other hand have largely abandoned the old ways...',
  },
  {
    type: 'img',
    src: '/media/urban-bear.jpg',
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
  {
    type: 'audio',
    sources: [
      {
        src: '/media/bear.mp3',
        type: 'audio/mp3',
      },
      {
        src: '/media/bear.ogg',
        type: 'audio/ogg',
      },
    ],
    fallback: "It looks like your browser doesn't support HTML5 audio players.",
    transcriptDiv: 'bear-audio-transcript',
    transcriptText:
      "This isn't really an audio fact file about bears, but it is an audio file you can transcribe.",
  },
  { type: 'component', component: BearList },
  {
    type: 'bio',
    text: 'Evan Wild is an unemployed plumber from Doncaster...',
  },
];

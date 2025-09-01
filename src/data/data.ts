export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: string;
  duration: string;
  genre: string[];
  videoUrl: string;
  type: 'movie';
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  episodeNumber: number;
  seasonNumber: number;
  videoUrl: string;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: string;
  genre: string[];
  seasons: number;
  episodes: Episode[];
  type: 'series';
}

export type Content = Movie | Series;

export const movies: Movie[] = [
  {
    id: 'The Nun II',
    title: 'The Nun II',
    description: 'a 2023 supernatural horror film and the eighth installment in The Conjuring Universe, following Sister Irene as she once again confronts the demonic nun Valak.',
    poster: 'https://d5d5yejrba9lo.cloudfront.net/keyart-jpeg/movies/media/browser/the_nun_2_intl_alt_v_dd_ka_tt_2000x3000_300dpi_en.jpg',
    backdrop: 'https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/8940b40c-9e62-45e1-af18-efcf774e1a21/f81c2ff0feb45027d6b1d46516ed0520a90fdc7d.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=500',
    year: 2023,
    rating: '5.6',
    duration: '1h 50m',
    genre: ['horror', 'Adventure', 'mystery'],
    videoUrl: 'https://embed.vidsrc.pk/movie/tt10160976',
    type: 'movie'
  },
  {
    id: 'A Minecraft Movie',
    title: 'A Minecraft Movie',
    description: 'Four misfits are suddenly pulled through a mysterious portal into a bizarre cubic wonderland that thrives on imagination. To get back home they ll have to master this world while embarking on a quest with an unexpected expert crafter.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQwtH462ZoSACQ2LDz1ascGo2wInfU3Vx5-MwBihWcEa1d3bdZXCjfxRd6fI-YheJmhJU&usqp=CAU',
    backdrop: 'https://img1.wsimg.com/isteam/ip/d6a3e7a7-e920-4711-bf09-856dd846af78/minecraft-movie-.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280',
    year: 2025,
    rating: '5.6',
    duration: '1h 41m',
    genre: ['Action', 'Adventure', 'Comedy'],
    videoUrl: 'https://embed.vidsrc.pk/movie/tt3566834?lang=Hindi',
    type: 'movie'
  },
  {
    id: 'blackpanther',
    title: 'Black Panther',
    description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2018,
    rating: 'PG-13',
    duration: '2h 14m',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    type: 'movie'
  },
  {
    id: 'toystory4',
    title: 'Toy Story 4',
    description: 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be.',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop',
    year: 2019,
    rating: 'G',
    duration: '1h 40m',
    genre: ['Animation', 'Adventure', 'Comedy'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    type: 'movie'
  }
];

export const series: Series[] = [
  {
    id: 'mandalorian',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop',
    year: 2019,
    rating: 'TV-14',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    seasons: 3,
    episodes: [
      {
        id: 'mando-s1e1',
        title: 'Chapter 1: The Mandalorian',
        description: 'A Mandalorian bounty hunter tracks a target for a well-paying client.',
        thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop',
        duration: '39m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: 'mando-s1e2',
        title: 'Chapter 2: The Child',
        description: 'The Mandalorian and his allies confront their enemies.',
        thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop',
        duration: '32m',
        episodeNumber: 2,
        seasonNumber: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      }
    ],
    type: 'series'
  },
  {
    id: 'wandavision',
    title: 'WandaVision',
    description: 'Blends the style of classic sitcoms with the MCU, in which Wanda Maximoff and Vision live in a suburban town.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2021,
    rating: 'TV-PG',
    genre: ['Action', 'Comedy', 'Drama'],
    seasons: 1,
    episodes: [
      {
        id: 'wanda-s1e1',
        title: 'Filmed Before a Live Studio Audience',
        description: 'Wanda and Vision struggle to conceal their powers during dinner with Vision\'s boss.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '30m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ],
    type: 'series'
  },
  {
    id: 'loki',
    title: 'Loki',
    description: 'The mercurial villain Loki resumes his role as the God of Mischief following the events of Avengers: Endgame.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2021,
    rating: 'TV-14',
    genre: ['Action', 'Adventure', 'Fantasy'],
    seasons: 2,
    episodes: [
      {
        id: 'loki-s1e1',
        title: 'Glorious Purpose',
        description: 'After stealing the Tesseract in Avengers: Endgame, Loki lands before the Time Variance Authority.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '51m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
      }
    ],
    type: 'series'
  }
];

export const allContent: Content[] = [...movies, ...series];

export const categories = [
  { name: 'Featured', content: allContent.slice(0, 4) },
  { name: 'Movies', content: movies },
  { name: 'Series', content: series },
  { name: 'Action & Adventure', content: allContent.filter(item => item.genre.includes('Action') || item.genre.includes('Adventure')) },
  { name: 'Animation', content: allContent.filter(item => item.genre.includes('Animation')) },
  { name: 'Sci-Fi', content: allContent.filter(item => item.genre.includes('Sci-Fi')) }
];

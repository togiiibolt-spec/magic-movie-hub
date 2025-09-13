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

export interface Music {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audioUrl: string;
  duration: string;
  year: number;
  genre: string;
}

export const music: Music[] = [
  {
    id: 'stay-alive',
    title: 'Stay Alive',
    artist: 'José González',
    album: 'The Secret of Us',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '3:45',
    year: 2023,
    genre: 'Indie Folk'
  },
  {
    id: 'blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '3:20',
    year: 2020,
    genre: 'Synthpop'
  },
  {
    id: 'shape-of-you',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '3:53',
    year: 2017,
    genre: 'Pop'
  }
];

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
    id: 'Stand by Me Doraemon 2',
    title: 'Stand by Me Doraemon 2',
    description: 'Nobita travels to the future to show his beloved grandma his bride, but adult Nobita has fled his own wedding.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBXvahX95ZB9rHLenlvHrvFzmQCey1FIeOQ&s',
    backdrop: 'https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2019/12/19121211411294.jpg',
    year: 2021,
    rating: '7.5',
    duration: '1h 36m',
    genre: ['Family', 'Animation', 'Comedy'],
    videoUrl: 'https://embed.vidsrc.pk/movie/728754-stand-by-me-2',
    type: 'movie'
  },
   {
    id: 'Black Panther',
    title: 'Black Panther',
    description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country\'s past.',
    poster: 'https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810',
    backdrop: 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2018/03/pic.jpg',
    year: 2018,
    rating: '7.3',
    duration: '2h 14m',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    videoUrl: 'https://embed.vidsrc.pk/movie/284054',
    type: 'movie'
  },
  {
    id: 'Avengers: Endgame',
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    poster: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
    backdrop: 'https://kneelbeforeblog.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/04/25033528/AvengersEG2D_banner-Cropped.jpg',
    year: 2019,
    rating: '8.4',
    duration: '3h 1m',
    genre: ['Action', 'Adventure', 'SuperHero'],
    videoUrl: 'https://embed.vidsrc.pk/movie/tt4154796',
    type: 'movie'
  },
  {
    id: 'Black Clover: Sword of the Wizard King',
    title: 'Black Clover: Sword of the Wizard King',
    description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Rl1ua8VpFTFOJsQ-xMfdejIykcICDr8nyw&s',
    backdrop: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSPHE2O2cy8BfSym8IHQ37bTehyP-BDW-MMo31SuQFOvPZA3XjvVy9k1Tg5nvL0AFiKVPQcjzrNw3qUGm0TZorkdhbVbu4cT2WtS.jpg?r=cca',
    year: 2023,
    rating: '7.4',
    duration: '1h 50m',
    genre: ['Action', 'Adventure', 'Anime'],
    videoUrl: 'https://embed.vidsrc.pk/movie/812225',
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

export const animeSeries: Series[] = [
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    description: 'introduces a world where gates open, connecting Earth to monster-filled dimensions, and some humans gain magical powers to become "Hunters".',
    poster: 'https://resizing.flixster.com/WvUR0LcCwPkfo07dl1CChnL1f6o=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMzRlNmFmN2MtNjA2Mi00MTUwLTg2MGYtOGZlN2M5OGRjZWUzLnBuZw==',
    backdrop: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
    year: 2024,
    rating: '8.6',
    genre: ['Action', 'Adventure', 'Anime'],
    seasons: 2,
    episodes: [
      {
        id: 'solo-leveling-s1e1',
        title: 'I\'m Used to It',
        description: 'Meet hardworking E-Rank hunter Sung Jinwoo and his allies as they fight magic beasts from another dimension.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/ec4de54f2f3afa14175e5eabfc16ce1f',
      },
      {
        id: 'solo-leveling-s1e2',
        title: 'If I Had One More Chance',
        description: 'Jinwoo discovers the System and begins his journey to becoming stronger.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 2,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/37de71064f5d9561e9c8721237947f7f',
      },
      {
        id: 'solo-leveling-s1e3',
        title: 'It\'s Like a Game',
        description: 'Sung Jinwoo wakes up in a hospital after his near-death experience in the double dungeon, his body fully healed.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 3,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/bd9b0b4fe7c7d2f2c932c8d279ddb529',
      },     
      {
        id: 'solo-leveling-s1e4',
        title: 'I\'ve Gotta Get Stronger',
        description: 'Sung Jinwoo continues his solo dungeon raid, gaining new skills and titles like "Wolf Assassin" as he levels up by defeating wolves.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 4,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/885fd739d31951206a8c4f0d6472fcf0',
      },     
      {
        id: 'solo-leveling-s1e5',
        title: 'A Pretty Good Deal',
        description: 'Sung Jinwoo recovers from his injuries and shows off his new, muscular physique from the System, earning admiration from hospital nurses, including a bold attempt by one to get his number.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 5,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/8a66cd1b3045b820efd42dbf18eb28e1',
      },     
       {
        id: 'solo-leveling-s1e6',
        title: 'The Real Hunt Begins',
        description: 'Sung Jinwoo and Yoo Jinho are left behind by the party to die against the C-Rank Giant Spider boss.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 6,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/43413ceafd2ea8d4a5e17d21c4840d9e',
      }, 
      {
        id: 'solo-leveling-s1e7',
        title: 'Let\'s See How Far I Can Go',
        description: 'Sung Jinwoo defeats the S-rank dungeon boss Cerberus, revealing his true strength and allowing him to receive a key to the Demon\'s Castle, which holds the ingredients for the Elixir of Life his mother needs. ',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 7,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/e6e31529675d0ef99d777d729c423382',
      }, 
      {
        id: 'solo-leveling-s1e8',
        title: 'This Is Frustrating',
        description: 'Sung Jinwoo\'s focus shifts to healing his mother, who is suffering from Eternal Sleep Disease, by finding the ingredients for the Elixir of Life.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 8,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/fb5d9e209ebda9ab6556a31639190622',
      }, 
      {
        id: 'solo-leveling-s1e9',
        title: 'You\'ve Been Hiding Your Skills',
        description: 'the D-Rank mission begins with Sung Jinwoo and his new raid group, including ex-convicts and escort Kang Taeshik, venturing into a dungeon where betrayals and deaths occur.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 9,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/48c0b3cf0c62e40eeff5a9b07a63d953',
      }, 
      {
        id: 'solo-leveling-s1e10',
        title: 'What Is This, a Picnic?',
        description: 'Jinwoo and Joohee reminisce before Joohee decides to retire, while Hunter Association Director Cha warns Jinwoo of S-rank hunter Hwang Dongsoo\'s potential vengeance.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 10,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/8d969817eda63ba5eb9f49ea11f0b5ae',
      }, 
      {
        id: 'solo-leveling-s1e11',
        title: 'A Knight Who Defends an Empty Throne',
        description: 'Jinwoo finds a clearing in a forest far from the city.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 11,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/4756c77f32f14b12aa71e976505e02b5',
      }, 
      {
        id: 'solo-leveling-s1e12',
        title: 'Arise',
        description: 'Drained from endless battle, Jin-woo sees a phantom of his past self.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 12,
        seasonNumber: 1,
        videoUrl: 'https://play.zephyrflick.top/video/b5a4fecffcf98386694f96c74b302131',
      }, 
      {
        id: 'solo-leveling-s2e1',
        title: 'Level Up',
        description: 'Season 2 begins with Jinwoo facing new challenges.',
        thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/82d449a8fb2604a42c68376608c999216302fedb61011888f71c4f2093e16148.jpg',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 2,
        videoUrl: 'https://embed.vidsrc.pk/series/solo-leveling/2/1',
      }
    ],
    type: 'series'
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    description: 'A young boy whose family was killed by demons becomes a demon slayer to avenge his family and cure his sister.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2019,
    rating: '8.7',
    genre: ['Action', 'Adventure', 'Anime'],
    seasons: 4,
    episodes: [
      {
        id: 'demon-slayer-s1e1',
        title: 'Cruelty',
        description: 'Tanjiro finds his family slaughtered and his sister Nezuko turned into a demon.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/demon-slayer-kimetsu-no-yaiba/1/1'
      },
      {
        id: 'demon-slayer-s2e1',
        title: 'Sound Hashira Tengen Uzui',
        description: 'Entertainment District Arc begins.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '44m',
        episodeNumber: 1,
        seasonNumber: 2,
        videoUrl: 'https://embed.vidsrc.pk/series/demon-slayer-kimetsu-no-yaiba/2/1'
      },
      {
        id: 'demon-slayer-s3e1',
        title: 'Someone\'s Dream',
        description: 'Swordsmith Village Arc begins.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '44m',
        episodeNumber: 1,
        seasonNumber: 3,
        videoUrl: 'https://embed.vidsrc.pk/series/demon-slayer-kimetsu-no-yaiba/3/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    description: 'Humanity fights for survival against giant humanoid Titans behind massive walls.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2013,
    rating: '9.0',
    genre: ['Action', 'Drama', 'Anime'],
    seasons: 4,
    episodes: [
      {
        id: 'aot-s1e1',
        title: 'To You, in 2000 Years',
        description: 'Eren witnesses the fall of Wall Maria and the death of his mother.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/attack-on-titan/1/1'
      },
      {
        id: 'aot-s4e1',
        title: 'The Other Side of the Ocean',
        description: 'Final season begins with a new perspective.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '23m',
        episodeNumber: 1,
        seasonNumber: 4,
        videoUrl: 'https://embed.vidsrc.pk/series/attack-on-titan/4/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    description: 'Monkey D. Luffy sets off on an adventure with his pirate crew in search of the greatest treasure.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 1999,
    rating: '9.0',
    genre: ['Action', 'Adventure', 'Anime'],
    seasons: 20,
    episodes: [
      {
        id: 'one-piece-s1e1',
        title: 'I\'m Luffy! The Man Who\'s Gonna Be King of the Pirates!',
        description: 'Luffy begins his journey to become the Pirate King.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/one-piece/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'naruto',
    title: 'Naruto',
    description: 'A young ninja who seeks recognition from his peers and dreams of becoming the Hokage.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2002,
    rating: '8.3',
    genre: ['Action', 'Adventure', 'Anime'],
    seasons: 9,
    episodes: [
      {
        id: 'naruto-s1e1',
        title: 'Enter: Naruto Uzumaki!',
        description: 'Naruto Uzumaki fails the graduation test from the Ninja Academy.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '23m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/naruto/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    description: 'A student joins a secret organization of sorcerers to kill cursed demons.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2020,
    rating: '8.6',
    genre: ['Action', 'Supernatural', 'Anime'],
    seasons: 2,
    episodes: [
      {
        id: 'jjk-s1e1',
        title: 'Ryomen Sukuna',
        description: 'Yuji Itadori joins the Occult Research Club.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/jujutsu-kaisen/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    description: 'A superhero-loving boy enrolls in a prestigious hero academy.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: '8.7',
    genre: ['Action', 'School', 'Anime'],
    seasons: 7,
    episodes: [
      {
        id: 'mha-s1e1',
        title: 'Izuku Midoriya: Origin',
        description: 'Deku dreams of becoming a hero despite being born without powers.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/my-hero-academia/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'death-note',
    title: 'Death Note',
    description: 'A high school student discovers a supernatural notebook.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2006,
    rating: '9.0',
    genre: ['Thriller', 'Supernatural', 'Anime'],
    seasons: 1,
    episodes: [
      {
        id: 'dn-s1e1',
        title: 'Rebirth',
        description: 'Light Yagami finds the Death Note.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '23m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/death-note/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist: Brotherhood',
    description: 'Two brothers search for the Philosopher\'s Stone to restore their bodies.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2009,
    rating: '9.1',
    genre: ['Adventure', 'Drama', 'Anime'],
    seasons: 1,
    episodes: [
      {
        id: 'fma-s1e1',
        title: 'Fullmetal Alchemist',
        description: 'The Elric brothers attempt human transmutation.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/fullmetal-alchemist-brotherhood/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    description: 'A superhero who can defeat any opponent with a single punch.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2015,
    rating: '8.8',
    genre: ['Action', 'Comedy', 'Anime'],
    seasons: 3,
    episodes: [
      {
        id: 'opm-s1e1',
        title: 'The Strongest Man',
        description: 'Saitama faces the Subterranean King.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '24m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/one-punch-man/1/1'
      }
    ],
    type: 'series'
  }
];

export const regularSeries: Series[] = [
  {
    id: 'money-heist',
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2017,
    rating: '8.2',
    genre: ['Action', 'Crime', 'Drama'],
    seasons: 5,
    episodes: [
      {
        id: 'money-heist-s1e1',
        title: 'Do As Planned',
        description: 'The Professor recruits a young female robber and seven other criminals for a grand heist.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '47m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/money-heist/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned meth cook partners with a former student.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2008,
    rating: '9.5',
    genre: ['Crime', 'Drama', 'Thriller'],
    seasons: 5,
    episodes: [
      {
        id: 'breaking-bad-s1e1',
        title: 'Pilot',
        description: 'Walter White, a chemistry teacher, is diagnosed with cancer and turns to cooking meth.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '58m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/breaking-bad/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: '8.7',
    genre: ['Drama', 'Fantasy', 'Horror'],
    seasons: 4,
    episodes: [
      {
        id: 'stranger-things-s1e1',
        title: 'The Vanishing of Will Byers',
        description: 'Will Byers disappears while cycling home from a campaign night.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '49m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/stranger-things/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'the-crown',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: '8.7',
    genre: ['Biography', 'Drama', 'History'],
    seasons: 6,
    episodes: [
      {
        id: 'the-crown-s1e1',
        title: 'Wolferton Splash',
        description: 'A young Princess Elizabeth marries Prince Philip.',
        thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=225&fit=crop',
        duration: '57m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/the-crown/1/1'
      }
    ],
    type: 'series'
  },
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    description: 'Nine noble families fight for control over the lands of Westeros.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
    year: 2011,
    rating: '9.3',
    genre: ['Action', 'Adventure', 'Drama'],
    seasons: 8,
    episodes: [
      {
        id: 'got-s1e1',
        title: 'Winter Is Coming',
        description: 'Eddard Stark is torn between his family and an old friend.',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        duration: '62m',
        episodeNumber: 1,
        seasonNumber: 1,
        videoUrl: 'https://embed.vidsrc.pk/series/game-of-thrones/1/1'
      }
    ],
    type: 'series'
  }
];

export const series: Series[] = [...animeSeries, ...regularSeries];

export const allContent: Content[] = [...movies, ...series];

export const categories = [
  { name: 'Featured', content: allContent.slice(0, 4) },
  { name: 'Movies', content: movies },
  { name: 'Series', content: series },
  { name: 'Action & Adventure', content: allContent.filter(item => item.genre.includes('Action') || item.genre.includes('Adventure')) },
  { name: 'Animation', content: allContent.filter(item => item.genre.includes('Animation')) },
  { name: 'Sci-Fi', content: allContent.filter(item => item.genre.includes('Sci-Fi')) }
];

/**
 * Games inventory — single source of truth for cosmicrafts.com.
 * 2026 new: Bevy Adventures + Star Drifter.
 * DAO classics: Adventures 3D (2025), 2D (2019), Alpha 2021, Beta 2022.
 * Live: Rush (external). Banner: Battlegrounds (Epic + itch.io).
 */
export type GameStatus = 'live' | 'playable' | 'external' | 'soon';

export interface Game {
  id: string;
  name: string;
  year: string;
  tag: string;
  tagColor: 'emerald' | 'cyan' | 'purple' | 'rose' | 'amber';
  description: string;
  image: string;
  status: GameStatus;
  statusLabel: string;
  /** Unity WebGL build dir under /games/ (for playable), or external URL */
  buildDir?: string;
  /** Local embed URL (iframe): trunk WASM dist under /games/ */
  embed?: string;
  loader?: string;
  data?: string;
  framework?: string;
  code?: string;
  productName?: string;
  playRoute?: string;
  externalUrl?: string;
  repo: string;
  features: string[];
  /** Vue DAO card fields (1:1 port) */
  badge: string;
  badgeClass: 'prototype' | 'classic' | 'alpha' | 'beta' | 'live' | 'new';
  genre: string;
  release: string;
}

export const GAMES: Game[] = [
  {
    id: 'stardrifter',
    name: 'Star Drifter',
    year: '2026',
    tag: 'NEW',
    tagColor: 'emerald',
    description: 'Space drifting en Bevy. Derrapa entre sectores, encadena drift y sobrevive al Dark Rift.',
    image: '/assets/planet.webp',
    status: 'playable',
    statusLabel: 'Jugable',
    embed: '/games/stardrifter/',
    playRoute: '/play/stardrifter',
    repo: 'https://github.com/cosmicrafts/Star-Drifter',
    features: ['Drift', 'Bevy', 'Arcade'],
    badge: 'New',
    badgeClass: 'new',
    genre: 'Arcade Drift',
    release: 'Released: 2026',
  },
  {
    id: 'adventures-bevy',
    name: 'Adventures Bevy',
    year: '2026',
    tag: 'NEW',
    tagColor: 'emerald',
    description: 'El modo historia reconstruido en Rust + Bevy. Progresión, equipo y oleadas.',
    image: '/assets/starter-ship.webp',
    status: 'playable',
    statusLabel: 'Jugable',
    embed: '/games/adventures-bevy/',
    playRoute: '/play/adventures-bevy',
    repo: 'https://github.com/cosmicrafts/Adventures-Bevy',
    features: ['Historia', 'Bevy', 'WASM'],
    badge: 'New',
    badgeClass: 'new',
    genre: '3D RPG',
    release: 'Released: 2026',
  },
  {
    id: 'rush',
    name: 'Cosmic Rush',
    year: '2025',
    tag: 'LIVE',
    tagColor: 'cyan',
    description: 'Carreras de naves con IA y caos. Apuesta SPIRAL, mira la carrera y colecciona logros.',
    image: '/assets/games/rush.svg',
    status: 'external',
    statusLabel: 'En vivo',
    playRoute: '',
    externalUrl: 'https://rush.cosmicrafts.com',
    repo: 'https://github.com/cosmicrafts/Rush',
    features: ['Carreras IA', 'Pagos instantáneos', 'Cartas NFT'],
    badge: 'Live',
    badgeClass: 'live',
    genre: 'Racing',
    release: 'Live',
  },
  {
    id: 'adventures-3d',
    name: 'Adventures 3D',
    year: '2025',
    tag: 'PROTOTYPE',
    tagColor: 'emerald',
    description: 'Shooter isométrico con generación procedural. Explora, pelea y varía cada run.',
    image: '/assets/games/adventures-3d.webp',
    status: 'playable',
    statusLabel: 'Jugable',
    buildDir: '/games/adventures-3d',
    loader: 'Cosmicrafts.loader.js',
    data: 'Cosmicrafts.data.br',
    framework: 'Cosmicrafts.framework.js.br',
    code: 'Cosmicrafts.wasm.br',
    productName: 'Cosmicrafts',
    playRoute: '/play/adventures-3d',
    repo: 'https://github.com/cosmicrafts/Adventures',
    features: ['Aventura', '3D', 'RPG'],
    badge: 'Prototype',
    badgeClass: 'prototype',
    genre: '3D RPG',
    release: 'Prototype',
  },
  {
    id: 'cosmicrafts-2d',
    name: 'Cosmicrafts 2D',
    year: '2019',
    tag: 'CLASSIC',
    tagColor: 'purple',
    description: 'El RTS 2D original que empezó todo. Rápido, retro y táctico puro.',
    image: '/assets/games/cosmicrafts-2d.webp',
    status: 'playable',
    statusLabel: 'Clásico',
    buildDir: '/games/cosmicrafts-2d',
    loader: 'Cosmicrafts2D.loader.js',
    data: 'Cosmicrafts2D.data.br',
    framework: 'Cosmicrafts2D.framework.js.br',
    code: 'Cosmicrafts2D.wasm.br',
    productName: 'Cosmicrafts2D',
    playRoute: '/play/cosmicrafts-2d',
    repo: 'https://github.com/cosmicrafts/Cosmicrafts-2D',
    features: ['RTS', 'Retro', '2D'],
    badge: 'Classic',
    badgeClass: 'classic',
    genre: '2D RTS',
    release: 'Classic',
  },
  {
    id: 'alpha-2021',
    name: 'Alpha 2021',
    year: '2021',
    tag: 'ALPHA',
    tagColor: 'rose',
    description: 'El primer prototipo 3D jugable. La base del metaverso multiplataforma.',
    image: '/assets/games/alpha-2021.webp',
    status: 'soon',
    statusLabel: 'Archivo',
    playRoute: '/play/alpha-2021',
    repo: 'https://github.com/cosmicrafts/Cosmicrafts3D-2021-DSCVR-Hackathon',
    features: ['RTS 3D', 'Prototipo', 'Histórico'],
    badge: 'Alpha',
    badgeClass: 'alpha',
    genre: '3D RTS',
    release: 'Released: 2021',
  },
  {
    id: 'beta-2022',
    name: 'Beta 2022',
    year: '2022',
    tag: 'BETA',
    tagColor: 'amber',
    description: 'La beta abierta con la comunidad. Héroes, mazos y NFTs de beta.',
    image: '/assets/games/beta-2022.webp',
    status: 'soon',
    statusLabel: 'Archivo',
    playRoute: '/play/beta-2022',
    repo: 'https://github.com/cosmicrafts/Cosmicrafts-2022',
    features: ['Multijugador', 'Héroes', 'Beta-NFTs'],
    badge: 'Beta',
    badgeClass: 'beta',
    genre: '3D RTS',
    release: 'Released: 2022',
  },
];

export const BATTLEGROUNDS = {
  name: 'Cosmicrafts Battlegrounds',
  description: 'La próxima evolución del RTS en cadena. Agrégalo a tu lista y prueba la demo.',
  image: '/assets/games/banner-battlegrounds.webp',
  logo: '/assets/games/battlegrounds.webp',
  epicUrl: 'https://store.epicgames.com/en-US/p/cosmicrafts-499a8f',
  itchUrl: 'https://ohsalmeron.itch.io/cosmicrafts',
};

export const getGame = (id: string): Game | undefined => GAMES.find((g) => g.id === id);

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
  /** Local embed URL (iframe): trunk WASM dist or static Rush app */
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
  },
  {
    id: 'rush',
    name: 'Cosmic Rush',
    year: '2025',
    tag: 'LIVE',
    tagColor: 'cyan',
    description: 'Carreras de naves 1v1 en cadena. Apuesta, mira la carrera y desbloquea logros.',
    image: '/assets/games/rush.svg',
    status: 'live',
    statusLabel: 'En vivo',
    embed: '/rush/',
    playRoute: '/play/rush',
    repo: 'https://github.com/cosmicrafts/Rush',
    features: ['Carreras', 'On-chain', 'Apuestas'],
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
  },
  {
    id: 'alpha-2021',
    name: 'Alpha 2021',
    year: '2021',
    tag: 'ALPHA',
    tagColor: 'rose',
    description: 'El primer prototipo 3D jugable. La base del metaverso multiplataforma.',
    image: '/assets/games/alpha-2021.webp',
    status: 'playable',
    statusLabel: 'Alpha',
    buildDir: '/games/alpha-2021',
    loader: 'Cosmicrafts2021.loader.js',
    data: 'Cosmicrafts2021.data.br',
    framework: 'Cosmicrafts2021.framework.js.br',
    code: 'Cosmicrafts2021.wasm.br',
    productName: 'Cosmicrafts Alpha 2021',
    playRoute: '/play/alpha-2021',
    repo: 'https://github.com/cosmicrafts/Cosmicrafts3D-2021-DSCVR-Hackathon',
    features: ['RTS 3D', 'Prototipo', 'Histórico'],
  },
  {
    id: 'beta-2022',
    name: 'Beta 2022',
    year: '2022',
    tag: 'BETA',
    tagColor: 'amber',
    description: 'La beta abierta con la comunidad. Héroes, mazos y NFTs de beta.',
    image: '/assets/games/beta-2022.webp',
    status: 'playable',
    statusLabel: 'Beta',
    buildDir: '/games/beta-2022',
    loader: 'Cosmicrafts2022.loader.js',
    data: 'Cosmicrafts2022.data.br',
    framework: 'Cosmicrafts2022.framework.js.br',
    code: 'Cosmicrafts2022.wasm.br',
    productName: 'Cosmicrafts Beta 2022',
    playRoute: '/play/beta-2022',
    repo: 'https://github.com/cosmicrafts/Cosmicrafts-2022',
    features: ['Multijugador', 'Héroes', 'Beta-NFTs'],
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

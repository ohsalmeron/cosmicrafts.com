/**
 * World of Unreal Identity (wou-id) SDK
 * Zero-dependency pure TypeScript client for Battle.net meets Web3 ecosystem.
 */

export interface WouIdentity {
  provider: string;
  external_id: string;
  linked_at: number;
}

export interface EmbeddedWallets {
  evm_address: string;
  solana_address: string;
  icp_principal: string;
  bitcoin_address: string;
}

export interface CrossGameProfile {
  sow_rank: string;
  sow_elo: number;
  sow_matches: number;
  sow_wins: number;
  sow_faction: string;
  cosmicrafts_level: number;
  cosmicrafts_fleet_power: number;
  nftropoly_net_worth: number;
  nftropoly_titles: number;
}

export interface UserProfile {
  avatar_url?: string | null;
  banner_url?: string | null;
  country?: string | null;
  bio?: string | null;
  is_verified?: boolean;
}

export interface SocialActivity {
  id: string;
  account_id: string;
  username: string;
  display_name: string;
  avatar_url?: string | null;
  activity_type: string;
  title: string;
  description: string;
  game: string;
  timestamp: number;
}

export interface Clan {
  tag: string;
  name: string;
  description: string;
  leader_id: string;
  leader_username: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  member_count: number;
  created_at: number;
}

export interface ClanMember {
  account_id: string;
  username: string;
  display_name: string;
  avatar_url?: string | null;
  animal_emoji?: string | null;
  role: 'leader' | 'officer' | 'member';
  joined_at: number;
}

export interface ClanDetails {
  clan: Clan;
  members: ClanMember[];
}

export interface PlayerSearchResult {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string | null;
  animal_emoji?: string | null;
  clan_tag?: string | null;
}

export interface WouAccount {
  id: string;
  username: string;
  display_name: string;
  email: string | null;
  newsletter_opt_in: boolean;
  kind: 'human' | 'agent' | 'anonymous';
  embedded_wallets: EmbeddedWallets;
  game_stats: CrossGameProfile;
  followers_count: number;
  following_count: number;
  clan_tag?: string | null;
  clan_name?: string | null;
  linked_identities: WouIdentity[];
  profile: UserProfile;
  created_at: number;
  updated_at: number;
}

export const ID_SERVER_URL = 'https://id.worldofunreal.com';

class WouAuthClient {
  private token: string | null = null;
  private user: WouAccount | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadSession();
    }
  }

  public loadSession(): void {
    try {
      this.token = localStorage.getItem('wou_session_token');
      const userRaw = localStorage.getItem('wou_user_data');
      if (userRaw) {
        this.user = JSON.parse(userRaw);
      }
      this.notify();

      // Refresh latest profile in background
      if (this.token && this.user?.id) {
        this.fetchProfile(this.user.id);
      }
    } catch {
      // Ignore storage errors
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  public getUser(): WouAccount | null {
    return this.user;
  }

  public getToken(): string | null {
    return this.token;
  }

  public openModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wou:open-modal'));
    }
  }

  public closeModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wou:close-modal'));
    }
  }

  public openEditProfileModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wou:open-edit-profile-modal'));
    }
  }

  public async fetchProfile(accountId: string): Promise<WouAccount | null> {
    try {
      const res = await fetch(`${ID_SERVER_URL}/api/v1/user/profile/${accountId}`, {
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      });
      if (res.ok) {
        const updated = await res.json();
        this.user = updated;
        if (typeof window !== 'undefined') {
          localStorage.setItem('wou_user_data', JSON.stringify(updated));
        }
        this.notify();
        return updated;
      }
    } catch {
      // Fail gracefully if offline
    }
    return null;
  }

  public async getUserByUsername(username: string): Promise<WouAccount | null> {
    try {
      const clean = username.trim().replace(/^@/, '');
      const res = await fetch(`${ID_SERVER_URL}/api/v1/user/by-username/${clean}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Network error
    }
    return null;
  }

  public async checkUsername(username: string): Promise<boolean> {
    try {
      const clean = username.trim().replace(/^@/, '');
      const currentId = this.user?.id || '';
      const res = await fetch(`${ID_SERVER_URL}/api/v1/user/check-username/${clean}?current_id=${currentId}`);
      if (res.ok) {
        const data = await res.json();
        return data.available;
      }
    } catch {
      // Ignore
    }
    return false;
  }

  public async updateProfile(data: {
    display_name?: string;
    username?: string;
    bio?: string;
    avatar_url?: string;
    banner_url?: string;
    country?: string;
  }): Promise<WouAccount> {
    if (!this.user?.id) throw new Error('Not authenticated.');

    const res = await fetch(`${ID_SERVER_URL}/api/v1/user/profile/${this.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.error || 'Failed to update profile.');
    }

    this.user = payload;
    if (typeof window !== 'undefined') {
      localStorage.setItem('wou_user_data', JSON.stringify(payload));
    }
    this.notify();
    return payload;
  }

  public async uploadMedia(file: Blob, mediaType: 'avatar' | 'banner'): Promise<{ url: string; account: WouAccount }> {
    if (!this.sessionToken) {
      throw new Error('You must be authenticated to upload media.');
    }

    const formData = new FormData();
    formData.append('media_type', mediaType);
    formData.append('file', file, `${mediaType}.webp`);

    const res = await fetch(`${ID_SERVER_URL}/api/v1/user/upload-media`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.sessionToken}`,
      },
      body: formData,
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.error || 'Failed to upload media.');
    }

    if (payload.account) {
      this.user = payload.account;
      if (typeof window !== 'undefined') {
        localStorage.setItem('wou_user_data', JSON.stringify(payload.account));
      }
      this.notify();
    }

    return payload;
  }

  public async followUser(targetId: string): Promise<void> {
    if (!this.token) throw new Error('Must be signed in to follow players.');
    const res = await fetch(`${ID_SERVER_URL}/api/v1/social/follow/${targetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to follow user.');
    }
    if (this.user?.id) await this.fetchProfile(this.user.id);
  }

  public async unfollowUser(targetId: string): Promise<void> {
    if (!this.token) throw new Error('Must be signed in.');
    const res = await fetch(`${ID_SERVER_URL}/api/v1/social/unfollow/${targetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to unfollow user.');
    }
    if (this.user?.id) await this.fetchProfile(this.user.id);
  }

  public async getSocialGraph(accountId: string): Promise<{ followers: string[]; following: string[] }> {
    try {
      const res = await fetch(`${ID_SERVER_URL}/api/v1/social/graph/${accountId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore
    }
    return { followers: [], following: [] };
  }

  public async getGlobalFeed(): Promise<SocialActivity[]> {
    try {
      const res = await fetch(`${ID_SERVER_URL}/api/v1/social/feed?limit=25`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Ignore
    }
    return [];
  }

  public async loginAnonymous(displayName?: string): Promise<any> {
    const res = await fetch(`${ID_SERVER_URL}/api/v1/auth/anonymous`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account_id: this.user?.id || null,
        display_name: displayName || null,
        context: 'world_of_unreal',
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Anonymous login failed.');

    this.setSession(data.session_token, data.account);
    this.closeModal();
    return data;
  }

  public async requestOtp(email: string, newsletterOptIn = false): Promise<any> {
    const res = await fetch(`${ID_SERVER_URL}/api/v1/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        account_id: this.user?.id || null,
        newsletter_opt_in: newsletterOptIn,
        context: 'world_of_unreal',
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP code.');
    return data;
  }

  public async verifyOtp(email: string, code: string): Promise<any> {
    const res = await fetch(`${ID_SERVER_URL}/api/v1/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        code,
        account_id: this.user?.id || null,
        context: 'world_of_unreal',
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid or expired code.');

    this.setSession(data.session_token, data.account);
    this.closeModal();
    return data;
  }

  public loginWithOAuth(provider: 'discord' | 'google' | 'twitter' | 'meta'): void {
    const currentUrl = window.location.href;
    const accountId = this.user?.id || '';
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('wou_oauth_provider', provider);
    }
    const redirectUri = window.location.origin + '/auth/callback';
    const targetUrl = `${ID_SERVER_URL}/api/v1/auth/oauth/login/${provider}?redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${encodeURIComponent(JSON.stringify({ returnTo: currentUrl, accountId }))}`;

    window.location.href = targetUrl;
  }

  public async handleOAuthCallback(provider: string, code: string): Promise<any> {
    const res = await fetch(`${ID_SERVER_URL}/api/v1/auth/oauth/callback/${provider}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        redirect_uri: window.location.origin + '/auth/callback',
        account_id: this.user?.id || null,
        context: 'world_of_unreal',
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'OAuth authentication failed.');
    }

    this.setSession(data.session_token, data.account);
    this.closeModal();
    return data;
  }

  public async loginWithSolana(): Promise<any> {
    const phantom = (window as any)?.phantom?.solana || (window as any)?.solana;
    if (!phantom || !phantom.isPhantom) {
      throw new Error('Phantom wallet not detected. Please install Phantom from phantom.app');
    }

    const connectResp = await phantom.connect();
    const publicAddress = connectResp.publicKey.toString();

    const challengeRes = await fetch(`${ID_SERVER_URL}/api/v1/auth/web3/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chain: 'solana', public_address: publicAddress }),
    });
    const challengeData = await challengeRes.json();
    if (!challengeRes.ok) throw new Error(challengeData.error || 'Failed to initiate challenge.');

    const messageBytes = new TextEncoder().encode(challengeData.message);
    const signedData = await phantom.signMessage(messageBytes, 'utf8');

    let signatureHex = '';
    if (signedData.signature) {
      const sigArr = Array.from(new Uint8Array(signedData.signature));
      signatureHex = '0x' + sigArr.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    const verifyRes = await fetch(`${ID_SERVER_URL}/api/v1/auth/web3/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chain: 'solana',
        public_address: publicAddress,
        signature: signatureHex,
        message: challengeData.message,
        account_id: this.user?.id || null,
        context: 'world_of_unreal',
      }),
    });

    const data = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(data.error || 'Solana signature verification failed.');

    this.setSession(data.session_token, data.account);
    this.closeModal();
    return data;
  }

  public async loginWithEthereum(): Promise<any> {
    const ethereum = (window as any)?.ethereum;
    if (!ethereum) {
      throw new Error('MetaMask/EVM wallet not detected. Please install MetaMask.');
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const publicAddress = accounts[0];

    const challengeRes = await fetch(`${ID_SERVER_URL}/api/v1/auth/web3/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chain: 'ethereum', public_address: publicAddress }),
    });
    const challengeData = await challengeRes.json();
    if (!challengeRes.ok) throw new Error(challengeData.error || 'Failed to initiate challenge.');

    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [challengeData.message, publicAddress],
    });

    const verifyRes = await fetch(`${ID_SERVER_URL}/api/v1/auth/web3/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chain: 'ethereum',
        public_address: publicAddress,
        signature,
        message: challengeData.message,
        account_id: this.user?.id || null,
        context: 'world_of_unreal',
      }),
    });

    const data = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(data.error || 'Ethereum signature verification failed.');

    this.setSession(data.session_token, data.account);
    this.closeModal();
    return data;
  }

  public async loginWithInternetIdentity(): Promise<any> {
    const { AuthClient } = await import('@dfinity/auth-client');
    const authClient = await AuthClient.create({
      idleOptions: {
        disableDefaultIdleCallback: true,
        disableIdle: true,
      },
    });

    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: 'https://id.ai/authorize',
        maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000), // 8 hours
        onSuccess: async () => {
          try {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal().toText();

            const verifyRes = await fetch(`${ID_SERVER_URL}/api/v1/auth/web3/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chain: 'internet_identity',
                public_address: principal,
                signature: 'id_ai_authenticated',
                message: 'id.ai authentication',
                account_id: this.user?.id || null,
                context: 'world_of_unreal',
              }),
            });

            const data = await verifyRes.json();
            if (!verifyRes.ok) {
              reject(new Error(data.error || 'Internet Identity verification failed.'));
              return;
            }

            this.setSession(data.session_token, data.account);
            this.closeModal();
            resolve(data);
          } catch (err: any) {
            reject(new Error(err.message || 'Error completing Internet Identity login.'));
          }
        },
        onError: (err) => {
          reject(new Error(err || 'Internet Identity login cancelled or failed.'));
        },
      });
    });
  }

  // Convenience Aliases
  public loginWithSocial(provider: 'discord' | 'google' | 'twitter' | 'meta'): void {
    return this.loginWithOAuth(provider);
  }

  public async loginWithEvm(): Promise<any> {
    return this.loginWithEthereum();
  }

  public async loginWithIcp(): Promise<any> {
    return this.loginWithInternetIdentity();
  }

  // ==========================================
  // PLAYER SEARCH & DISCOVERY
  // ==========================================

  public async searchPlayers(query: string, limit: number = 10): Promise<PlayerSearchResult[]> {
    const clean = query.trim();
    if (!clean) return [];

    try {
      const res = await fetch(`${ID_SERVER_URL}/api/v1/user/search?q=${encodeURIComponent(clean)}&limit=${limit}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  // ==========================================
  // CLANS & GUILDS
  // ==========================================

  public async createClan(tag: string, name: string, description?: string): Promise<Clan> {
    if (!this.token) throw new Error('You must be signed in to create a clan.');

    const res = await fetch(`${ID_SERVER_URL}/api/v1/clans/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ tag, name, description }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create clan.');
    }

    // Refresh profile in background
    if (this.user?.id) {
      this.fetchProfile(this.user.id);
    }

    return data;
  }

  public async getClan(tag: string): Promise<ClanDetails> {
    const cleanTag = tag.trim().toUpperCase();
    const res = await fetch(`${ID_SERVER_URL}/api/v1/clans/${encodeURIComponent(cleanTag)}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Clan [${cleanTag}] not found.`);
    }
    return data;
  }

  public async listClans(limit: number = 20): Promise<Clan[]> {
    try {
      const res = await fetch(`${ID_SERVER_URL}/api/v1/clans/list?limit=${limit}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  public async joinClan(tag: string): Promise<{ success: boolean; clan_tag: string }> {
    if (!this.token) throw new Error('You must be signed in to join a clan.');

    const cleanTag = tag.trim().toUpperCase();
    const res = await fetch(`${ID_SERVER_URL}/api/v1/clans/${encodeURIComponent(cleanTag)}/join`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Failed to join clan [${cleanTag}].`);
    }

    if (this.user?.id) {
      this.fetchProfile(this.user.id);
    }

    return data;
  }

  public async leaveClan(tag: string): Promise<{ success: boolean; message: string }> {
    if (!this.token) throw new Error('You must be signed in to leave a clan.');

    const cleanTag = tag.trim().toUpperCase();
    const res = await fetch(`${ID_SERVER_URL}/api/v1/clans/${encodeURIComponent(cleanTag)}/leave`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Failed to leave clan [${cleanTag}].`);
    }

    if (this.user?.id) {
      this.fetchProfile(this.user.id);
    }

    return data;
  }

  public logout(): void {
    this.token = null;
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wou_session_token');
      localStorage.removeItem('wou_user_data');
    }
    this.notify();
  }

  public setSession(token: string, account: WouAccount): void {
    this.token = token;
    this.user = account;
    if (typeof window !== 'undefined') {
      localStorage.setItem('wou_session_token', token);
      localStorage.setItem('wou_user_data', JSON.stringify(account));
    }
    this.notify();
  }

  private notify(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('wou:auth-state-change', {
          detail: {
            isAuthenticated: this.isAuthenticated(),
            user: this.user,
            token: this.token,
          },
        })
      );
    }
  }
}

// Singleton Instance
export const wouAuth = new WouAuthClient();

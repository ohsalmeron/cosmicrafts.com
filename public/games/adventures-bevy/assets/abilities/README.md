# Ability Definitions

Shared ability templates. Each `.ron` file defines one ability (id = filename). **Unit identity and tuning live in entity RONs** (`assets/units/`), not here.

## How entity RONs use abilities

### 1. Declare which abilities a unit has

In `assets/units/heroes/*.ron`, `assets/units/enemy_*.ron`, `assets/units/elite_void/*.ron`, etc.:

```ron
abilities: ["bullet", "beam", "laser", "orb", "dash"],
```

Each string is an ability **id** that must match a file in this folder (e.g. `bullet` → `bullet.ron`).

### 2. Basic attack (optional)

```ron
combat: (
    basic_attack_ability_id: Some("bullet"),
    ...
),
```

When set, the Shooter uses that ability’s `BulletEffect` for the primary attack (look + trajectory). Stats come from `combat` plus modifiers.

### 2.5 Per-hero bullet visuals (optional)

Keep `basic_attack_ability_id: Some("bullet")` and override only visuals in the unit RON:

```ron
bullet_visual_overrides: Some((
    projectile: Some((mode: Cylinder, color: Some((1.0, 0.8, 0.2)), radius: Some(0.08), length: Some(1.2))),
    muzzle_flash: Some((mode: SpriteAdditive, texture_path: Some("icons/burst.webp"), scale: Some(2.8))),
    impact: Some((mode: Sphere, color: Some((1.0, 0.5, 0.2)), scale: Some(2.0))),
)),
```

- `mode`: `Sphere`, `Cylinder`, or `SpriteAdditive` (projectile/muzzle/impact are independent).
- `color` + `emissive_intensity` control glow.
- `scale` is generic size; cylinder also supports `radius` + `length`.
- `texture_path` is used by `SpriteAdditive` mode.
- If omitted, values fall back to the base `bullet.ron` effect.

### 2.6 Per-unit trajectory (optional)

Override trajectory for bullet/burst projectiles so the unit defines how the shot moves (Straight or Zigzag; Zigzag can be Pointy or Wavy):

```ron
bullet_trajectory_overrides: Some((
    movement_style: Some(Zigzag),
    zigzag_amplitude: Some(1.5),
    zigzag_frequency: Some(2.0),
    zigzag_shape: Some(Wavy),
)),
```

All fields optional; only set what to override. Applies to basic-attack bullets and burst (Scatter Shot) projectiles. Ability RONs remain reference/defaults.

### 3. Per-unit tuning: `ability_modifiers`

Unit RONs can scale ability stats without touching ability files:

```ron
ability_modifiers: (
    beam_damage_multiplier: 1.4,
    beam_range_multiplier: 1.5,
    laser_cooldown_multiplier: -0.1,  // negative = faster cooldown
    orb_radius_multiplier: 1.2,
    dash_distance_multiplier: 1.0,
    // ... omit fields to use 1.0 (no change)
),
```

**Modifier keys** (by effect type):

| Effect  | Damage | Range | Speed | Cooldown | Other |
|---------|--------|-------|-------|----------|-------|
| bullet  | `bullet_damage_multiplier` | `bullet_range_multiplier` | `bullet_speed_multiplier` | `bullet_cooldown_multiplier` | — |
| laser  | `laser_damage_multiplier` | `laser_range_multiplier` | — | `laser_cooldown_multiplier` | `laser_duration_multiplier` |
| beam   | `beam_damage_multiplier` | `beam_range_multiplier` | — | `beam_cooldown_multiplier` | — |
| missile | `missile_damage_multiplier` | — | `missile_speed_multiplier` | `missile_cooldown_multiplier` | `missile_radius_multiplier` |
| orb    | `orb_damage_multiplier` | `orb_range_multiplier` | `orb_speed_multiplier` | `orb_cooldown_multiplier` | `orb_radius_multiplier` |
| burst  | `burst_damage_multiplier` | `burst_range_multiplier` | `burst_speed_multiplier` | `burst_cooldown_multiplier` | — |
| shockwave | `shockwave_damage_multiplier` | `shockwave_range_multiplier` | — | `shockwave_cooldown_multiplier` | — |
| dash   | — | — | — | `dash_cooldown_multiplier` | `dash_distance_multiplier`, `dash_duration_multiplier` |
| spawn_drone | — | — | — | `spawn_cooldown_multiplier` | `spawn_unit_health_multiplier`, `spawn_unit_damage_multiplier` |

### 4. AI ability preferences (enemies)

```ron
ai_ability_scores: {
    "bullet": 0.6,
    "orb": 0.8,
},
```

Higher score = AI prefers that ability more. Only list abilities the unit has.

---

## Available ability IDs

| id | File | Effect |
|----|------|--------|
| bullet | `bullet.ron` | Projectile basic attack |
| laser | `laser.ron` | Sustained beam |
| beam | `beam.ron` | Charged long-range beam |
| missile | `missile.ron` | Homing explosive |
| orb | `orb.ron` | Slow AOE projectile |
| burst | `burst.ron` | Scatter shot cone |
| shockwave | `shockwave.ron` | Instant AOE around caster |
| tractor_beam | `tractor_beam.ron` | Laser variant: pull toward caster |
| implosion | `implosion.ron` | Shockwave variant: pull inward |
| dash | `dash.ron` | Short-range teleport |
| spawn_drone | `spawn_drone.ron` | Summon drone companion |

---

## Where to customize

| Change | Where |
|--------|-------|
| Add/remove abilities for a unit | Unit RON: `abilities` array |
| Change base stats (damage, range, cooldown) for all users | Ability RON in this folder |
| Change stats for one unit only | Unit RON: `ability_modifiers` |
| Hotkey, icon, name | Ability RON `metadata` |

Ability RONs stay minimal; unit RONs hold the full per-entity customization.

---

## How to test trajectory

- **Bullet with Zigzag (Wavy):** Set `basic_attack_ability_id: Some("bullet_wavering")` on a unit (e.g. `assets/units/player.ron` or a hero). Run the game, fire at an enemy; the projectile should weave side-to-side (smooth sine).
- **Orb with Zigzag:** Use a unit that has orb (e.g. Voyager, Aurora companion). Cast orb from the ability bar; the projectile can use Straight or Zigzag (Pointy or Wavy).
- **Burst (Scatter Shot):** Units like Juggernaut or Sunfire Dune have burst. Get in range, use the ability or wait for auto-cast; you should see multiple projectiles in a cone. Trajectory for burst (Straight or Zigzag) can be set in `burst.ron` or via unit `bullet_trajectory_overrides`.

---

## Force semantics (push vs pull)

Many abilities apply force; **sign controls direction**. Same Rust logic, different RON values:

| Effect type | RON field | Positive | Negative |
|-------------|-----------|----------|----------|
| **Laser**, **Beam** | `force_along_beam` | Push away from caster | Pull toward caster (tractor) |
| **Shockwave** | `radial_force` (or legacy `pushback_force`) | Push outward (explosion) | Pull inward (implosion) |

- **Line (laser/beam)**: `force_along_beam: 20.0` = push, `-25.0` = pull. `0` = no force.
- **Radial (shockwave)**: `radial_force: Some(420.0)` = push, `Some(-300.0)` = implosion. Omit `radial_force` to use `pushback_force` (backward compat).

Example variants you can add as new ability RONs and assign to heroes: tractor beam (laser with negative `force_along_beam`), implosion (shockwave with negative `radial_force`). Other abilities (orb, burst, missile) can adopt the same signed-force pattern where it fits.

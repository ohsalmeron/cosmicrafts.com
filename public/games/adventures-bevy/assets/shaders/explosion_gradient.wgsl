// Radial gradient for explosion: center (bright) to edge (darker). No texture.
// Uniform layout must match ExplosionGradientUniform in effects.rs.

#import bevy_pbr::forward_io::{VertexOutput, FragmentOutput}

struct ExplosionGradientParams {
    center: vec3<f32>,
    _pad0: f32,
    radius: f32,
    _pad1: f32,
    _pad2: f32,
    _pad3: f32,
    color_center: vec3<f32>,
    _pad4: f32,
    color_edge: vec3<f32>,
    _pad5: f32,
    emissive_intensity: f32,
}

@group(#{MATERIAL_BIND_GROUP}) @binding(0)
var<uniform> params: ExplosionGradientParams;

@fragment
fn fragment(in: VertexOutput) -> FragmentOutput {
    let world_pos = vec3<f32>(in.world_position.x, in.world_position.y, in.world_position.z);
    let d = distance(world_pos, params.center);
    // t = 0 at center, 1 at surface (radius). Sphere may be scaled so radius is the start scale.
    let t = saturate(d / max(params.radius, 0.001));
    let rgb = mix(params.color_center, params.color_edge, t);
    let emissive = rgb * params.emissive_intensity;
    var out: FragmentOutput;
    out.color = vec4<f32>(emissive, 1.0);
    return out;
}

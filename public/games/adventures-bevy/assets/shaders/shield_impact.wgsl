// Shield impact: bright on the outside (rim), transparent toward center.
// Optional procedural noise and rim_erode_alpha (AllIn1-style).
// Uniform layout must match ShieldImpactUniform in shield_impact_material.rs.

#import bevy_pbr::forward_io::{VertexOutput, FragmentOutput}
#import "shaders/vfx_noise.wgsl"::value_noise_3d

struct ShieldImpactParams {
    emissive_color: vec4<f32>,
    fresnel_power: f32,
    camera_position: vec3<f32>,
    _pad: f32,
    alpha: f32,
    noise_scale: f32,
    noise_speed: f32,
    noise_amount: f32,
    rim_erode_alpha: f32,
    time: f32,
}

@group(#{MATERIAL_BIND_GROUP}) @binding(0)
var<uniform> params: ShieldImpactParams;
@group(#{MATERIAL_BIND_GROUP}) @binding(1) var impact_texture: texture_2d<f32>;
@group(#{MATERIAL_BIND_GROUP}) @binding(2) var impact_sampler: sampler;

@fragment
fn fragment(in: VertexOutput) -> FragmentOutput {
    // Force vec3 for WebGL/Naga: world_position can be vec4 in some pipelines.
    let world_pos = vec3<f32>(in.world_position.x, in.world_position.y, in.world_position.z);
    let N = normalize(vec3<f32>(in.world_normal.x, in.world_normal.y, in.world_normal.z));
    let V = normalize(params.camera_position - world_pos);
    let NdotV = saturate(dot(N, V));
    let fresnel = 1.0 - pow(NdotV, params.fresnel_power);

    var base_alpha = 0.08 + 0.92 * fresnel;
    base_alpha *= (1.0 - fresnel * params.rim_erode_alpha);

    let noise_p = world_pos * params.noise_scale + vec3<f32>(params.time * params.noise_speed, 0.0, 0.0);
    let n = value_noise_3d(noise_p);
    let noise_mod = 1.0 - params.noise_amount + params.noise_amount * n;
    var final_alpha = base_alpha * noise_mod * params.alpha;

    let rim_emissive = params.emissive_color.rgb * (params.emissive_color.a * fresnel);

    let tex = textureSample(impact_texture, impact_sampler, in.uv);
    final_alpha *= tex.a;
    let rgb = rim_emissive * tex.rgb;

    var out: FragmentOutput;
    out.color = vec4<f32>(rgb, final_alpha);
    return out;
}

// Emissive UI material: solid color with optional intensity for glow-like appearance.
// Used for popups and energy bar. Uniform layout must match EmissiveUiMaterial in emissive_ui.rs.

#import bevy_ui::ui_vertex_output::UiVertexOutput

struct EmissiveUiParams {
    color: vec4<f32>,
    emissive_intensity: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
}

// UiMaterial bind group is 1 (group 0 = view/globals). No MATERIAL_BIND_GROUP preprocessor for UI.
@group(1) @binding(0)
var<uniform> params: EmissiveUiParams;

@fragment
fn fragment(in: UiVertexOutput) -> @location(0) vec4<f32> {
    let rgb = params.color.rgb * params.emissive_intensity;
    let a = params.color.a;
    return vec4<f32>(rgb, a);
}

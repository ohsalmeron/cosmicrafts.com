// Simple 3D value noise for VFX (shield impact, etc.). WebGL-friendly.

fn hash3(p: vec3<i32>) -> f32 {
    let n = f32(p.x) * 0.1 + f32(p.y) * 0.2 + f32(p.z) * 0.3;
    return fract(sin(n * 43758.5453) * 43758.5453);
}

/// 3D value noise in [0, 1]. p is world position (e.g. world_pos * scale).
fn value_noise_3d(p: vec3<f32>) -> f32 {
    let pi = vec3<i32>(i32(floor(p.x)), i32(floor(p.y)), i32(floor(p.z)));
    let pf = fract(p);

    let n000 = hash3(pi);
    let n100 = hash3(pi + vec3<i32>(1, 0, 0));
    let n010 = hash3(pi + vec3<i32>(0, 1, 0));
    let n110 = hash3(pi + vec3<i32>(1, 1, 0));
    let n001 = hash3(pi + vec3<i32>(0, 0, 1));
    let n101 = hash3(pi + vec3<i32>(1, 0, 1));
    let n011 = hash3(pi + vec3<i32>(0, 1, 1));
    let n111 = hash3(pi + vec3<i32>(1, 1, 1));

    let fx = pf.x * pf.x * (3.0 - 2.0 * pf.x);
    let fy = pf.y * pf.y * (3.0 - 2.0 * pf.y);
    let fz = pf.z * pf.z * (3.0 - 2.0 * pf.z);

    let nx00 = mix(n000, n100, fx);
    let nx10 = mix(n010, n110, fx);
    let nx01 = mix(n001, n101, fx);
    let nx11 = mix(n011, n111, fx);

    let nxy0 = mix(nx00, nx10, fy);
    let nxy1 = mix(nx01, nx11, fy);

    return mix(nxy0, nxy1, fz);
}

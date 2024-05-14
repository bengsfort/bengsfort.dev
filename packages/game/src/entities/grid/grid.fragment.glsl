uniform vec4 descriptors[NUMBER_OF_DESCRIPTORS];
uniform float visibility;

varying vec3 _position;

float generate(in float spacing)
{
    vec2 coordinates = _position.xz / spacing;

    vec2 grid = abs(fract(coordinates - 0.5) - 0.5) / (2.0 * fwidth(coordinates));
    float line = min(grid.x, grid.y);

    return 0.75 - min(line, 0.75);
}

void main()
{
    vec4 color = vec4(0.0);

#if NUMBER_OF_DESCRIPTORS >= 2
    for (int i = 0; i < NUMBER_OF_DESCRIPTORS; ++i) {
        color = mix(vec4(descriptors[i].rgb, generate(descriptors[i].a)), color, color.a);
    }
#else
    color = mix(vec4(descriptors[0].rgb, generate(descriptors[0].a)), color, color.a);
#endif

    color.a *= pow(1.0 - clamp(distance(cameraPosition.xz, _position.xz) / visibility, 0.0, 1.0), 3.0);

    gl_FragColor = clamp(color, vec4(0.0), vec4(1.0));
}

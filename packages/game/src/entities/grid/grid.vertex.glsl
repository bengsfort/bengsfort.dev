uniform float visibility;

varying vec3 _position;

void main()
{
    vec3 vertex = position.xzy * visibility;
    vertex.xz += cameraPosition.xz;

    _position = vertex;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertex, 1.0);
}

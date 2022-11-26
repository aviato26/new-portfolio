

const circleFragShader = `

    uniform float time;
    varying vec2 vUv;

    void main(){

        vec2 uv = vUv;

        //float circle = step(sin((time)), fract(length(uv - 0.5) + time));
        float circle = step(0.01, fract(length(uv - 0.5) + time));        

        vec3 col = vec3(circle);

        gl_FragColor = vec4(col , 1);
    }
`;

export default circleFragShader;
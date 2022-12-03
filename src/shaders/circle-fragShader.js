

const circleFragShader = `

    uniform float time;
    uniform sampler2D frequencyTex;
    varying vec2 vUv;

    void main(){

        vec2 uv = vUv;

        //float frqData = texture2D(frequencyTex, uv).r / 255.0;
        float data = texture2D(frequencyTex, uv - 0.5).r / 5.0;        

        float c = length(uv - 0.5);

        //float circle = step(0.01, fract(length(uv - 0.5) + time));        
        //float circle = step(0.5, frqData * length(uv - 0.5));        
        //float circle = step(0.4, fract(length(uv - 0.5) + data));        
        //float circle = step(0.01, (length(length(data) - c)));                
        float circle = step(0.01, (length(length(data) - c)));                        

        vec3 col = vec3(circle);

        gl_FragColor = vec4(col , 1);
    }
`;

export default circleFragShader;
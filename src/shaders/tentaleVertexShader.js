



const vertexShader = `

    uniform float time;

    void main(){

        vec3 pos = position;
        vec3 norm = normal;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1);
    }

`;

export default vertexShader;
import { useEffect, useRef } from "react";

const FRAG = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;

#define A(x, y) abs(dot(sin(x), vec3(y)))

void mainImage(out vec4 o, vec2 u) {
    float i, d, s, l, t = iTime + sin(iTime) / 2.;
    vec3 q, p, r = iResolution;
    o = vec4(0.0);
    for (i = 0.0; i < 1e2; i += 1.0) {
        for (p = vec3((u + u - r.xy) / r.y * d, d - 7e1),
             q = p,
             p.yz *= mat2(cos(1.2 + vec4(0, 33, 11, 0))),
             p.z += t * 3e1,
             s = .03; s < 4.; s += s) {
            p.yz -= A(t + t + .32 * p / s, s);
            q += A(.3 * q.z + t + .7 * q / s, s / 8.);
        }
        l = length(vec2(d - 130., p));
        p *= vec3(.125, .6, 1);
        s = min(.2 + .4 * abs(q.y + 2e1 + sin(l * .2 - t * 1e1)),
                .3 + .3 * abs(3. - length(p.xy)) - min(0., q.y + 12.));
        d += s;
        o += 1. / s;
    }
    o = tanh(o * o / 2e4);
}

void main() {
    vec4 c;
    mainImage(c, gl_FragCoord.xy);
    gl_FragColor = c;
}
`;

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

export function ShaderCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      resize();
      gl.uniform3f(uRes, canvas.width, canvas.height, 1);
      gl.uniform1f(uTime, (performance.now() - startRef.current) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: active ? 1 : 0, transition: "opacity 500ms ease" }}
    />
  );
}

import { useEffect, useRef } from 'react';

// ─── Tipos ────────────────────────────────────────────────
interface Pt3 { x: number; y: number; z: number }
type Edge = [number, number];
interface Mesh { pts: Pt3[]; edges: Edge[] }

// ─── Rotações ─────────────────────────────────────────────
const rotX = (p: Pt3, a: number): Pt3 => ({
  x: p.x,
  y: p.y * Math.cos(a) - p.z * Math.sin(a),
  z: p.y * Math.sin(a) + p.z * Math.cos(a),
});
const rotY = (p: Pt3, a: number): Pt3 => ({
  x: p.x * Math.cos(a) + p.z * Math.sin(a),
  y: p.y,
  z: -p.x * Math.sin(a) + p.z * Math.cos(a),
});
const project = (p: Pt3, cx: number, cy: number, sc: number): [number, number, number] => {
  const fov = 3.5;
  const s = fov / (fov + p.z);
  return [cx + p.x * sc * s, cy - p.y * sc * s, p.z];
};

// ─────────────────────────────────────────────────────────
// ENGRENAGEM
// ─────────────────────────────────────────────────────────
function buildGear(): Mesh {
  const pts: Pt3[] = [];
  const edges: Edge[] = [];
  const teeth = 12;
  const R = 0.75;        // raio externo
  const r = 0.58;        // raio interno
  const hubR = 0.18;     // furo central
  const half = 0.18;     // meia espessura

  const frontOut: number[] = [];
  const backOut: number[] = [];
  const frontIn: number[] = [];
  const backIn: number[] = [];

  for (let t = 0; t < teeth; t++) {
    const base = (2 * Math.PI * t) / teeth;
    const hw = Math.PI / teeth * 0.42;

    // 4 ângulos por dente
    const angles = [base - hw * 1.4, base - hw * 0.5, base + hw * 0.5, base + hw * 1.4];
    const radii = [r, R, R, r];

    angles.forEach((a, k) => {
      const px = radii[k] * Math.cos(a);
      const pz = radii[k] * Math.sin(a);
      frontOut.push(pts.length); pts.push({ x: px, y: half, z: pz });
      backOut.push(pts.length); pts.push({ x: px, y: -half, z: pz });
      frontIn.push(pts.length); pts.push({ x: (r * 0.72) * Math.cos(a), y: half, z: (r * 0.72) * Math.sin(a) });
      backIn.push(pts.length); pts.push({ x: (r * 0.72) * Math.cos(a), y: -half, z: (r * 0.72) * Math.sin(a) });
    });
  }

  const n = frontOut.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    edges.push([frontOut[i], frontOut[j]]);
    edges.push([backOut[i], backOut[j]]);
    edges.push([frontIn[i], frontIn[j]]);
    edges.push([backIn[i], backIn[j]]);
    // paredes
    edges.push([frontOut[i], backOut[i]]);
    // raios a cada 4
    if (i % 4 === 0) {
      edges.push([frontOut[i], frontIn[i]]);
      edges.push([backOut[i], backIn[i]]);
    }
  }

  // Hub (furo central)
  const segsHub = 20;
  const hF: number[] = [];
  const hB: number[] = [];
  for (let i = 0; i < segsHub; i++) {
    const a = (2 * Math.PI * i) / segsHub;
    hF.push(pts.length); pts.push({ x: hubR * Math.cos(a), y: half, z: hubR * Math.sin(a) });
    hB.push(pts.length); pts.push({ x: hubR * Math.cos(a), y: -half, z: hubR * Math.sin(a) });
  }
  for (let i = 0; i < segsHub; i++) {
    const j = (i + 1) % segsHub;
    edges.push([hF[i], hF[j]]);
    edges.push([hB[i], hB[j]]);
    if (i % 4 === 0) edges.push([hF[i], hB[i]]);
  }

  return { pts, edges };
}

// ─────────────────────────────────────────────────────────
// CÉREBRO
// ─────────────────────────────────────────────────────────
function buildBrain(): Mesh {
  const pts: Pt3[] = [];
  const edges: Edge[] = [];
  const rings = 10;
  const segs = 20;

  const addLobe = (ox: number) => {
    const start = pts.length;
    const idx: number[][] = [];

    for (let i = 0; i <= rings; i++) {
      const phi = (Math.PI * i) / rings;
      const row: number[] = [];
      for (let j = 0; j < segs; j++) {
        const theta = (2 * Math.PI * j) / segs;
        // deformação que simula os sulcos do cérebro
        const ridge = 1 + 0.14 * Math.sin(5 * phi + 0.5) * Math.cos(4 * theta)
          + 0.07 * Math.sin(9 * phi) * Math.sin(7 * theta);
        const ax = ox + ridge * 0.44 * Math.sin(phi) * Math.cos(theta);
        const ay = ridge * 0.55 * Math.cos(phi);
        const az = ridge * 0.38 * Math.sin(phi) * Math.sin(theta);
        row.push(pts.length);
        pts.push({ x: ax, y: ay, z: az });
      }
      idx.push(row);
    }

    // arestas horizontais (anéis)
    for (let i = 0; i <= rings; i++) {
      for (let j = 0; j < segs; j++) {
        edges.push([idx[i][j], idx[i][(j + 1) % segs]]);
      }
    }
    // arestas verticais (meridianos — menos densos)
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segs; j += 2) {
        edges.push([idx[i][j], idx[i + 1][j]]);
      }
    }
  };

  addLobe(-0.26);   // lobo esquerdo
  addLobe(0.26);    // lobo direito

  // sulco central
  const sulcoY = [-0.52, -0.3, -0.1, 0.1, 0.3, 0.52];
  const sulco: number[] = [];
  sulcoY.forEach(y => { sulco.push(pts.length); pts.push({ x: 0, y, z: 0 }); });
  for (let i = 0; i < sulco.length - 1; i++) edges.push([sulco[i], sulco[i + 1]]);

  return { pts, edges };
}

// ─────────────────────────────────────────────────────────
// REDE NEURAL
// ─────────────────────────────────────────────────────────
function buildNeuralNet(): Mesh {
  const pts: Pt3[] = [];
  const edges: Edge[] = [];

  // Camadas: input (5 nós), hidden1 (7), hidden2 (7), output (4)
  const layers: [number, number][] = [
    [5, -0.9],
    [7, -0.3],
    [7, 0.3],
    [4, 0.9],
  ];

  const layerIndices: number[][] = [];

  layers.forEach(([count, x]) => {
    const row: number[] = [];
    const spread = 0.85;
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : (i / (count - 1)) - 0.5;
      // distribui em arco leve no eixo Y/Z para dar profundidade 3D
      const y = t * spread;
      const z = Math.sin(t * Math.PI * 0.7) * 0.25;
      row.push(pts.length);
      pts.push({ x, y, z });
    }
    layerIndices.push(row);
  });

  // Conecta camadas adjacentes (todas as combinações)
  for (let l = 0; l < layerIndices.length - 1; l++) {
    for (const a of layerIndices[l]) {
      for (const b of layerIndices[l + 1]) {
        edges.push([a, b]);
      }
    }
  }

  // Nó central extra (hub) conectado às camadas centrais
  const hub = pts.length;
  pts.push({ x: 0, y: 0, z: 0.5 });
  layerIndices[1].forEach(i => edges.push([hub, i]));
  layerIndices[2].forEach(i => edges.push([hub, i]));

  return { pts, edges };
}

// ─────────────────────────────────────────────────────────
// ESPIRAL DE FIBONACCI (Razão Áurea em 3D)
// ─────────────────────────────────────────────────────────
function buildFibonacci(): Mesh {
  const pts: Pt3[] = [];
  const edges: Edge[] = [];
  const phi = 1.6180339887;

  // Espiral logarítmica compacta — cresce até raio máximo 0.75
  // e é normalizada para caber dentro do canvas
  const steps = 120;
  const turns = 2.8;
  const maxR = 0.75;

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);           // 0..1
    const theta = t * turns * 2 * Math.PI;
    // raio normalizado com curva golden
    const r = maxR * (Math.pow(phi, t * turns) - 1) / (Math.pow(phi, turns) - 1);
    pts.push({
      x: r * Math.cos(theta),
      y: (t - 0.5) * 0.3,               // leve variação vertical
      z: r * Math.sin(theta),
    });
    if (i > 0) edges.push([i - 1, i]);
  }

  // Raios a partir do centro nos ângulos dos números de Fibonacci
  const fibAngles = [1, 2, 3, 5, 8, 13, 21].map(n =>
    (n / 34) * turns * 2 * Math.PI
  );
  fibAngles.forEach(theta => {
    const i = pts.length;
    pts.push({ x: 0, y: 0, z: 0 });                                         // centro
    const r = maxR * 0.9;
    pts.push({ x: r * Math.cos(theta), y: 0, z: r * Math.sin(theta) });     // borda
    edges.push([i, i + 1]);
  });

  // Ponto central explícito
  const ci = pts.length;
  pts.push({ x: 0, y: 0, z: 0 });
  // conecta ao primeiro ponto da espiral
  edges.push([ci, 0]);

  return { pts, edges };
}

// ─────────────────────────────────────────────────────────
// ÍCONE DE CÓDIGO / PROGRAMAÇÃO
// ─────────────────────────────────────────────────────────
function buildCode(): Mesh {
  const pts: Pt3[] = [];
  const edges: Edge[] = [];

  // Função auxiliar — adiciona um retângulo 3D (linha de código)
  const addLine = (x0: number, x1: number, y: number, depth: number) => {
    const i = pts.length;
    pts.push(
      { x: x0, y, z: depth },
      { x: x1, y, z: depth },
      { x: x1, y, z: -depth },
      { x: x0, y, z: -depth },
    );
    edges.push([i, i + 1], [i + 1, i + 2], [i + 2, i + 3], [i + 3, i], [i, i + 2], [i + 1, i + 3]);
  };

  // Colchete esquerdo < />
  const bL = (ox: number, oy: number, s: number) => {
    const i = pts.length;
    pts.push(
      { x: ox + s, y: oy + s, z: 0.1 },
      { x: ox, y: oy, z: 0.1 },
      { x: ox + s, y: oy - s, z: 0.1 },
    );
    edges.push([i, i + 1], [i + 1, i + 2]);
    // Profundidade
    pts.push(
      { x: ox + s, y: oy + s, z: -0.1 },
      { x: ox, y: oy, z: -0.1 },
      { x: ox + s, y: oy - s, z: -0.1 },
    );
    edges.push([i + 3, i + 4], [i + 4, i + 5]);
    edges.push([i, i + 3], [i + 1, i + 4], [i + 2, i + 5]);
  };

  const bR = (ox: number, oy: number, s: number) => {
    const i = pts.length;
    pts.push(
      { x: ox - s, y: oy + s, z: 0.1 },
      { x: ox, y: oy, z: 0.1 },
      { x: ox - s, y: oy - s, z: 0.1 },
    );
    edges.push([i, i + 1], [i + 1, i + 2]);
    pts.push(
      { x: ox - s, y: oy + s, z: -0.1 },
      { x: ox, y: oy, z: -0.1 },
      { x: ox - s, y: oy - s, z: -0.1 },
    );
    edges.push([i + 3, i + 4], [i + 4, i + 5]);
    edges.push([i, i + 3], [i + 1, i + 4], [i + 2, i + 5]);
  };

  // Linhas de código (simulando indentação)
  const codeLines = [
    [-0.7, 0.2, 0.55, 0.12],
    [-0.5, 0.4, 0.35, 0.10],
    [-0.3, 0.5, 0.15, 0.08],
    [-0.3, 0.5, -0.15, 0.08],
    [-0.5, 0.4, -0.35, 0.10],
    [-0.7, 0.2, -0.55, 0.12],
  ];
  codeLines.forEach(([x0, x1, y, d]) => addLine(x0, x1, y, d));

  // Colchetes < />
  bL(-0.85, 0, 0.28);
  bR(0.65, 0, 0.28);

  // Barra de divisão centralizada ( / )
  const i = pts.length;
  pts.push({ x: 0.1, y: 0.35, z: 0.1 }, { x: -0.1, y: -0.35, z: 0.1 });
  pts.push({ x: 0.1, y: 0.35, z: -0.1 }, { x: -0.1, y: -0.35, z: -0.1 });
  edges.push([i, i + 1], [i + 2, i + 3], [i, i + 2], [i + 1, i + 3]);

  return { pts, edges };
}

const MESHES = {
  gear: buildGear(),
  brain: buildBrain(),
  neural: buildNeuralNet(),
  fibonacci: buildFibonacci(),
  code: buildCode(),
};

export type WireframeShape = keyof typeof MESHES;

interface Props {
  forma: WireframeShape;
  width?: number;
  height?: number;
  className?: string;
  scrollProgress?: number;
}

export function WireframeIcon3D({ forma, width = 500, height = 500, className = '', scrollProgress = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const angleRef = useRef({ y: 0, x: 0.15 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) * 0.52;

    const { pts, edges } = MESHES[forma];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotação base contínua
      angleRef.current.y += 0.006;
      
      // Efeito Parallax: O scroll altera a inclinação X e adiciona uma rotação Y extra
      const targetX = 0.15 + (scrollProgress * 1.5);
      const currentX = angleRef.current.x;
      // Suavização da transição do ângulo X
      angleRef.current.x = currentX + (targetX - currentX) * 0.1;

      const transformed = pts.map(p => {
        const q = rotX(p, angleRef.current.x);
        // Adiciona um pouco de rotação Y baseada no scroll para dinamismo
        const r = rotY(q, angleRef.current.y + (scrollProgress * 2));
        return project(r, cx, cy, scale);
      });

      // Arestas com alpha por profundidade
      edges.forEach(([a, b]) => {
        const [ax, ay, az] = transformed[a];
        const [bx, by, bz] = transformed[b];
        const depth = ((az + bz) / 2 + 2) / 4;
        const alpha = 0.15 + depth * 0.7;
        ctx.strokeStyle = `rgba(220,220,220,${alpha.toFixed(2)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      // Pontos nos vértices
      transformed.forEach(([px, py, pz]) => {
        const depth = (pz + 2) / 4;
        const r = 0.6 + depth * 1.4;
        ctx.fillStyle = `rgba(255,255,255,${(0.25 + depth * 0.65).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [forma, width, height]);

  return <canvas ref={canvasRef} className={className} />;
}

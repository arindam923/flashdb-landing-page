"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Accurate world map dot coordinates in [longitude, latitude] format
// These are mapped to a flat equirectangular projection first, then projected onto a sphere
const CONTINENT_OUTLINES: [number, number][] = [
  // North America - west coast
  [-125, 48], [-124, 46], [-124, 44], [-124, 42], [-124, 40], [-122, 38], [-120, 36], [-118, 34],
  [-120, 32], [-118, 30], [-116, 28], [-114, 26],
  // North America - east coast
  [-66, 44], [-68, 44], [-70, 44], [-72, 42], [-74, 40], [-76, 38], [-80, 32], [-81, 30], [-82, 28],
  [-84, 30], [-85, 32], [-87, 34], [-88, 30],
  // North America - top
  [-60, 46], [-62, 46], [-64, 46], [-66, 48], [-68, 48], [-70, 48], [-72, 46], [-76, 44], [-78, 44],
  [-80, 44], [-82, 46], [-84, 46], [-86, 46], [-88, 46], [-90, 46], [-92, 48], [-94, 48], [-96, 50],
  [-98, 52], [-100, 54], [-102, 54], [-104, 54], [-106, 56], [-108, 58], [-110, 58], [-112, 58],
  [-114, 58], [-116, 58], [-118, 58], [-120, 60], [-122, 60], [-124, 58], [-126, 56], [-128, 54],
  [-130, 54], [-132, 56], [-134, 58], [-136, 60], [-138, 60], [-140, 62], [-142, 62], [-144, 60],
  [-146, 60], [-148, 60], [-150, 60], [-152, 58], [-154, 58], [-156, 60], [-158, 62], [-160, 62],
  // Mexico
  [-90, 20], [-92, 18], [-94, 18], [-96, 20], [-98, 22], [-100, 24], [-102, 24], [-104, 22],
  [-106, 24], [-108, 26], [-110, 28], [-112, 30], [-114, 30],
  // Central America
  [-82, 10], [-84, 10], [-86, 12], [-88, 14], [-90, 14], [-92, 16],
  // Caribbean
  [-80, 22], [-78, 22], [-76, 20], [-74, 20], [-72, 18], [-70, 18],

  // South America - west coast
  [-80, 0], [-80, -2], [-78, -4], [-76, -6], [-76, -10], [-76, -14], [-76, -18], [-74, -22],
  [-72, -28], [-70, -32], [-70, -36], [-72, -40], [-72, -44], [-68, -48], [-66, -52], [-64, -56],
  // South America - east coast
  [-50, -28], [-48, -26], [-44, -22], [-42, -22], [-40, -20], [-38, -14], [-36, -10], [-34, -6],
  [-34, -4], [-34, -2], [-34, 0], [-36, 2], [-38, 4], [-40, 8],
  // South America - north coast
  [-62, 8], [-60, 8], [-58, 6], [-56, 4], [-54, 4], [-52, 4], [-50, 2], [-48, 0],
  [-46, 0], [-44, -2], [-42, -4],
  // Interior SA
  [-60, -10], [-58, -14], [-56, -18], [-54, -22], [-52, -26], [-50, -22], [-48, -18], [-46, -14],
  [-44, -10], [-42, -6], [-64, -18], [-62, -22],

  // Europe - western edge
  [-8, 38], [-8, 40], [-8, 42], [-8, 44], [-6, 46], [-4, 48], [-2, 50], [0, 50], [2, 50],
  [2, 48], [4, 46], [6, 44], [8, 44], [10, 44], [10, 46], [10, 48], [10, 50], [10, 52],
  [10, 54], [8, 56], [8, 58], [10, 60], [12, 60], [14, 58], [16, 56], [18, 54],
  [18, 56], [18, 58], [20, 60], [22, 60], [24, 60], [26, 60], [28, 60], [28, 58],
  [28, 56], [26, 54], [24, 54], [22, 54], [20, 54], [20, 52], [20, 50], [18, 50],
  [16, 48], [14, 48], [12, 46], [14, 44], [16, 42], [18, 42], [20, 40], [22, 40],
  [24, 38], [26, 40], [28, 42], [28, 44], [28, 46], [30, 46],
  // Scandinavia
  [14, 62], [14, 64], [16, 66], [18, 68], [20, 70], [22, 70], [24, 70], [26, 68],
  [28, 68], [28, 70], [26, 72], [24, 72], [22, 72], [16, 70],
  // British Isles
  [-6, 58], [-4, 58], [-2, 56], [-2, 54], [-4, 52], [-4, 50], [-2, 50],
  // Iberian Peninsula
  [-8, 36], [-6, 36], [-4, 36], [-2, 36], [0, 38], [2, 40], [0, 42], [-2, 42], [-4, 42],
  [-6, 40], [-6, 38],
  // Italy
  [10, 44], [12, 44], [14, 40], [16, 38], [16, 40], [14, 42],
  // Balkans
  [22, 42], [24, 42], [26, 42], [28, 42], [26, 40], [24, 38], [22, 38],
  // Turkey
  [30, 40], [32, 40], [34, 38], [36, 38], [38, 38], [40, 38], [42, 38], [36, 40],

  // Africa - north coast
  [-16, 16], [-14, 18], [-12, 20], [-10, 22], [-8, 24], [-6, 26], [-4, 28], [-2, 30],
  [0, 32], [2, 32], [4, 32], [6, 32], [8, 32], [10, 34], [12, 34], [14, 32], [16, 32],
  [18, 32], [20, 32], [22, 30], [24, 30], [26, 30], [28, 28], [30, 28], [32, 28], [34, 28],
  // Africa - east coast
  [40, 14], [40, 12], [42, 10], [44, 10], [42, 8], [42, 4], [42, 2], [42, 0], [40, -2],
  [40, -4], [40, -8], [38, -10], [38, -14], [38, -18], [36, -20], [34, -22], [32, -26],
  [32, -28], [32, -30], [30, -32], [28, -34],
  // Africa - south
  [26, -34], [24, -34], [22, -34], [20, -34], [18, -32], [16, -30], [14, -28], [12, -26],
  // Africa - west coast
  [10, -18], [8, -14], [8, -10], [8, -6], [6, -2], [4, 2], [2, 4], [0, 4], [-2, 4],
  [-4, 6], [-8, 6], [-10, 8], [-12, 10], [-14, 12], [-16, 14], [-18, 14],
  // Sahara interior
  [4, 20], [8, 20], [12, 22], [16, 22], [20, 22], [24, 22], [0, 18], [-4, 16],
  // Central Africa interior
  [16, 4], [20, 0], [24, -4], [28, -10], [32, -16], [24, 8], [20, 8], [16, 8],
  // Madagascar
  [44, -14], [46, -18], [48, -20], [46, -22], [44, -20], [44, -16],
  // Horn of Africa
  [42, 12], [44, 10], [46, 10], [48, 12], [50, 12], [50, 10], [48, 8], [44, 8],
  // Egypt / Sudan
  [30, 22], [32, 24], [34, 24], [36, 22], [34, 20], [32, 18], [30, 16],

  // Asia - Middle East
  [36, 36], [38, 36], [40, 36], [42, 36], [44, 34], [46, 32], [48, 30], [48, 28],
  [46, 26], [44, 24], [42, 22], [40, 18], [42, 14], [44, 14], [46, 16], [48, 18],
  [50, 22], [52, 24], [54, 24], [54, 22], [56, 24], [58, 24], [60, 26],
  // Iran / Afghanistan
  [44, 38], [46, 38], [48, 38], [50, 38], [52, 38], [54, 38], [56, 38], [58, 38],
  [60, 38], [62, 38], [64, 36], [64, 34], [66, 34], [68, 34], [70, 36], [70, 38], [72, 38],
  // Pakistan / India
  [62, 26], [64, 26], [66, 26], [68, 22], [68, 18], [70, 18], [72, 20], [74, 22], [76, 22],
  [78, 20], [80, 18], [80, 14], [78, 12], [76, 10], [78, 8], [80, 8],
  // Sri Lanka
  [80, 8], [82, 8], [82, 6], [80, 6],
  // Central Asia
  [56, 40], [58, 42], [60, 42], [62, 44], [64, 44], [66, 42], [68, 40], [70, 42], [72, 42],
  [74, 44], [76, 44], [78, 42], [80, 44], [82, 50], [84, 52], [86, 50], [88, 48], [90, 50],
  // China
  [80, 36], [84, 36], [88, 36], [92, 30], [96, 28], [100, 22], [104, 22], [108, 20],
  [110, 22], [112, 22], [114, 24], [116, 24], [118, 26], [120, 26], [122, 24], [120, 28],
  [118, 30], [116, 32], [114, 34], [112, 36], [110, 38], [108, 40], [106, 42], [104, 44],
  [102, 44], [100, 44], [98, 44], [96, 44], [94, 44], [92, 44], [90, 44],
  // Korea / Japan proximity
  [124, 38], [126, 38], [128, 36], [128, 38], [130, 38],
  // Japan
  [130, 32], [132, 34], [134, 36], [136, 36], [138, 38], [140, 38], [140, 36], [138, 34],
  [136, 34], [134, 32], [132, 32], [130, 32],
  [140, 40], [142, 40], [144, 42], [146, 44], [148, 46], [146, 44],
  // SE Asia
  [100, 4], [102, 4], [104, 2], [104, 0], [106, 2], [108, 4], [110, 4], [110, 2],
  [108, 0], [106, -2], [108, -4], [110, -6], [112, -8], [114, -8], [116, -8], [118, -6],
  [120, -4], [118, -2], [120, 0], [120, 2], [118, 4], [116, 6], [114, 6], [112, 8], [110, 10],
  [108, 14], [106, 16], [104, 18], [102, 20], [100, 20], [100, 16], [100, 12], [100, 8],
  // Malay Peninsula
  [100, 2], [102, 2], [104, 2],
  // Philippines
  [118, 18], [120, 18], [122, 16], [124, 12], [122, 10], [120, 12],

  // Russia / Siberia
  [30, 68], [40, 68], [50, 68], [60, 66], [70, 68], [80, 66], [90, 64], [100, 66],
  [110, 68], [120, 66], [130, 62], [140, 62], [150, 60], [160, 60], [170, 62],
  [30, 64], [40, 62], [50, 60], [60, 58], [70, 58], [80, 60], [90, 60], [100, 60],
  [110, 58], [120, 58], [130, 58], [140, 56], [150, 54], [160, 54],
  // Russia Arctic
  [40, 72], [60, 74], [80, 74], [100, 72], [120, 72], [140, 70],
  // Russia far east
  [132, 48], [134, 48], [136, 50], [138, 52], [140, 54], [140, 52],

  // Australia
  [114, -22], [116, -24], [118, -26], [120, -28], [122, -30], [122, -32], [124, -34],
  [126, -34], [128, -36], [130, -34], [132, -32], [134, -24], [136, -14], [136, -12],
  [138, -14], [140, -14], [138, -16], [136, -16],
  [138, -36], [140, -36], [142, -36], [144, -36], [146, -36], [148, -36], [150, -36],
  [152, -34], [152, -32], [150, -30], [150, -28], [148, -26], [148, -24], [146, -22],
  [144, -20], [142, -18], [140, -16],
  // New Zealand
  [168, -44], [170, -44], [172, -42], [174, -40], [174, -38], [176, -38], [176, -40],
  [174, -42], [172, -44],
  [170, -44], [172, -46], [172, -46],
  // Greenland
  [-34, 78], [-28, 76], [-22, 76], [-18, 74], [-20, 72], [-24, 70], [-30, 68], [-36, 68],
  [-42, 68], [-46, 68], [-50, 70], [-54, 70], [-56, 72], [-52, 74], [-46, 74], [-40, 76],
  [-36, 78],
];

// Convert longitude/latitude to equirectangular x/y percentages
function latLonToXY(lon: number, lat: number): { x: number; y: number } {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

const SERVER_LOCATIONS = [
  { lon: -73, lat: 40, label: "US-East", color: "#10b981" },
  { lon: -122, lat: 37, label: "US-West", color: "#10b981" },
  { lon: 2, lat: 48, label: "EU-West", color: "#10b981" },
  { lon: 116, lat: 39, label: "Asia-East", color: "#10b981" },
  { lon: 139, lat: 35, label: "Asia-SE", color: "#10b981" },
  { lon: 151, lat: -33, label: "Australia", color: "#10b981" },
];

// Globe projection: map equirectangular coords onto a sphere face
// We simulate orthographic projection by warping X towards center based on latitude
function projectToGlobe(
  lon: number,
  lat: number,
  cx: number,
  cy: number,
  radius: number
) {
  // Convert to radians
  const lonRad = (lon * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  // Orthographic projection (facing the viewer at lon=15, lat=20)
  const centralLon = 15 * (Math.PI / 180);
  const centralLat = 20 * (Math.PI / 180);

  const cosC =
    Math.sin(centralLat) * Math.sin(latRad) +
    Math.cos(centralLat) * Math.cos(latRad) * Math.cos(lonRad - centralLon);

  if (cosC < 0) return null; // Behind the globe

  const x =
    cx +
    radius *
      Math.cos(latRad) *
      Math.sin(lonRad - centralLon);
  const y =
    cy -
    radius *
      (Math.cos(centralLat) * Math.sin(latRad) -
        Math.sin(centralLat) * Math.cos(latRad) * Math.cos(lonRad - centralLon));

  return { x, y };
}

// Generate lat/lon grid lines
function generateGridLines(
  cx: number,
  cy: number,
  radius: number
): { paths: string[] } {
  const paths: string[] = [];

  // Latitude lines
  for (let lat = -75; lat <= 75; lat += 15) {
    const points: string[] = [];
    for (let lon = -180; lon <= 180; lon += 5) {
      const p = projectToGlobe(lon, lat, cx, cy, radius);
      if (p) {
        points.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      }
    }
    if (points.length > 2) {
      paths.push(`M${points.join(" L")}`);
    }
  }

  // Longitude lines
  for (let lon = -180; lon <= 165; lon += 15) {
    const points: string[] = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      const p = projectToGlobe(lon, lat, cx, cy, radius);
      if (p) {
        points.push(`${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      }
    }
    if (points.length > 2) {
      paths.push(`M${points.join(" L")}`);
    }
  }

  return { paths };
}

export function Globe2D() {
  const [dots, setDots] = useState<
    { x: number; y: number; opacity: number; size: number; delay: number }[]
  >([]);
  const [gridPaths, setGridPaths] = useState<string[]>([]);
  const [serverDots, setServerDots] = useState<
    { x: number; y: number; label: string; color: string; visible: boolean }[]
  >([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG coordinate space: 200x200, globe centered at (100, 100), radius 85
  const CX = 100,
    CY = 100,
    R = 88;

  useEffect(() => {
    const newDots: typeof dots = [];

    // Project each continent point onto the globe
    CONTINENT_OUTLINES.forEach(([lon, lat]) => {
      // Scatter a few dots around each anchor
      for (let s = 0; s < 3; s++) {
        const jLon = lon + (Math.random() - 0.5) * 5;
        const jLat = lat + (Math.random() - 0.5) * 5;
        const p = projectToGlobe(jLon, jLat, CX, CY, R);
        if (p) {
          newDots.push({
            x: p.x,
            y: p.y,
            opacity: Math.random() * 0.5 + 0.25,
            size: Math.random() * 0.45 + 0.25,
            delay: Math.random() * 1.5,
          });
        }
      }
    });

    setDots(newDots);

    // Grid lines
    const { paths } = generateGridLines(CX, CY, R);
    setGridPaths(paths);

    // Server locations
    setServerDots(
      SERVER_LOCATIONS.map((loc) => {
        const p = projectToGlobe(loc.lon, loc.lat, CX, CY, R);
        return {
          x: p ? p.x : -100,
          y: p ? p.y : -100,
          label: loc.label,
          color: loc.color,
          visible: !!p,
        };
      })
    );
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden bg-[#050505] group">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          className="w-[85%] h-[85%]"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Clip everything to the globe circle */}
            <clipPath id="globe-clip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>

            {/* Ocean gradient */}
            <radialGradient id="ocean-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0c1f35" />
              <stop offset="100%" stopColor="#050d18" />
            </radialGradient>

            {/* Atmosphere glow */}
            <radialGradient id="atmo-grad" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.18)" />
            </radialGradient>

            {/* Specular highlight */}
            <radialGradient id="spec-grad" cx="32%" cy="28%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ocean fill */}
          <circle cx={CX} cy={CY} r={R} fill="url(#ocean-grad)" />

          {/* Lat/Lon grid lines */}
          <g clipPath="url(#globe-clip)" opacity="0.12">
            {gridPaths.map((d, i) => (
              <path
                key={`grid-${i}`}
                d={d}
                fill="none"
                stroke="#4ade80"
                strokeWidth="0.3"
              />
            ))}
          </g>

          {/* Continent dots clipped to globe */}
          <g clipPath="url(#globe-clip)">
            {dots.map((dot, index) => (
              <motion.circle
                key={`dot-${index}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.size}
                fill="#6ee7b7"
                initial={{ opacity: 0 }}
                animate={{ opacity: dot.opacity }}
                transition={{ delay: dot.delay, duration: 1.2 }}
              />
            ))}
          </g>

          {/* Specular highlight (gloss) */}
          <circle cx={CX} cy={CY} r={R} fill="url(#spec-grad)" clipPath="url(#globe-clip)" />

          {/* Atmosphere rim glow */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(16,185,129,0.35)"
            strokeWidth="2.5"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R + 3}
            fill="none"
            stroke="rgba(16,185,129,0.10)"
            strokeWidth="4"
          />

          {/* Server location pings */}
          {serverDots.filter((s) => s.visible).map((server, i) => (
            <Ping
              key={`server-${i}`}
              x={server.x}
              y={server.y}
              color={server.color}
              label={server.label}
              delay={i * 0.8}
            />
          ))}
        </svg>
      </div>

      {/* Text overlay */}
      <div className="relative z-10 p-8 flex flex-col justify-between h-full w-full pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
              Global Network
            </span>
          </div>
        </div>

        <div className="max-w-[240px]">
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">
            Location Aware
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Smart routing automatically connects users to the nearest of our 24
            globally distributed edge nodes.
          </p>
        </div>
      </div>
    </div>
  );
}

function Ping({
  x,
  y,
  color,
  label,
  delay,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  delay: number;
}) {
  return (
    <g clipPath="url(#globe-clip)">
      {/* Ripple ring */}
      <motion.circle
        cx={x}
        cy={y}
        r="1.2"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: delay,
          ease: "easeOut",
        }}
      />
      {/* Second ripple, offset */}
      <motion.circle
        cx={x}
        cy={y}
        r="1.2"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        initial={{ scale: 0.5, opacity: 0.6 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: delay + 0.6,
          ease: "easeOut",
        }}
      />
      {/* Core dot */}
      <circle cx={x} cy={y} r="1.2" fill={color} />
      <circle cx={x} cy={y} r="0.5" fill="white" opacity={0.9} />
      {/* Label */}
      <text
        x={x + 2.5}
        y={y + 1}
        fontSize="2.8"
        fontWeight="600"
        fill="#a1a1aa"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {label}
      </text>
    </g>
  );
}

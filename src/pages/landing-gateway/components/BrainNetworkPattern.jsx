import React, { useEffect, useRef } from 'react';

const BrainNetworkPattern = () => {
  const svgRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef?.current;
    if (!svg) return;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e?.clientX / window.innerWidth;
      mouseRef.current.y = e?.clientY / window.innerHeight;

      // Update SVG transform based on mouse position
      const translateX = (mouseRef?.current?.x - 0.5) * 20;
      const translateY = (mouseRef?.current?.y - 0.5) * 20;
      
      svg.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate network nodes and connections
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 25,
    size: Math.random() * 3 + 2
  }));

  const connections = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 5], [5, 6], [6, 7],
    [4, 8], [5, 9], [6, 10], [7, 11],
    [8, 9], [9, 10], [10, 11],
    [0, 5], [1, 6], [2, 7],
    [4, 9], [5, 10], [6, 11]
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <svg
        ref={svgRef}
        className="w-full h-full transition-transform duration-1000 ease-out"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0.1" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#00FF88" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {connections?.map(([start, end], index) => {
          const startNode = nodes?.[start];
          const endNode = nodes?.[end];
          
          return (
            <line
              key={`connection-${index}`}
              x1={startNode?.x}
              y1={startNode?.y}
              x2={endNode?.x}
              y2={endNode?.y}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              filter="url(#glow)"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.6;0.1"
                dur={`${3 + Math.random() * 2}s`}
                repeatCount="indefinite"
                begin={`${Math.random() * 2}s`}
              />
            </line>
          );
        })}

        {/* Nodes */}
        {nodes?.map((node) => (
          <circle
            key={`node-${node?.id}`}
            cx={node?.x}
            cy={node?.y}
            r={node?.size}
            fill="url(#nodeGradient)"
            filter="url(#glow)"
          >
            <animate
              attributeName="r"
              values={`${node?.size};${node?.size + 1};${node?.size}`}
              dur={`${2 + Math.random() * 3}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 2}s`}
            />
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${2.5 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 1.5}s`}
            />
          </circle>
        ))}

        {/* Central Logo Symbol */}
        {/* <g transform="translate(50, 50)">
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="url(#logoGradient)"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;360"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Letter A in SVG 
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontSize="8"
            fontWeight="bold"
            fill="white"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;360"
              dur="20s"
              repeatCount="indefinite"
            />
            A
          </text>
        </g> */}
      </svg>
    </div>
  );
};

export default BrainNetworkPattern;
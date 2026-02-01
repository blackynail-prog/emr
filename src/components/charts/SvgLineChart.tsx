/**
 * SvgLineChart.tsx
 * Zero-dependency SVG line chart for EMR vitals
 * Pure client-side rendering with hover tooltips
 */

import { formatTimeHHMM } from '../../utils/time';

export interface DataPoint {
  ts: string;
  value: number;
}

export interface SvgLineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  yLabel?: string;
  yMin?: number;
  yMax?: number;
  showDots?: boolean;
  showGrid?: boolean;
  xTickCount?: number;
  yTickCount?: number;
}

export function SvgLineChart({
  data,
  width = 560,
  height = 160,
  yLabel = '',
  yMin,
  yMax,
  showDots = true,
  showGrid = true,
  xTickCount = 4,
  yTickCount = 4,
}: SvgLineChartProps) {
  // Empty state
  if (!data || data.length < 2) {
    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#6c757d',
        }}
      >
        데이터 부족 (최소 2개 필요)
      </div>
    );
  }

  // Layout constants
  const padL = 36;
  const padR = 12;
  const padT = 12;
  const padB = 22;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  // Calculate Y range with 10% padding
  const values = data.map((d) => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const range = dataMax - dataMin || 1;
  const computedYMin = yMin !== undefined ? yMin : dataMin - range * 0.1;
  const computedYMax = yMax !== undefined ? yMax : dataMax + range * 0.1;
  const yRange = computedYMax - computedYMin || 1;

  // Scale functions
  const xScale = (i: number) => padL + (i / (data.length - 1)) * plotW;
  const yScale = (v: number) => padT + ((computedYMax - v) / yRange) * plotH;

  // Generate path
  const pathData = data
    .map((d, i) => {
      const x = xScale(i);
      const y = yScale(d.value);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  // X tick indices
  const xTickIndices: number[] = [];
  const xStep = Math.max(1, Math.floor(data.length / xTickCount));
  for (let i = 0; i < data.length; i += xStep) {
    xTickIndices.push(i);
  }

  // Y ticks
  const yTicks: number[] = [];
  for (let i = 0; i <= yTickCount; i++) {
    yTicks.push(computedYMin + (i / yTickCount) * yRange);
  }

  // Hover state (client-side only)
  const chartId = `chart-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      <svg
        width={width}
        height={height}
        style={{ display: 'block', fontFamily: 'system-ui, sans-serif' }}
        id={chartId}
      >
        {/* Grid lines */}
        {showGrid && (
          <g stroke="#e0e0e0" strokeWidth="1">
            {yTicks.map((tick, i) => {
              const y = yScale(tick);
              return (
                <line key={`ygrid-${i}`} x1={padL} y1={y} x2={width - padR} y2={y} />
              );
            })}
            {xTickIndices.map((idx) => {
              const x = xScale(idx);
              return (
                <line key={`xgrid-${idx}`} x1={x} y1={padT} x2={x} y2={height - padB} />
              );
            })}
          </g>
        )}

        {/* Y axis */}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={height - padB}
          stroke="#333"
          strokeWidth="1"
        />

        {/* X axis */}
        <line
          x1={padL}
          y1={height - padB}
          x2={width - padR}
          y2={height - padB}
          stroke="#333"
          strokeWidth="1"
        />

        {/* Y ticks and labels */}
        {yTicks.map((tick, i) => {
          const y = yScale(tick);
          return (
            <g key={`ytick-${i}`}>
              <line x1={padL - 4} y1={y} x2={padL} y2={y} stroke="#333" strokeWidth="1" />
              <text
                x={padL - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="11"
                fill="#333"
              >
                {tick.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Y label */}
        {yLabel && (
          <text
            x={8}
            y={padT + plotH / 2}
            textAnchor="middle"
            fontSize="11"
            fill="#333"
            transform={`rotate(-90 8 ${padT + plotH / 2})`}
          >
            {yLabel}
          </text>
        )}

        {/* X tick labels */}
        {xTickIndices.map((idx) => {
          const x = xScale(idx);
          const time = formatTimeHHMM(data[idx].ts);
          return (
            <text
              key={`xticklabel-${idx}`}
              x={x}
              y={height - padB + 16}
              textAnchor="middle"
              fontSize="10"
              fill="#555"
            >
              {time}
            </text>
          );
        })}

        {/* Line path */}
        <path d={pathData} stroke="#0066cc" strokeWidth="2" fill="none" />

        {/* Dots */}
        {showDots &&
          data.map((d, i) => {
            const cx = xScale(i);
            const cy = yScale(d.value);
            return (
              <circle
                key={`dot-${i}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="#0066cc"
                stroke="#fff"
                strokeWidth="1"
                className="chart-dot"
                data-index={i}
              />
            );
          })}

        {/* Hover overlay */}
        <rect
          x={padL}
          y={padT}
          width={plotW}
          height={plotH}
          fill="transparent"
          className="chart-hover-area"
        />
      </svg>

      {/* Tooltip (rendered via client script) */}
      <div
        id={`${chartId}-tooltip`}
        style={{
          position: 'absolute',
          display: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1000,
        }}
      />

      {/* Client-side interaction script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  const chartId = '${chartId}';
  const svg = document.getElementById(chartId);
  const tooltip = document.getElementById(chartId + '-tooltip');
  const hoverArea = svg.querySelector('.chart-hover-area');
  const dots = Array.from(svg.querySelectorAll('.chart-dot'));
  
  const data = ${JSON.stringify(data)};
  const padL = ${padL};
  const plotW = ${plotW};
  const n = data.length;
  
  function xScale(i) {
    return padL + (i / (n - 1)) * plotW;
  }
  
  function findNearestIndex(mouseX) {
    let minDist = Infinity;
    let nearestIdx = 0;
    for (let i = 0; i < n; i++) {
      const x = xScale(i);
      const dist = Math.abs(mouseX - x);
      if (dist < minDist) {
        minDist = dist;
        nearestIdx = i;
      }
    }
    return nearestIdx;
  }
  
  hoverArea.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const nearestIdx = findNearestIndex(mouseX);
    const point = data[nearestIdx];
    
    // Highlight dot
    dots.forEach((dot, i) => {
      if (i === nearestIdx) {
        dot.setAttribute('r', '5');
        dot.setAttribute('fill', '#ff6600');
      } else {
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', '#0066cc');
      }
    });
    
    // Show tooltip
    const time = point.ts.split('T')[1]?.slice(0, 5) || point.ts.slice(-5);
    tooltip.innerHTML = time + '<br/><strong>' + point.value.toFixed(1) + '</strong>';
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
  });
  
  hoverArea.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    dots.forEach((dot) => {
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', '#0066cc');
    });
  });
})();
          `,
        }}
      />
    </div>
  );
}

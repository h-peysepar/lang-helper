import React, { useEffect, useMemo, useRef } from 'react';

interface Props {
  data: [number, number];
}
const defaultColors = ['rgb(211, 47, 47)', 'rgb(56, 142, 60)'];
function PieChart(props: Props) {
  const { data, colors } = useMemo(() => {
    if (props.data?.every(i => i !== 1)) {
      return {
        colors: defaultColors,
        data: props.data,
      };
    } else {
      const index = props.data.indexOf(1);
      return {
        colors: [defaultColors[index], defaultColors[index]],
        data: [0.5, 0.5],
      };
    }
  }, [props.data]);

  const radius = 15;

  let percentageSum = 0;
  let startXY = { x: radius, y: 0 };
  const slices = data.map((percent, i) => {
    percentageSum += percent;
    const angle = Math.PI * 2 * percentageSum;

    const largeArcFlag = percent > 0.5 ? 1 : 0;
    const x = radius + radius * Math.sin(angle);
    const y = radius + radius * Math.cos(angle) * -1;

    const moveCommand = 'M' + startXY.x + ',' + startXY.y;
    // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    const arcCommand =
      'A' + radius + ',' + radius + ',0,' + largeArcFlag + ',1,' + x + ',' + y;
    const lineCommand = 'L' + radius + ',' + radius;
    const closePathCommand = 'Z';

    startXY = { x: x, y: y };

    return {
      d: moveCommand + arcCommand + lineCommand + closePathCommand,
      fill: colors[i],
    };
  });

  const generateSVG = function () {
    slices.forEach(slice => {
      const sliceEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      sliceEl.setAttribute('d', slice.d);
      sliceEl.setAttribute('fill', slice.fill);

      svg.current?.appendChild(sliceEl);
    });
  };
  useEffect(
    function () {
      if (data) {
        generateSVG();
      }
    },
    [data]
  );
  const svg = useRef<SVGSVGElement>(null);
  return (
    <svg
      id={`graph`}
      ref={svg}
      width='30'
      height='30'
      xmlns='http://www.w3.org/2000/svg'
    ></svg>
  );
}

export default PieChart;

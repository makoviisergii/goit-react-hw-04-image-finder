import * as React from 'react';
const SVGComponent = props => (
  <svg
    fill="#000000"
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    id="search"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <line
      id="secondary"
      x1={21}
      y1={21}
      x2={15}
      y2={15}
      style={{
        fill: 'none',
        stroke: 'rgb(44, 169, 188)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <circle
      id="primary"
      cx={10}
      cy={10}
      r={7}
      style={{
        fill: 'none',
        stroke: 'rgb(0, 0, 0)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </svg>
);
export default SVGComponent;

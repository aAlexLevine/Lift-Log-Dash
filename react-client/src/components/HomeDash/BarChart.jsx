import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class Example extends PureComponent {
  render() {
    const { data, uniqueExercises } = this.props
    return (
      <ResponsiveContainer width='99%' height={230}>
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.values(uniqueExercises).map((exercise, i) => (
          <Bar dataKey={exercise} fill={colors[i]} key={colors[i]}/>

        ))}
        {/* <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
      </ResponsiveContainer>
    );
  }
}

const colorsNames = {
  blue: '#0000ff',
  brown: '#a52a2a',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkorange: '#ff8c00',
  darksalmon: '#e9967a',
  darkviolet: '#9400d3',
  fuchsia: '#ff00ff',
  green: '#008000',
  lightblue: '#add8e6',
  lime: '#00ff00',
  olive: '#808000',
  pink: '#ffc0cb',
  red: '#ff0000',
  yellow: '#ffff00'
}
const colors = Object.keys(colorsNames)

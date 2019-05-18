import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class Example extends PureComponent {
  render() {
    const { data, uniqueExercises } = this.props
    
    const colorsBrighter = {
      lightBlue: '#4494ff',
      cyan: '#44ffff',
      orange: '#ffbd44',
      peach: '#ffaf91',
      lightPurple: '#e760ff', 
      skyBlue: '#8fc4ff',
      deepBlue: '#0d0de9',
      pinkRed: '#f50057',
      orangeRed: '#f44336',
      hotPurple: '#f500d7',
      violet: '#9d60ff',
      hotGreen: '#60ff8a',
      yellow: '#fdff60'
    }
    const colors = Object.values(colorsBrighter)
    // if (uniqueExercises.length > colors.length) {
    //   let repeats = exercises.length % colors.length
    //   // let colorsArr = []
    //   let i = 1
    //   while (repeats > i) {
    //     colors.push(...colors)
    //     i++
    //   }
    // }

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
        <XAxis dataKey="name" padding={{ left: 0, right: 0 }} />
        <YAxis allowDuplicatedCategory={false}/>
        <Tooltip />
        <Legend />
        {Object.values(uniqueExercises).map((exercise, i) => {
          console.log(colors[i])
          return <Bar dataKey={exercise} fill={colors[i]} key={colors[i]}/>

        })}
        
      </BarChart>
      </ResponsiveContainer>
    );
  }
}

// // const colorsNames = {
// //   blue: '#0000ff',
// //   cyan: '#00ffff',
// //   darkblue: '#00008b',
// //   darkcyan: '#008b8b',
// //   darkorange: '#ff8c00',
// //   darksalmon: '#e9967a',
// //   darkviolet: '#9400d3',
// //   fuchsia: '#ff00ff',
// //   green: '#008000',
// //   lightblue: '#add8e6',
// //   lime: '#00ff00',
// //   olive: '#808000',
// //   pink: '#ffc0cb',
// //   red: '#ff0000',
// //   yellow: '#ffff00',
// //   brown: '#a52a2a'
// // }

// // if (exercises.length > colors.length) {
// //   let repeats = exercises.length % colors.length
// //   let colorsArr = []
// //   let i = 0
// //   while (repeats > i) {
// //     colorsArr.push(...colors)
// //     i++
// //   }
// //   return colorsArr
// // }

// // const colorsBrighter = {
// //   lightBlue: '#4494ff',
// //   cyan: '#44ffff',
// //   orange: '#ffbd44',
// //   peach: '#ffaf91',
// //   lightPurple: '#e760ff', 
// //   skyBlue: '#8fc4ff',
// //   deepBlue: '#0d0de9',
// //   pinkRed: '#f50057',
// //   orangeRed: '#f44336',
// //   hotPurple: '#f500d7',
// //   violet: '#9d60ff',
// //   hotGreen: '#60ff8a',
// //   yellow: '#fdff60'
// // }
// // const colors = Object.keys(colorsBrighter)
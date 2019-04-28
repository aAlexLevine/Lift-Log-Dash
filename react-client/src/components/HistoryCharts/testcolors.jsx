import React from 'react';
import Grid from '@material-ui/core/Grid';


class ColorTest extends React.Component  {
  constructor() {
    super()
    this.state = {
      colors : colors
    }
  }
  
  remove = (colorKey) => {
    const copy = {...this.state.colors}
    delete copy[colorKey]
    this.setState({colors: copy})

  }

  render() {
    const { colors } = this.state
    return (
      <div>
        <Grid container spacing={24}>
          
            {/* {colors1.map(color => (
              <Grid item xs={2} key={color}>
                <div style={{height:'100px', width: '100px', backgroundColor: color}}>{color}</div>
              </Grid>
            ))}
            <textarea style={{minWidth: '100%', height:'300px'}}>
              {colors1.reduce((main, str) => (main +' '+ str), '')}
            </textarea> */}
                                                                   
            <h2>{Object.keys(colors).reduce((mainStr, str) => (mainStr + `${str}: '${colors[str]}', `), '')}</h2>

            {Object.keys(colors).map(colorName => (
              <Grid item xs={2} key={colorName}>
                <div 
                  style={{
                    height:'100px', 
                    width: '100px', 
                    backgroundColor: colors[colorName]
                  }}
                  onClick={()=>this.remove(colorName)}
                >
                  {colorName} : {colors[colorName]}
                </div>
              </Grid>
            ))}

          
          
          
            
          </Grid>


        </div>
    )
  }
}
export default ColorTest

const  colors = {
  aqua: "#00ffff",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightcyan: "#e0ffff",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  white: "#ffffff",
  yellow: "#ffff00"
};

const colors1 = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', 
'#f58231', '#911eb4', '#46f0f0', '#fabebe', '#e6beff', 
'#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', ]
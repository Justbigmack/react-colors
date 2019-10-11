import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import styles from '../styles/PaletteStyles'

class SingleColorPalette extends Component {
  state = {
    _shades: this.gatherShades(this.props.palette, this.props.colorId),
    format: 'hex'
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = []
    let allColors = palette.colors

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    //return all shades of given color
    return shades.slice(1)
  }

  changeFormat = value => {
    this.setState({ format: value })
  }

  render() {
    const { classes } = this.props
    const { paletteName, emoji, id } = this.props.palette
    const colorBoxes = this.state._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
        showingFullPalette={false}
      />
    ))
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />

        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}
export default withStyles(styles)(SingleColorPalette)

import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import ColorPickerForm from './ColorPickerForm'
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'
import seedColors from '../Helpers/seedColors'
import styles from '../styles/NewPaletteFormStyles'

const arrayMove = require('array-move')

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }

  state = {
    open: false,
    colors: seedColors[0].colors
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  removeColor = colorName => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  clearColors = () => {
    this.setState({ colors: [] })
  }

  addNewColor = newColor => {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    })
  }

  addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = this.props.palettes.map(p => p.colors).flat()
    let rand
    let randomColor
    let isDuplicateColor = true
    const colorNameCompare = color => {
      return color.name === randomColor.name
    }
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      isDuplicateColor = this.state.colors.some(color =>
        colorNameCompare(color)
      )
    }
    this.setState({ colors: [...this.state.colors, randomColor] })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }))
  }

  render() {
    const { classes, maxColors, palettes } = this.props
    const { open, colors } = this.state
    const paletteIsFull = colors.length >= maxColors

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)

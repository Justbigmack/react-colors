import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { withStyles } from '@material-ui/core/styles'

import styles from '../styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
  state = {
    currentColor: 'teal',
    newColorName: ''
  }

  updateCurrentColor = newColor => {
    console.log(newColor)
    this.setState({ currentColor: newColor.hex })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.props.addNewColor(newColor)
    this.setState({ newColorName: '' })
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    )
    ValidatorForm.addValidationRule(
      'isColorNameLong',
      value => value.length <= 15
    )
  }
  render() {
    const { paletteIsFull, classes } = this.props
    const { currentColor, newColorName } = this.state
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
          disableAlpha
        />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          ref="form"
          instantValidate={false}
        >
          <TextValidator
            value={newColorName}
            className={classes.colorNameInput}
            placeholder="Color Name"
            name="newColorName"
            onChange={this.handleChange}
            validators={[
              'required',
              'isColorNameUnique',
              'isColorUnique',
              'isColorNameLong'
            ]}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used',
              'Color name only can be 15 characters long'
            ]}
            variant="filled"
            margin="normal"
          />
          <Button
            variant="contained"
            className={classes.addColor}
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull ? 'grey' : currentColor
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm)

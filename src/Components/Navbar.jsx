import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slider from 'rc-slider'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/styles'

import styles from '../styles/NavbarStyles'
import 'rc-slider/assets/index.css'

class Navbar extends Component {
  state = {
    format: 'hex',
    open: false
  }

  handleFormatChange = e => {
    this.setState({ format: e.target.value, open: true })
    this.props.handleChange(e.target.value)
  }

  closeSnackbar = () => {
    this.setState({ open: false })
  }

  render() {
    const { level, changeLevel, showingAllColors, classes } = this.props
    const { format, open } = this.state
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">Home</Link>
        </div>
        {showingAllColors && (
          <div>
            <span className={classes.sliderText}>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed to {format.toUpperCase()}
            </span>
          }
          onClose={this.closeSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          action={[
            <IconButton
              color="inherit"
              onClick={this.closeSnackbar}
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}

export default withStyles(styles)(Navbar)

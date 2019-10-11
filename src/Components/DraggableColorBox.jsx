import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { SortableElement } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'

import styles from '../styles/DraggableColorBoxStyles'

const DraggableColorBox = props => {
  const { classes, handleClick, name } = props
  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  )
}

export default SortableElement(withStyles(styles)(DraggableColorBox))

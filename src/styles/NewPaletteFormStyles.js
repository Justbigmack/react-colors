import { DRAWER_WIDTH, DRAWER_WIDTH_MOBILE } from '../Helpers/constants'
import sizes from './sizes'

const drawerWidth = DRAWER_WIDTH
const drawerWidthMobile = DRAWER_WIDTH_MOBILE

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100vh',
    [sizes.down('md')]: {
      width: drawerWidthMobile
    },
    [sizes.down('sm')]: {
      width: '100vw'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    [sizes.down('md')]: {
      width: drawerWidthMobile
    },
    [sizes.down('sm')]: {
      width: '100vw'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    width: '100%'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    [sizes.down('md')]: {
      marginLeft: -drawerWidthMobile
    },
    [sizes.down('sm')]: {
      marginLeft: '-100vw'
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%',
    maxWidth: '395px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: '48%'
  }
})

export default styles

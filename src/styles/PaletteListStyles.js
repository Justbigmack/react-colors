import bg from './bg.svg'

import sizes from './sizes'

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#1f8ee6',
    backgroundImage: `url(${bg})`,
    overflow: 'auto'
    /* background by SVGBackgrounds.com */
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xxxxxl')]: {
      width: '40%'
    },
    [sizes.down('xxxxl')]: {
      width: '45%'
    },
    [sizes.down('xxxl')]: {
      width: '50%'
    },
    [sizes.down('xxl')]: {
      width: '60%'
    },
    [sizes.down('xl')]: {
      width: '70%'
    },
    [sizes.down('l')]: {
      width: '75%'
    },
    [sizes.down('xs')]: {
      width: '75%'
    }
  },
  heading: {
    fontSize: '2rem',
    cursor: 'default'
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    '& a:hover': {
      transform: 'scale(1.1)'
    }
  },
  palettes: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '30px 5%',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 48.5%)',
      gridGap: '25px 3%'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1rem'
    },
    '& > :last-child': {
      marginBottom: '50px'
    }
  }
}

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { generatePalette } from './Helpers/colorHelpers'
import NewPaletteForm from './Components/NewPaletteForm'
import Page from './Components/Page'
import Palette from './Components/Palette'
import PaletteList from './Components/PaletteList'
import seedColors from './Helpers/seedColors'
import SingleColorPalette from './Components/SingleColorPalette'

class App extends Component {
  savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

  state = {
    palettes: this.savedPalettes || seedColors
  }

  findPalette = id => {
    return this.state.palettes.find(palette => palette.id === id)
  }

  savePalette = newPalette => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    )
  }

  deletePalette = id => {
    this.setState(
      prevState => ({
        palettes: prevState.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    )
  }

  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
}

export default App

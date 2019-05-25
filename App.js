import React, { Component, useState } from "react"

import UiShell from "./UiShell"
import { randomColor } from "./helpers"
import { ChromePicker } from "react-color"

import Random from "./assets/random-btn.png"
import Delete from "./assets/delete-btn.png"
import Save from "./assets/save-btn.png"

const LOCAL_STORAGE_KEY = "my-themes"

const SETTINGS = [
  ["mainBg", "Main Background"],
  ["background", "Background"],
  ["sidebar", "Sidebar"],
  ["sidebarActive", "Sidebar active"],
  ["sidebarText", "Sidebar text"],
  ["contentText", "Content text"],
  ["innerCards", "Inner cards"]
]

const SettingLine = ({ name, onSelect, color, active }) => {
  return (
    <div
      className={`${"setting-line"} ${active && "active"}`}
      onClick={onSelect}
    >
      {name}
      <div
        className={`${"palet-dot"} ${active && "active"}`}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

const ThemeItem = ({ loadedColors, onClick, onDelete }) => {
  const [hovered, setHovered] = useState(false)
  const {
    background,
    sidebar,
    sidebarActive,
    sidebarText,
    innerCards
  } = loadedColors
  return (
    <div
      className="theme-item-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ backgroundColor: background }}
    >
      {hovered && (
        <img
          src={Delete}
          alt="control"
          onClick={onDelete}
          className="delete-button"
        />
      )}
      <div className="theme-sidebar" style={{ backgroundColor: sidebar }}>
        <div
          className="theme-active"
          style={{ backgroundColor: sidebarActive }}
        />
        <div
          className="theme-sidebar-item"
          style={{ backgroundColor: sidebarText }}
        />
        <div
          className="theme-sidebar-item"
          style={{ backgroundColor: sidebarText }}
        />
        <div
          className="theme-sidebar-item"
          style={{ backgroundColor: sidebarText }}
        />
        <div
          className="theme-sidebar-item"
          style={{ backgroundColor: sidebarText }}
        />
      </div>

      <div className="theme-container">
        <div className="theme-heading-container">
          <div className="theme-heading" />
          <div className="theme-subheading" />
        </div>
        <div className="theme-tiles-container">
          <div
            className="theme-card-big"
            style={{ backgroundColor: innerCards }}
          />
          <div className="theme-side-card-container">
            <div
              className="theme-card-small"
              style={{ backgroundColor: innerCards }}
            />
            <div
              className="theme-card-small"
              style={{ backgroundColor: innerCards }}
            />
            <div
              className="theme-card-small"
              style={{ backgroundColor: innerCards }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedThemes: [],
      selectedColor: "#525B5E",
      activeSetting: "mainBG",
      colors: {
        id: this.genUUID(),
        mainBg: "#525B5E",
        background: "#7394A0",
        sidebar: "#154654",
        sidebarActive: "#13B7F3",
        sidebarText: "#FFFFFF",
        contentText: "#FFFFFF",
        innerCards: "#154654"
      }
    }
  }

  componentDidMount = () => {
    this.getThemes()
  }

  genRandomPalette = () => {
    this.setState({
      colors: {
        id: this.genUUID(),
        mainBg: randomColor(),
        background: randomColor(),
        sidebar: randomColor(),
        sidebarActive: randomColor(),
        sidebarText: randomColor(),
        contentText: randomColor(),
        innerCards: randomColor()
      }
    })
  }

  getThemes = () => {
    let loadedThemes = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (loadedThemes) {
      this.setState({
        loadedThemes: JSON.parse(loadedThemes)
      })
    }
  }

  saveTheme = () => {
    if (this.state.loadedThemes.length < 5) {
      let colors = this.state.colors
      let themes = this.state.loadedThemes
      colors.id = this.genUUID()
      themes.push(colors)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(themes))
      this.getThemes()
    }
  }

  handleColorChange = color => {
    let colors = this.state.colors
    colors[this.state.activeSetting] = color.hex
    this.setState({ colors, selectedColor: color.hex })
  }

  handleColorSettingClicked = name => {
    this.setState({
      activeSetting: name,
      selectedColor: this.state.colors[name]
    })
  }

  applyTheme = colors => {
    this.setState({ colors })
    this.getThemes()
  }

  deleteTheme = id => {
    const loadedThemes = this.state.loadedThemes.filter(item => {
      return item.id !== id
    })
    this.setState({
      loadedThemes
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loadedThemes))
  }

  render() {
    const { loadedThemes, activeSetting, selectedColor, colors } = this.state

    return (
      <div
        className={"content-wrapper"}
        style={{ backgroundColor: colors.mainBg }}
      >
        <div className={"content-container"}>
          <UiShell
            background={colors.background}
            sidebar={colors.sidebar}
            sidebarActive={colors.sidebarActive}
            sidebarText={colors.sidebarText}
            contentText={colors.contentText}
            innerCards={colors.innerCards}
          />
        </div>
        <div className={"toolbar-container"}>
          <div className={"toolbar"}>
            <ChromePicker
              color={selectedColor}
              onChangeComplete={this.handleColorChange}
            />
            <div className={"settings-container"}>
              {SETTINGS.map((setting, index) => {
                return (
                  <SettingLine
                    key={index}
                    name={setting[1]}
                    color={colors[setting[0]]}
                    active={activeSetting === setting[0]}
                    onSelect={() => this.handleColorSettingClicked(setting[0])}
                  />
                )
              })}
            </div>

            <div className="tools-container">
              <div className="tool-item" onClick={this.genRandomPalette}>
                <img src={Random} alt="control" height="30" width="30" />
              </div>
              <div className="tool-item" onClick={this.saveTheme}>
                <img src={Save} alt="control" height="30" width="30" />
              </div>
            </div>
          </div>

          <div className={"my-pallettes-container"}>
            {loadedThemes.length !== 0 &&
              loadedThemes.map((loadedColors, index) => {
                return (
                  <ThemeItem
                    key={index}
                    loadedColors={loadedColors}
                    onClick={() => this.applyTheme(loadedColors)}
                    onDelete={() => this.deleteTheme(loadedColors.id)}
                  />
                )
              })}
          </div>
        </div>
      </div>
    )
  }

  genUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

import React, {useState, useEffect} from "react"
import './App.css';

const Color = props => {
  return (
    <div className="item" style={{ backgroundColor: props.color.value }}>
      <h1>{props.color.value}</h1>
      <h3>Locked: {props.color.locked.toString()}</h3>
      <input 
        name="isLocked"
        type="checkbox"
        checked={props.color.locked}
        onChange={props.toggleLock}
      />
    </div>
  )
}

const ColorTheme = props => {
  return (
    <div>
      <h3>Color Theme</h3>
      {props.colors.map(color => (
        <div style={{ backgroundColor: color}}>{color}</div>
      ))}
    </div>
  )
}

const App = () => {
  const uniqueId = () => { return Math.random().toString(10).substring(5) }

  const randomColor = () => `#${(Math.random().toString(16) + "000000").substring(2, 8)}`

  const color = () => { return { id: uniqueId(), value: randomColor(), locked: false}}

  const [colors, setColors] = useState([color(), color(), color()])

  const getColorThemes = () => {
    const savedColorThemes = localStorage.getItem("colorThemes")
    return savedColorThemes ? JSON.parse(savedColorThemes) : []
  }

  const [colorThemes, setColorThemes] = useState(getColorThemes())

  useEffect(() => {
    localStorage.setItem("colorThemes", JSON.stringify(colorThemes))
  }, [colorThemes])

  const changeColors = () => {
    colors.forEach(c => {
      if (!c.locked) { c.value = randomColor() }
    })
    setColors([...colors])
  }

  const saveColorTheme = () => {
    const colorTheme = colors.map(c => c.value)
    colorThemes.unshift(colorTheme)
    setColorThemes([...colorThemes])
  }

  const clearColorThemes = () => {
    setColorThemes([])
  }

  const toggleLock = id => {
    const matchedColor = colors.find(c => c.id === id)
    matchedColor.locked = !matchedColor.locked
    setColors([...colors])
  }

  const addColor = () => {
    colors.push(color())
    setColors([...colors])
  }

  const removeColor = () => {
    colors.pop()
    setColors([...colors])
  }

  return (
    <div className="App">
      <button onClick={changeColors}>Change Colors</button>
      <button onClick={saveColorTheme}>Save Colors</button>
      <button onClick={clearColorThemes}>Clear Colors</button>
      <button onClick={addColor}>Add Color</button>
      <button onClick={removeColor}>Remove Color</button>
      <div className="container">
        { colors.map(color => (
          <Color key={color.id} color={color} toggleLock={() => toggleLock(color.id)} />
        ))}
      </div>
      {colorThemes.map(colorTheme => (
        <ColorTheme colors={colorTheme} />
      ))}
    </div>
  )
}

export default App;

const getColorForm = document.getElementById('get-color-form')
const colorsGrid = document.getElementById('colors-grid')

const colorNodes = Array.from(colorsGrid.children).slice(0, 5)
const labelNodes = Array.from(colorsGrid.children).slice(5)

const renderColors = (colorsObjs) => {
    const { colors } = colorsObjs

    console.log(colors)

    for (let i = 0; i < 5; i++) {
        let colorNode = colorNodes[i]
        let labelNode = labelNodes[i]
        let color = colors[i].hex.value
        colorNode.style.backgroundColor = color;
        labelNode.textContent = color;
    }

} 

getColorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const removeFirstCharacter = str => str.slice(1);
    const formData = Object.fromEntries(new FormData(e.target).entries())
    let { 
        'color-selection': colorCode,  
        'color-type'     : mode } = formData
    colorCode = removeFirstCharacter(colorCode)
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${mode.toLowerCase()}&count=5`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderColors(data)
        })
})


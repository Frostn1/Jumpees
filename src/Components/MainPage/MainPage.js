import JumpeesBoard from "../JumpeesBoard/JumpeesBoard";
import './MainPage.scss';
import TogglePaths from "../TogglePaths/TogglePaths";
import {useState} from "react";
import ColorPalleteSelector from "../ColorPalleteSelector/ColorPalleteSelector";
import CheckersBoard from "../CheckersBoard/CheckersBoard";
const colorPallete = [
    {
        boardLightColor:'antiquewhite',
        boardDarkColor:'#282c34',
        darkPieceColor: 'saddlebrown',
        lightPieceColor: '#fff',
        pathColor: {
            bg: '#397aaf',
            boxShadow: '#fff'
        },
        clickedColor: {
            bg: '#2CDA9D',
            boxShadow: '#fff'
        },
        toggleOnColor: '#B4DC7F',
        toggleOffColor: '#984447',

    },
    {
        boardLightColor:'#FCFDF2',
        boardDarkColor:'#3B3486',
        darkPieceColor: '#F3CCFF',
        lightPieceColor: '#FFE9B1',
        pathColor: {
            bg: '#397aaf',
            boxShadow: '#000'
        },
        clickedColor: {
            bg: '#2CDA9D',
            boxShadow: '#000'
        },
        toggleOnColor: '#7fdcd9',
        toggleOffColor: '#4b3669',
    },
    {
        boardLightColor:'#F3EFE0',
        boardDarkColor:'#222222',
        darkPieceColor: '#434242',
        lightPieceColor: '#22A39F',
        pathColor: {
            bg: '#B8E8FC',
            boxShadow: '#fafafa'
        },
        clickedColor: {
            bg: '#82CD47',
            boxShadow: '#fafafa'
        },
        toggleOnColor: '#B4DC7F',
        toggleOffColor: '#984447',
    }
]

const MainPage = (props) => {
    const [showPathsToggle, setShowPathsToggle] = useState(false)
    const [toggleGame, setToggleGame] = useState(false)
    const [selectedColorPallete, setSelectedColorPallete] = useState(0)
    return (
        <div id='main-page'>
            { toggleGame ?
                <CheckersBoard showPaths={showPathsToggle} colorPallete={colorPallete} selectedColorPallete={selectedColorPallete}/>
                :
                <JumpeesBoard showPaths={showPathsToggle} colorPallete={colorPallete} selectedColorPallete={selectedColorPallete}/>
            }
            <div className={'toggle-switch-container'}>
                <TogglePaths _key={'slider-toy-'+Math.random()} toggleState={setShowPathsToggle} isOn={showPathsToggle} onColor={colorPallete[selectedColorPallete].toggleOnColor} offColor={colorPallete[selectedColorPallete].toggleOffColor}/>
                <TogglePaths _key={'slider-toy-'+Math.random()} toggleState={setToggleGame} isOn={toggleGame} onColor={colorPallete[selectedColorPallete].toggleOnColor} offColor={colorPallete[selectedColorPallete].toggleOffColor}/>
            </div>
            <div className={'color-pallete-container'}>
                <ColorPalleteSelector colorPalleteArray={colorPallete} selectedColorPallete={selectedColorPallete} handleSelectColorPallete={setSelectedColorPallete}/>
            </div>
        </div>
    )
};

MainPage.propTypes = {};

export default MainPage;

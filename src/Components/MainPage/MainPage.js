import Board from "../Board/Board";
import './MainPage.scss';
import TogglePaths from "../TogglePaths/TogglePaths";
import {useState} from "react";
const MainPage = (props) => {
    const [showPathsToggle, setShowPathsToggle] = useState(false)
    return (
        <div id='main-page'>
          <Board showPaths={showPathsToggle}/>
          <div className={'toggle-switch-container'}>
            <TogglePaths toggleState={setShowPathsToggle} isOn={showPathsToggle}/>
          </div>
        </div>
    )
};

MainPage.propTypes = {};

export default MainPage;

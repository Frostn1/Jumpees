import PropTypes from 'prop-types';
import './ColorPalleteSelector.scss';

const ColorPalleteSelector = (props) => {

    const handleSelection = (selectedIndex) => {
        console.log('sean .. selected index', selectedIndex)
        props.handleSelectColorPallete(selectedIndex)
    }
    return (
        <div id={'color-pallete-pane'}>
          {
            props.colorPalleteArray.map((_colorPallete, index) => {
              return <div className={'color-pallete ' + ( props.selectedColorPallete === index ? 'selected-color-pallete' : '')} key={'color-pallete-' + Math.random()} onClick={() => handleSelection(index)}>
                <div className={'square'} style={{background: _colorPallete.boardLightColor, right: `calc(${50 * 2}% - 30px)`}}/>
                <div className={'square'} style={{background: _colorPallete.boardDarkColor, right: `calc(${50 * (2 - 2/6)}% - 30px)`}}/>
                <div className={'square'} style={{background: _colorPallete.lightPieceColor, right: `calc(${50 * (2 - 4/6)}% - 30px)`}}/>
                <div className={'square'} style={{background: _colorPallete.darkPieceColor, right: `calc(${50 * (2 - 6/6)}% - 30px)`}}/>
                <div className={'square'} style={{background: _colorPallete.pathColor.bg, right: `calc(${50 * (2 - 8/6)}% - 30px)`}}/>
                <div className={'square'} style={{background: _colorPallete.clickedColor.bg, right: `calc(${50 * (2 - 10/6)}% - 30px)`}}/>
              </div>
            })
          }
        </div>
    )
};

ColorPalleteSelector.propTypes = {
  colorPalleteArray: PropTypes.array.isRequired,
  selectedColorPallete: PropTypes.number.isRequired,
  handleSelectColorPallete: PropTypes.func.isRequired
};

export default ColorPalleteSelector;
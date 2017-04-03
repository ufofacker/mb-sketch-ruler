import React, { Component, PropTypes } from 'react'
import HorRuler from './components/HorRuler'
import VerRuler from './components/VerRuler'
// import HorRuler from './HorRuler'
// import VerRuler from './VerRuler'

import { getPixelRatio, contextTypes } from './utils'

import './index.css'

export default class SketchRuler extends Component {
  getChildContext () {
    const { props } = this
    return {
      thick: props.thick,
      perWidth: props.perWidth,
      font: props.font,
      scale: props.scale,
      fontScale: 0.83, // 10 / 12
      ratio: getPixelRatio(),
      bgColor: props.bgColor,
      fgColor: props.fgColor,
      fontColor: props.fontColor,
      shadowColor: props.shadowColor,
      onLineChange: this.onLineChange
    }
  }
  // componentDidMount () {
  //   this.forceUpdate()
  // }
  // componentDidUpdate () {
  // }
  handleCornerClick = (e) => {
    e.preventDefault()
    alert('click on corner')
  }
  onLineChange = (arr, vertical) => {
    const { horLineArr, verLineArr, handleLine } = this.props
    const newLines = {
      h: vertical ? horLineArr: arr,
      v: vertical ? arr : verLineArr
    }
    handleLine(newLines)
  }

  render () {
    const { horLineArr, verLineArr, shadow, startX, startY } = this.props
    const { x, y, width, height } = shadow
    return (
      <div className="mb-ruler" ref="ruler">
        <HorRuler start={startX} lines={horLineArr} select={{ x, width }} />
        <VerRuler start={startY} lines={verLineArr} select={{ y, height }} />
        <a className="corner" onClick={this.handleCornerClick} />
      </div>
    )
  }
}
SketchRuler.childContextTypes = contextTypes

SketchRuler.propTypes = {
  dispatch: PropTypes.func,
  groupedItems: PropTypes.object,
  shadow: PropTypes.object,
}
SketchRuler.defaultProps = {
  bgColor: 'white',
  fgColor: '#D9D9D9',
  font: '12px rgba(39, 54, 78, 0.6) -apple-system, ".SFNSText-Regular", "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif',
  shadowColor: 'rgba(0, 0, 0, 0.06)',
  horLineValue: [100, 200],
  verLineValue: [100, 200],
  startX: 0,
  startY: 0,
  thick: 24,
  perWidth: 10,
  scale: 1,
  ratio: getPixelRatio(),
  fontColor: '#000',
  lineColor: 'red',
  shadow: {
    x: 200,
    y: 100,
    width: 200,
    height: 400
  }
}

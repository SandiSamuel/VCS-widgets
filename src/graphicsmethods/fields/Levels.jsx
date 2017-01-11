/* global $ */
import React from 'react'
import Usage from '../../Usage'
var NOP = ()=>{}

function verify(value) {
    if (typeof(value) === 'string') {
        if(value.match(/^[\+-]?[0-9]+((\.[0-9]+)?e\+?[0-9]+)?$/)) {
            return Number.parseFloat(value);
        } else {
            return false;
        }
    }
}
function handleChange(event) {
    let i = Number.parseInt(event.target.name.split('_')[1]);
    let cur_value = event.target.value;
    let levels = this.state.levels;
    let first = levels.slice(0, i).concat(cur_value);
    this.setState({
        levels: first.concat(levels.slice((i + 1), levels.length))
    })
}
var Levels = React.createClass({
    propTypes: {
        addLevel: React.PropTypes.func,
        removeLevel: React.PropTypes.func,
        handleChange: React.PropTypes.func,
        levels: React.PropTypes.array
    },
    getInitialState() {
        return {
            levels: [],
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            levels: nextProps.levels
        })
    },
    addLevel() {
        let cur_gmProps = Object.assign({}, this.props.gmProps);
        cur_gmProps['levels'] = cur_gmProps['levels'].concat(1e+20);
        this.props.updateActiveGM(cur_gmProps, this.props.graphicsMethodParent, this.props.graphicsMethod);
    },
    removeLevel(event) {
        let index = Number.parseInt(event.target.getAttribute('data-index'));
        let cur_gmProps = Object.assign({}, this.props.gmProps);
        let cur_levels = cur_gmProps['levels'];
        let new_levels = cur_levels.slice(0, index).concat(cur_levels.slice((index + 1), cur_levels.length));
        cur_gmProps['levels'] = new_levels;
        this.props.updateActiveGM(cur_gmProps, this.props.graphicsMethodParent, this.props.graphicsMethod);
    },
    handleBlur(event) {
        let property_name = event.target.name.split('_')[0];
        let index = event.target.name.split('_')[1];
        let value = verify(event.target.value);
        if (value === 0 || value) {
            this.props.handleChange(property_name, value, index)
        } else {
            this.setState({
                levels: this.props.levels
            });
            $('#levels-'+index+'-usage').focus()
        }
    },
    render(){
        let usage =  "Set the level range to use. Must be an integer.\n" +
                    "If set to 1e+20, VCS will auto-allocate level value."
        return (
            <div >
                <h5>Levels: </h5>
                {
                    this.state.levels && this.state.levels.length > 0
                    ? this.state.levels.map((value, index) => {
                        return (
                            <div key={'levels_'+index}>
                                <input name={'levels_'+index}
                                    type="text"
                                    value={
                                        Number.isInteger(value) && Math.abs(value) > 1e4
                                        ? value.toExponential()
                                        : value
                                    }
                                    onChange={handleChange.bind(this)}
                                    onBlur={this.handleBlur}/>
                                <button onClick={this.props.removeLevel}
                                    data-index={index}
                                    className='btn btn-secondary'>
                                            -
                                </button>
                                <Usage id={'levels-'+index+'-usage'}
                                    usage={usage} /><br/>
                                {
                                    index === (this.state.levels.length - 1)
                                    ? <button onClick={this.props.addLevel}
                                        className='btn btn-secondary'>
                                        +
                                      </button>
                                    : ''
                                }
                            </div>
                        );
                     })
                    : <span>
                        <button onClick={this.props.addLevel} className='btn btn-secondary'> + </button>
                        <Usage id={'levels-usage'}
                            usage={"Add a level"} />
                      </span>

                }
            </div>
        );
    }
});

export default Levels;
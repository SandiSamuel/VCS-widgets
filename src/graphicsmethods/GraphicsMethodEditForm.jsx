import React from 'react'
import $ from 'jquery'
import ColormapField from './ColormapField'
import BoxfillType from './BoxfillType'
import ColorOneTwo from './ColorOneTwo'
import DatawcCoordinates from './DatawcCoordinates'
import Exts from './Exts'
import TicsAndLabels from './TicsAndLabels'
import AxisTransforms from './AxisTransforms'
import Levels from './Levels'
import FillareaFields from './FillareaFields'
import LevelOneTwo from './LevelOneTwo'
import Missing from './Missing'
import Projection from './Projection'
import Legend from './Legend'

let new_name = (that, graphicsMethods, gm, parent) => {
    // replace this with some sort of call that gets the base gm names for the specific gm
    let base_gms = [
        'a_boxfill', 'a_lambert_boxfill', 'a_mollweide_boxfill',
        'a_polar_boxfill', 'a_robinson_boxfill', 'default', 'polar', 'quick', 'robinson'
    ]
    let name = that.state.gmEditName ?that.state.gmEditName :gm;
    let i;
    // don't squash the base graphics methods
    if (base_gms.includes(name)) {
        i=0;
        do {
            ++i;
        } while(graphicsMethods[parent][name+'__edit__'+i])
        return (name+'__edit__'+i);
    } else {
        return name;
    }
};
var GraphicsMethodEditForm = React.createClass({
    propTypes: {
        graphicsMethod: React.PropTypes.string,
        graphicsMethodParent: React.PropTypes.string,
        gmProps: React.PropTypes.object,
        graphicsMethods: React.PropTypes.object,
        updateGraphicsMethods: React.PropTypes.func,
        updateActiveGM: React.PropTypes.func
    },
    getInitialState() {
        return {
            gmEditName: this.props.graphicsMethod
        }
    },
    componentWillUpdate() {
        $("#commit-gm-edits").prop("disabled", true)
    },
    componentDidUpdate() {
        $("#commit-gm-edits").prop("disabled", false)
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            gmEditName: nextProps.graphicsMethod
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
    handleChange: function(event) {
        let property_name = event.target.name;
        let cur_gmProps = Object.assign({}, this.props.gmProps);
        if (event.target.type === 'checkbox') {
            cur_gmProps[property_name] = event.target.checked;
        } else if (property_name.match(/levels_[0-9]+/)) {
            let level_index = Number.parseInt(property_name.split('_')[1]);
            cur_gmProps['levels'][level_index] = event.target.value;
            console.log(cur_gmProps['levels'][level_index], typeof(cur_gmProps['levels'][level_index]))
        } else {
            cur_gmProps[property_name] = event.target.value;
        }
        this.props.updateActiveGM(cur_gmProps, this.props.graphicsMethodParent, this.props.graphicsMethod);
        console.log(cur_gmProps[property_name], typeof(cur_gmProps[property_name]));
    },
    changeState(property_name, value, index=null) {
        let cur_gmProps = Object.assign({}, this.props.gmProps);
        if(!index) {
            cur_gmProps[property_name] = value;
        } else {
            console.log(index)
            cur_gmProps[property_name][index] = value;
        }
        this.props.updateActiveGM(cur_gmProps, this.props.graphicsMethodParent, this.props.graphicsMethod);
        console.log(cur_gmProps[property_name], typeof(cur_gmProps[property_name]));
    },
    commitEdits() {
        let parent = this.props.graphicsMethodParent;
        let gm = this.props.graphicsMethod;
        let new_props = this.props.gmProps;
        let graphicsMethods = this.props.graphicsMethods;
        let gm_name = new_name(this, graphicsMethods, gm, parent)
        this.props.updateGraphicsMethods(graphicsMethods, new_props, parent, gm, gm_name);
        this.setState({
            gmEditName: ''
        });
    },
    gmEditNameChange(event) {
        this.setState({
            gmEditName: event.target.value
        });
    },
    render() {
        if (!this.props.gmProps.no_gm_selected) {
            return(
                <div>
                    <div className='modal-body'>
                        <div className="container-fluid">
                            <div className='col-md-12'>
                                <div className='row'>
                                    <h3>{"Name for new GM"}</h3>
                                    <input type='text'
                                        value={this.state.gmEditName}
                                        onChange={this.gmEditNameChange}/>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <h4>Boxfill Settings</h4>
                                <div className='col-md-12'>
                                    <BoxfillType handleChange={this.handleChange}
                                        type={this.props.gmProps['boxfill_type']}
                                        headerClass='col-md-4'
                                        radioClass='col-md-4'/>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <Missing handleChange={this.changeState}
                                            missing={this.props.gmProps['missing']}
                                            className='col-md-6'/>
                                        <Exts handleChange={this.handleChange}
                                            ext1={this.props.gmProps['ext_1']}
                                            ext2={this.props.gmProps['ext_2']}
                                            className={
                                                this.props.gmProps['boxfill_type'] !== 'custom'
                                                ? 'col-md-3'
                                                : 'hide'}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <Legend handleChange={this.handleChange}
                                            legend={this.props.gmProps['legend']}
                                            className='col-md-12'/>
                                    </div>
                                </div>
                            </div>
                            <div className={
                                this.props.gmProps['boxfill_type'] !== 'custom'
                                ? 'col-md-12'
                                : 'hide'}>
                                <h4>Linear and Log Settings</h4>
                                <div className="col-md-6">
                                    <LevelOneTwo handleChange={this.changeState}
                                        level1={this.props.gmProps['level_1']}
                                        level2={this.props.gmProps['level_2']} />
                                </div>
                                <div className="col-md-6">
                                    <ColorOneTwo handleChange={this.changeState}
                                        color1={this.props.gmProps['color_1']}
                                        color2={this.props.gmProps['color_2']} />
                                </div>
                            </div>
                            <div className={
                                this.props.gmProps['boxfill_type'] === 'custom'
                                ? 'col-md-12'
                                : 'hide'}>
                                <h4>Custom Settings</h4>
                                <div className='col-md-12'>
                                    <Levels handleChange={this.changeState}
                                        levels={this.props.gmProps['levels']}
                                        addLevel={this.addLevel}
                                        removeLevel={this.removeLevel} />
                                </div>
                                <div className='col-md-12'>
                                    <FillareaFields handleChange={this.handleChange}
                                        colors={this.props.gmProps['fillareacolors']}
                                        style={this.props.gmProps['fillareastyle']}
                                        indices={this.props.gmProps['fillareaindices']}
                                        opacity={this.props.gmProps['fillareaopacity']} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button"
                            className="btn btn-primary"
                            id="commit-gm-edits"
                            onClick={this.commitEdits}
                            data-dismiss="modal">
                            Save changes
                        </button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h5> Please select one of the Graphics Methods from the list on the left side bar. </h5>
                </div>
            )
        }

    }
});

export default GraphicsMethodEditForm;

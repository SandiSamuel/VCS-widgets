import React from 'react'

// TODO: Make a good UI for this feature. For now we're not doing anything with it.


function validate(value) {

}
var TicsAndLabels = React.createClass({
    propTypes: {
        handleChange: React.PropTypes.func,
        xmt1: React.PropTypes.string,
        xmt2: React.PropTypes.string,
        ymt1: React.PropTypes.string,
        ymt2: React.PropTypes.string,
        xtl1: React.PropTypes.string,
        xtl2: React.PropTypes.string,
        ytl1: React.PropTypes.string,
        ytl2: React.PropTypes.string
    },
    handleBlur(event) {
        let name = event.target.name;
        let value = validate(event.target.value);

    },
    render(){
        var that = this.props.that;
        return (
            <div>
                <div id='mtics'>
                    <h5>xmtics1: </h5>
                    <input name='xmtics1'
                        type='text'
                        defaultValue={this.props.xmt1}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>xmtics2: </h5>
                    <input name='xmtics2'
                        type='text'
                        defaultValue={this.props.xmt2}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>ymtics1: </h5>
                    <input name='ymtics1'
                        type='text'
                        defaultValue={this.props.ymt1}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>ymtics2: </h5>
                    <input name='ymtics2'
                        type='text'
                        defaultValue={this.props.ymt2}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                </div>
                <div id='ticlabels'>
                    <h5>xticlabels1: </h5>
                    <input name='xticlabels1'
                        type='text'
                        defaultValue={this.props.xtl1}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>xticlabels2: </h5>
                    <input name='xticlabels2'
                        type='text'
                        defaultValue={this.props.xtl2}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>yticlabels1: </h5>
                    <input name='yticlabels1'
                        type='text'
                        defaultValue={this.props.ytl1}
                        onChange={NOP}
                        onBlur={this.handleBlur}/>
                    <h5>yticlabels2: </h5>
                    <input name='yticlabels2'
                        type='text'
                        defaultValue={this.props.ytl2}
                        onBlur={this.handleBlur}/>
                </div>
            </div>
        )
    }
});

export default TicsAndLabels;

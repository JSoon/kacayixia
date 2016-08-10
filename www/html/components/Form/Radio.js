import React, {Component, PropTypes} from 'react';
import Update from 'react-addons-update'; // Deep copy

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radios: props.radios
        };
    }

    onRadioClick(e, index) {
        e.preventDefault();
        let that = e.target;
        let input = $(that).find('input');
        let shift = $(that).find('.sj');
        input.prop('checked', true);

        let checkedHandler = function (radios, length, index) {
            let newRadios = radios;
            for (let i = 0; i < length; i += 1) {
                newRadios = Update(newRadios, {
                    [i]: { checked: { $set: false } }
                });
            }
            newRadios = Update(newRadios, {
                [index]: { checked: { $set: true } }
            });
            return newRadios;
        }

        let newRadios = checkedHandler(this.state.radios, this.state.radios.length, index);

        this.setState({
            radios: newRadios
        });
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.state !== nextState);
    //     return this.state !== nextState;
    // }

    render() {
        let {radios} = this.state;
        let that = this;

        return (
            <div className="radio-group">
                {
                    radios.map(function (radio, index) {
                        let checkedClass = radio.checked ? 'sj-radio-checked' : 'sj-unchecked';

                        return <label className="radio-inline" onClick={
                            (e) => {
                                that.onRadioClick(e, index);
                            }
                        } key={index}>
                            <i className={"sj " + checkedClass}>
                                {
                                    radio.checked ?
                                        <input type="radio" name={radio.name} defaultValue={radio.value} defaultChecked/>
                                        :
                                        <input type="radio" name={radio.name} defaultValue={radio.value}/>
                                }
                            </i>{radio.text}
                        </label>
                    })
                }
            </div>
        );
    }
};

Radio.propTypes = {
    radios: PropTypes.arrayOf(PropTypes.shape({
        checked: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired)
};

export default Radio;
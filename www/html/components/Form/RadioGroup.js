import React, {Component, PropTypes} from 'react';
import Update from 'react-addons-update'; // Deep copy

class RadioGroup extends Component {
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
        // let radios = this.state.radios.slice();
        console.log(this.state.radios);
        let newRadios = Update(this.state.radios, {
            $push: []
        });
        newRadios.map(function (radio) {
            radio.checked = false;
        });
        newRadios[index].checked = true;
        console.log(newRadios);
        this.setState({
            radios: newRadios
        }, function () {

        });
    }

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

RadioGroup.propTypes = {
    radios: PropTypes.arrayOf(PropTypes.shape({
        checked: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired)
};

export default RadioGroup;
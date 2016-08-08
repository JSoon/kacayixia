import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/Button/Button';
import RadioGroup from '../../components/Form/RadioGroup'
import './my.less';

class Price extends Component {
    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        <div className="my-price">
                            <PageTitle
                                title="定价"
                                subTitle="给您的照片贴上价格，方便其他网友购买。"
                                />
                            <form className="row">
                                <div className="col-lg-8 col-lg-offset-2">
                                    <div className="row">
                                        <div className="price-img">
                                            <div className="col-lg-6">
                                                <img className="img-responsive" src="http://placekitten.com/g/800/600"/>
                                            </div>
                                            <div className="col-lg-6">
                                                <dl>
                                                    <dt>标清，1200x800 px，5MB</dt>
                                                    <dd>
                                                        <RadioGroup
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                    <dt>高清，2500x1600 px，10MB</dt>
                                                    <dd>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-radio-checked"><input type="radio" name="p720" value=""/></i>免费
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p720" value=""/></i>5元
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p720" value=""/></i>10元
                                                        </label>
                                                    </dd>
                                                    <dt>超清，3500x2400 px，20MB</dt>
                                                    <dd>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-radio-checked"><input type="radio" name="p1080" value=""/></i>免费
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p1080" value=""/></i>5元
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p1080" value=""/></i>10元
                                                        </label>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="price-img">
                                            <div className="col-lg-6">
                                                <img className="img-responsive" src="http://placekitten.com/g/800/600"/>
                                            </div>
                                            <div className="col-lg-6">
                                                <dl>
                                                    <dt>标清，1200x800 px，5MB</dt>
                                                    <dd>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-radio-checked"><input type="radio" name="p480" value=""/></i>免费
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p480" value=""/></i>5元
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p480" value=""/></i>10元
                                                        </label>
                                                    </dd>
                                                    <dt>高清，2500x1600 px，10MB</dt>
                                                    <dd>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-radio-checked"><input type="radio" name="p720" value=""/></i>免费
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p720" value=""/></i>5元
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p720" value=""/></i>10元
                                                        </label>
                                                    </dd>
                                                    <dt>超清，3500x2400 px，20MB</dt>
                                                    <dd>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-radio-checked"><input type="radio" name="p1080" value=""/></i>免费
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p1080" value=""/></i>5元
                                                        </label>
                                                        <label className="radio-inline J_Radio">
                                                            <i className="sj sj-unchecked"><input type="radio" name="p1080" value=""/></i>10元
                                                        </label>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-lg-offset-4">
                                    <div className="form-group">
                                        <a className="btn btn-block" href="#">保 存</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Price;
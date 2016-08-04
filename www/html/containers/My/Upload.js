import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/Button/Button';
import template from '../../components/PhotoUploader/template';
import './my.less';

class Upload extends Component {
    componentDidMount() {
        // 创建 uploader 实例
        let uploader = new qq.FineUploader({
            debug: true, // show logs in console panel
            element: document.getElementById('J_FineUploader'),
            // template: 'qq-template', // defaults to qq-template
            template: $(template).get(0),
            autoUpload: false, // defaults to true
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
            },
            request: {
                endpoint: '/uploads'
            },
            deleteFile: {
                enabled: true, // defaults to false
                endpoint: '/my/delete/endpoint'
            },
            retry: {
                enableAuto: true, // defaults to false
                autoRetryNote: '重试 {retryNum}/{maxAuto} ...'
            },
            messages: {
                noFilesError: '您没有选择文件',
                typeError: '{file} 格式错误，请上传: {extensions}。'
            },
            text: {
                failUpload: '上传失败'
            }
        });
        // 手动触发上传
        qq(document.getElementById('J_TriggerUpload')).attach('click', function () {
            uploader.uploadStoredFiles();
        });
    }

    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        <div className="my-upload">
                            <PageTitle
                                title="上传"
                                subTitle="上传您自己的照片。"
                                />
                            <div id="J_FineUploader">
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Upload;
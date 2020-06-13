import React, {Component} from 'react';
import axios from 'axios';

import DefaultImg from './assets/default-img.jpg';

import swal from "sweetalert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import disableBrowserBackButton from "disable-browser-back-navigation";
import Alert from "@material-ui/lab/Alert";




class AddDoc extends Component{
    state = {
        docUn: "",
        docName: "",
        channelFee: "",
        specialization: "",
        hospital: "",
        channelDays: "",
        time: "",
        img1: "",
        img2: "",
        multerImage: DefaultImg,
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };


    componentDidMount() {

        disableBrowserBackButton();
    }


    onChangeDocUn =(e) =>{
        this.setState({
            docUn: e.target.value
        });
    }

    onChangeDocName =(e) =>{
        this.setState({
            docName: e.target.value
        });
    }


    onChangeChannelFee =(e) =>{
        this.setState({
            channelFee: e.target.value
        });
    }

    onChangeSpecialization  =(e) =>{
        this.setState({
            specialization: e.target.value
        });
    }

    onChangeHospital =(e) =>{
        this.setState({
            hospital: e.target.value
        });
    }

    onChangeChannelDays =(e) =>{
        this.setState({
            channelDays: e.target.value
        });
    }

    onChangeTime =(e) =>{
        this.setState({
            time: e.target.value
        });
    }


    setDefaultImage (uploadType)  {
        if (uploadType === "multer") {
            this.setState({
                multerImage: DefaultImg
            });
        }
    }


    setImage (e, method) {

        if (method === "multer") {


            this.setState({
                img1:"multer-image-" + Date.now(),
                img2 : e.target.files[0]
            });



            this.setState({
                multerImage: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    onSubmit =(e) =>{
        e.preventDefault();

        let imageFormObj = new FormData();

        imageFormObj.append("imageName", this.state.img1);
        imageFormObj.append("imageData", this.state.img2);
        imageFormObj.append("docUn", this.state.docUn);
        imageFormObj.append("docName", this.state.docName);
        imageFormObj.append("channelFee", this.state.channelFee);
        imageFormObj.append("specialization", this.state.specialization);
        imageFormObj.append("hospital", this.state.hospital);
        imageFormObj.append("channelDays", this.state.channelDays);
        imageFormObj.append("time", this.state.time);

        axios.post('http://localhost:5000/api/doc/add', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    swal("Successful", "Doctor Details Added", "success");

                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Doctor Details Not Added", "error");

            });



        this.setState({
            docUn: "",
            docName: "",
            channelFee: "",
            specialization: "",
            hospital: "",
            channelDays: "",
            time: "",
            img1: "",
            img2: "",
            multerImage: DefaultImg,
            msg: null
        })



        //this.props.history.push('/guest');
    }

    render() {

        const {isAuthenticated, user} =  this.props.emp;

        return(
            <div style={{marginTop: 10}}>

                {!isAuthenticated ?

                    <div className="text-center">
                    <Alert className="text-center" color="danger"><h3><p className="text-danger text-center">Please Login To add Doctor Details</p></h3></Alert>
                    <br/>      <br/>          <br/>              <br/>            <br/>             <br/>                <br/>          <br/> <br/>



                    </div>

                        :

                <div>


                    <h3>Add Doctor Details</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Doctor's Username :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.docUn}
                                onChange={this.onChangeDocUn}
                                maxLength="10"
                            />
                        </div>

                        <div className="form-group">
                            <label>Doctor's Name :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.docName}
                                onChange={this.onChangeDocName}
                            />
                        </div>

                        <div className="form-group">
                            <label>Doctor's Specialization :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.specialization}
                                onChange={this.onChangeSpecialization}

                            />
                        </div>

                        <div className="form-group">
                            <label>Channeling Charges :</label>
                            <input
                                type="number"
                                className="form-control"
                                value={this.state.channelFee}
                                onChange={this.onChangeChannelFee}

                            />
                        </div>


                        <div className="form-group">
                            <label>Working Hospital :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hospital}
                                onChange={this.onChangeHospital}

                            />
                        </div>



                        <div className="form-group">
                            <label>Channeling Days :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.channelDays}
                                onChange={this.onChangeChannelDays}
                            />
                        </div>

                        <div className="form-group">
                            <label>Available Time :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.time}
                                onChange={this.onChangeTime}

                            />
                        </div>


                        <div className="form-group">
                            <label>Add Doctor Photo :</label>
                            <div className="main-container">
                                <div className="image-container">
                                    <div className="process">

                                        <input type="file" className="process__upload-btn" onChange={(e) => this.setImage(e, "multer")}/>
                                        <img src={this.state.multerImage} alt="upload-image" className="process__image" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Add Details" className= "btn btn-primary"/>
                        </div>
                    </form>


                </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.emp.isAuthenticated,
    emp: state.emp,
});

export default connect(mapStateToProps, null)(AddDoc);
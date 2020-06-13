import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "react-notifications/lib/notifications.css";





class SearchDocListComponent extends Component {
    state = {
        pager: {},
        pageOfItems: [],
        query : ""
    };



    static propTypes = {
        isAuthenticated: PropTypes.bool,
        emp: PropTypes.object.isRequired,
    };

    setSearch = (e) => {
        this.setState({
            query: e.target.value,
            pager: {},
            pageOfItems: []
        });
    }

    loadPage = (e) => {
        // get page details and items from api
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get("page")) || 1;
        if (page !== this.state.pager.currentPage) {
            fetch(`http://localhost:5000/api/doc/get/all/paginate/search?page=${page}&sitem=${this.state.query}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then(({ pager, pageOfItems }) => {
                    this.setState({ pager, pageOfItems });
                });
        }
        this.setState({
            query: ""
        });
    };

    render() {
        const { user } = this.props.emp;
        const { pager, pageOfItems } = this.state;
        return (
            <div>


                <div style={{height:"50px"}} />
                {/*--------------------------------------------------------------------------------------------------*/}

                <form onSubmit={this.loadPage}>

                    <div className="form-group">
                        <label>Advanced Search (Search by Name or Specialization):</label>
                        <input type="text" className="form-control"  value={this.state.query} onChange={this.setSearch}/>

                    </div>



                    <div className="form-group">

                        <input type="submit" value="Search" className="btn btn-primary"/>

                    </div>
                </form>
                <br/>

                {/*--------------------------------------------------------------------------------------------------*/}


                <div className="card text-center m-3">
                    <h3 className="card-header font-weight-bold">Doctor List</h3>

                    <div className="card-body ">
                        {pageOfItems.map((item) => (
                            <div key={item._id}>
                                <div className="container rounded-0 border border-info ">
                                    <div className="container ">
                                        <div className="row">
                                            <div className="col-sm">
                                                <br />
                                                <img
                                                    height="80%"
                                                    width="100%"
                                                    src={`/uploads/${item.imageData}`}
                                                />
                                                <br />
                                            </div>
                                            <div className="col-sm">
                                                <br />
                                                <br />
                                                <br />
                                                <h4 className="font-weight-bold text-center text-danger ">
                                                    {item.docName}
                                                </h4>
                                                <h6 className="font-weight-bold text-center">
                                                    Specialization : {item.specialization}
                                                </h6>
                                                <h5 className="font-weight-bold text-center text-info">
                                                    Channeling Fee : Rs {item.channelFee}.00
                                                </h5>
                                                <br />
                                                <br />
                                            </div>

                                            <div className="col-sm">
                                                <br />
                                                <br />
                                                <br />
                                                <h6 className="font-weight-bold text-center">
                                                    Hospital : {item.hospital}
                                                </h6>
                                                <h6 className="font-weight-bold text-center text-primary">
                                                    Channeling Days : {item.channelDays}
                                                </h6>
                                                <h6 className="font-weight-bold text-center text-success">
                                                    Channeling Time : {item.time}
                                                </h6>
                                                <p className="font-weight-bold text-center text-warning">
                                                    Doctor ID : {item.docUn}
                                                </p>
                                                <br />
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                    <div className="card-footer pb-0 pt-3">
                        {pager.pages && pager.pages.length && (
                            <ul className="pagination">
                                <li
                                    className={`page-item first-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link to={{ search: `?page=1` }} className="page-link">
                                        First
                                    </Link>
                                </li>

                                <li
                                    className={`page-item previous-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage - 1}` }}
                                        className="page-link"
                                    >
                                        Previous
                                    </Link>
                                </li>

                                {pager.pages.map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item number-item ${
                                            pager.currentPage === page ? "active" : ""
                                        }`}
                                    >
                                        <Link
                                            to={{ search: `?page=${page}` }}
                                            className="page-link"
                                        >
                                            {" "}
                                            {page}{" "}
                                        </Link>
                                    </li>
                                ))}
                                <li
                                    className={`page-item next-item ${
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage + 1}` }}
                                        className="page-link"
                                    >
                                        {" "}
                                        Next{" "}
                                    </Link>
                                </li>

                                <li
                                    className={`page-item last-item ${
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.totalPages}` }}
                                        className="page-link"
                                    >
                                        Last
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.emp.isAuthenticated,
    emp: state.emp,
});

export default connect(mapStateToProps, null)(SearchDocListComponent);

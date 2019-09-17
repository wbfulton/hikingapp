import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Drive = ({ drive }) => {
    return (
        <Fragment>
            <h2 classname="my-2"></h2>
            <table>
                <thead>
                    <th></th>
                </thead>
            </table>
        </Fragment>
    )
}

Drive.propTypes = {

}

export default connect()(Drive);


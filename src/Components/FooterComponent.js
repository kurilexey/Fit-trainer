import React from 'react';
import {connect} from 'react-redux';

const FooterComponent = () => {
    return(
        <div className={"footerIn"}>
            <div className={"footerInlinks"}>
                <div>
                    DASHBOARD
                </div>
                <div>
                    NEW EXERCISE
                </div>
                <div>
                    EDIT EXERCISE
                </div>
                <div>
                    NEW WORKOUT
                </div>
                <div>
                    EDIT WORKOUT
                </div>
            </div>
            <div>
                &#169; 2019 Alex Kurilo, made with love for a better web
            </div>
        </div>
    );
};


export default connect(
    (state) => ({
        props: state.props
    })
)(FooterComponent);
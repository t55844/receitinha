import React, { Component, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { recipeFromDB } from '../../js/redux/reduxSlice/fetchSlice';

export function HOCWithRecipeData(WrappedComponent) {
    const dispatch = useDispatch()

    return class extends Component {
        state = {
            data: [],
            loading: true,
            failed: false
        }

        async componentDidMount() {
            const data = dispatch(recipeFromDB())


            if (data && data.length > 0) { this.setState({ data, loading: false, failed: false }) }
            else { this.setState({ data: [], loading: false, failed: true }) }

        }

        render() {
            return <WrappedComponent repoData={this.state} {...this.props} />;
        }
    };
}
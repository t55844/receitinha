import React, { Component, useContext } from 'react';
import { Provider, useSelector, useStore } from 'react-redux';
import { myRecipesList } from '../../js/MyRecipes/myRecipesList';
import store from '../../js/redux/store';

export function HOCWithRecipeData(WrappedComponent) {
    const state = useStore()
    console.log(state.getState().user.value)
    const user = useSelector(store.getState().user.value)
    return class extends Component {
        state = {
            data: [],
            loading: true,
            failed: false
        }

        async componentDidMount() {
            const data = await myRecipesList.recipeFromDB(user.email)
                .catch(error => console.log('HOC Recipes' + error))

            if (data && data.length > 0) { this.setState({ data, loading: false, failed: false }) }
            else { this.setState({ data: [], loading: false, failed: true }) }

        }

        render() {
            return <WrappedComponent repoData={this.state} {...this.props} />;
        }
    };
}
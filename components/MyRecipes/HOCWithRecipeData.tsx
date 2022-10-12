import React, { Component } from 'react';
import { myRecipesList } from '../../js/MyRecipes/myRecipesList';

export function HOCWithRecipeData(WrappedComponent) {
    return class extends Component {
        state = {
            data: [],
            loading: true,
        }

        async componentDidMount() {
            const data = await myRecipesList.recipeFromDB()
            this.setState({ data, loading: false });
        }

        render() {
            return <WrappedComponent repoData={this.state} {...this.props} />;
        }
    };
}
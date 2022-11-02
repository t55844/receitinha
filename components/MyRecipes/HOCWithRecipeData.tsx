import React, { Component } from 'react';
import { myRecipesList } from '../../js/MyRecipes/myRecipesList';

export function HOCWithRecipeData(WrappedComponent) {
    return class extends Component {
        state = {
            data: [],
            loading: true,
            failed: false
        }

        async componentDidMount() {
            const data = await myRecipesList.recipeFromDB()
                .catch(error => console.log('HOC Recipes' + error))

            if (data.length != 0) { this.setState({ data, loading: false, failed: false }) }
            else { this.setState({ data, loading: false, failed: true }) }

        }

        render() {
            return <WrappedComponent repoData={this.state} {...this.props} />;
        }
    };
}
import Router from "next/router"

function nextRouterPush(data, path) {

    Router.push({
        pathname: path,
        query: { data: JSON.stringify(data) }
    })
}

export default {
    nextRouterPush
}
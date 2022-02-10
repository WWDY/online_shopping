import {Route, Routes} from "react-router-dom";
import * as React from "react";
import {ReactElement} from "react";
import {RouteObject} from "react-router-dom";
import NotFound from "../page/NotFound";

export interface CustomerRouteObject extends RouteObject {
    meta?: {
        title?: string,
        auth?: boolean
    },
    element: ReactElement,
    children?: CustomerRouteObject[]
}

type Props = {
    data: CustomerRouteObject
};

const Guard = (props: Props) => {

    const {meta, element} = props.data

    if (meta?.title) {
        document.title = meta.title
    }

    if (meta?.auth) {
        return <NotFound/>
    } else {
        return element
    }
}

const useRoutes = (routes: CustomerRouteObject[]): ReactElement => {
    return (
        <Routes>
            {
                routes.map((route, index) => {
                    return (
                        <Route caseSensitive={route.caseSensitive} key={index} path={route.path}
                               element={<Guard data={route}/>}>
                            {traverseChildren(route.children, index)}
                        </Route>
                    )
                })
            }
        </Routes>
    )
}

const traverseChildren = (childrenRoutes: CustomerRouteObject[] | undefined, parentIndex: number): ReactElement => {
    if (childrenRoutes && childrenRoutes.length > 0) {
        return (
            <>
                {
                    childrenRoutes.map((route, index) => {
                        return (
                            <Route key={parentIndex + "-" + index} path={route.path} element={<Guard data={route}/>}
                                   index={route.index}>
                                {traverseChildren(route.children, index)}
                            </Route>
                        )
                    })
                }
            </>
        )

    } else {
        return (
            <></>
        )
    }

}

export default useRoutes

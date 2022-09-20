import {Route, Switch, useLocation} from 'react-router-dom';
import BrandView from "../views/BrandView";
import AddBrandForm from "../views/forms/AddBrandForm";
import {useEffect} from "react";
import {loadJS} from "../utils/utils";

export const routesConfig = [
    {
        component: BrandView,
        path: '/brands',
        title: 'Brand',
        exact: true
    },
    {
        component: AddBrandForm,
        path: '/addBrand',
        title: 'Add Brand',
        exact: true
    },
    {
        component: AddBrandForm,
        path: '/addBrand/edit/:id',
        title: 'Edit Brand',
        exact: true
    }
]

const AllRoutes = () => {
    const location = useLocation()

    useEffect(() => {
        loadJS();
    }, [location.pathname]);

    return (
        <Switch>
            {
                routesConfig.map(route =>
                    <Route key={route.path} path={route.path} exact component={route.component} />
                )
            }
        </Switch>
    )

}
export default AllRoutes;
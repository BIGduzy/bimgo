// Homemade
import * as Routes from 'Containers';

// node_modules
import { default as React } from 'react';
import { Switch, Route } from 'react-router-dom';

const Routs = (() => {
    return (
        <Routes.Root>
            <Switch>
                <Route name="Home" exact path="/" component={Routes.Rooms} />
                <Route name="Rooms" exact path="/rooms" component={Routes.Rooms} />
                <Route name="Room" exact path="/rooms/:room" component={Routes.Bimgo} />
            </Switch>
        </Routes.Root>
    );
})();
export default Routs;

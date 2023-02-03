import React, { Suspense, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Routes } from '../../route/routes'
import { localStorageUtils } from '../../utils/LocalStorageUtils'

const loading = (
   <div className="spinner">
      <div className="pt-3 text-center">
        <div uk-spinner="ratio: 3"></div>
      </div>
    </div>
  
)

const TheContent = () => {
  const [routes, setRoutes] = useState(Routes.getFixedRoutes())

  useEffect(() => {
    const userPref = localStorageUtils.getSelectedPlantUserPreferance()
    if (userPref) {
      let allRoutes = Routes.getAllRoutes(userPref)
      setRoutes(allRoutes)
    }
  }, [])

  return (
    <Suspense fallback={loading}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
              />
            )
          )
        })}
        <Redirect from="/" to="/CurrentStatus" exact="true" />
        <Redirect from="//" to="/CurrentStatus" exact="true" />
      </Switch>
    </Suspense>
  )
}
export default React.memo(TheContent)

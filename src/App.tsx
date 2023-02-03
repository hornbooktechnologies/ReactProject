import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { localStorageUtils } from './utils/LocalStorageUtils'

const loading = (
  <div className="spinner">
      <div className="pt-3 text-center">
        <div uk-spinner="ratio: 3"></div>
      </div>
    </div>
)
const TheLayout = React.lazy(() => import('./components/organisms/TheLayout'))
const TheLoginLayout = React.lazy(
  () => import('./components/views/pages/login/TheLoginLayout')
)
const App = () => {
  useEffect(()=> {
    if (localStorageUtils.getIsLoggedIn()) {
      const allPlants = localStorageUtils.getUserPreferences();
      const userPreference = localStorageUtils.getSelectedPlantUserPreferance();
      if (!userPreference) 
        localStorageUtils.setSelectedPlantUserPreferance(JSON.stringify(allPlants[0]));
    }
  })


  return (
    <>
      { localStorageUtils.getIsLoggedIn() ? (
        <React.Suspense fallback={loading}>
          <Switch>
            <TheLayout />
          </Switch>
        </React.Suspense>
      ) : (
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="" component={TheLoginLayout} />
          </Switch>
        </React.Suspense>
      )}
    </>
  )
}
export default App

// defile App component that use useProfile() hook and render it's data to UI
import React from 'react'
import { useProfile } from '~/hooks'

const App: React.FC = () => {
  const { data: profile, isPending, isError, error } = useProfile()

  if (isPending) {
    return <div>Loading profile...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='App'>
      <h1>User Profile</h1>
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}
    </div>
  )
}

export default App

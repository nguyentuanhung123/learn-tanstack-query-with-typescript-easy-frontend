// export userAPI object with one method getProfile from axiosClinet.get() with path /public-profile

// add type definition for the following object
// {
//     "id": "public-profile",
//     "name": "Allan Beier",
//     "city": "Thompsonmouth",
//     "email": "carmen.mcdermott@kaleb.ca"
// }

import axiosClient from './axios-client'

export type UserProfile = {
  id: string
  name: string
  city: string
  email: string
}

export const userApi = {
  getProfile: (): Promise<UserProfile> => axiosClient.get('/public-profile')
}

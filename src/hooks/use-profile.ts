// define custom hook useProfile to use useQuery and call API userApi.getProfile
// declare a params as use query options but omit queryKey and queryFn (hàm sẽ nhận vào những thông tin như use query options, phải bỏ đi 2 thứ là queryKey và queryFn)
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { userApi, UserProfile } from '~/api'

type UserProfileQueryOptions = Omit<UseQueryOptions<UserProfile>, 'queryKey' | 'queryFn'>

export const useProfile = (options?: UserProfileQueryOptions) => {
  return useQuery({
    ...options,
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
}

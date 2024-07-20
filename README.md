# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### Sử dụng AI Codeium để chạy AI : Ctrl + i

- Ví dụ ở file axios-client

export an object axiosClient as a new instance of axios with
- baseURL: https://js-post-api.herokuapp.com/api
- header: content type json
- add interceptor response, use response.data if available, otherwise fallback to response

### Video 8: Simple Query
- Get started with a simple query first!

src
|__ api
|   |__ user-api.ts
|   |__ index.ts # export all from api files
|
|__ hooks
|   |__ use-profile.ts 
|   |__ index.ts # export all from hook files
|
|__ app.tsx # use custom hook and render data on UI

## 1. UserAPI - getProfile()
- src/api/user-api.ts

```tsx
// GPT: export userApi object with one method getProfile from axiosClient.get() with path /public-profile
import axiosClient from './axios-client'

export interface UserProfile {
  id: string
  name: string
  city: string
  email: string
}

export const userApi = {
  getProfile: (): Promise<UserProfile> => axiosClient.get('/public-profile'),
}
```

## 2. 2. New hook: useProfile()
- src/hooks/use-profile.ts

```tsx
// GPT: define custom hook useProfile to use useQuery and call API userApi.getProfile
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { userApi, UserProfile } from '@/api'

export const useProfile = (options?: Omit<UseQueryOptions<UserProfile>, 'queryKey' | 'queryFn'>) => {
  return useQuery<UserProfile>({
    ...options,
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
  })
}
```

## 3. Use custom hook in our component
- src/App.tsx

```tsx
// GPT: define App component that use useProfile() hook and render it's data to UI
import { useProfile } from '@/hooks'

const App: React.FC = () => {
  const { data: userProfile, isLoading, isError, error } = useProfile()

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Render other user profile data as needed */}
        </div>
      )}
    </div>
  )
}

export default App
```

## 4. Fix compatible issue, Tanstack Query required at least react 18

- Update react, react-dom to the latest version

- npm i react react-dom
- npm i --dev @types/react @types/react-dom

# NOTES
- In case the issue is not resolved, perhaps we can try to clean node_modules and re-install again.

## 5. Update main.tsx code

```tsx
// GPT: change to react 18 setup version
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// create once with default options
const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

### Câu lệnh export * from './user-api' trong TypeScript được sử dụng để xuất khẩu (export) tất cả các thành phần (symbols) từ module ./user-api. Điều này có nghĩa là tất cả các hàm, biến, lớp, kiểu dữ liệu, v.v. được khai báo và xuất khẩu trong module ./user-api sẽ được tái xuất khẩu từ module hiện tại.

## Cách hoạt động:
- Giả sử trong file user-api.ts bạn có các khai báo sau:

```tsx
// user-api.ts
export const fetchUser = async (id: string) => {
  // logic to fetch user by id
};

export const createUser = async (user: UserProfile) => {
  // logic to create a new user
};

export type UserProfile = {
  id: string;
  name: string;
  city: string;
  email: string;
};
```

## Bây giờ, khi bạn sử dụng export * from './user-api' trong một file khác, tất cả các xuất khẩu từ user-api.ts sẽ được tái xuất khẩu.

```tsx
// index.ts
export * from './user-api';
```

## Lợi ích:
- Tiện lợi: Bạn có thể gộp nhiều module nhỏ vào một module lớn hơn mà không cần phải liệt kê từng thành phần.
- Tái sử dụng: Dễ dàng tái sử dụng và tổ chức mã nguồn khi làm việc với các module lớn.
- Giảm thiểu lỗi: Tránh việc phải cập nhật nhiều nơi khi thêm hoặc sửa đổi các xuất khẩu trong module nguồn.

## Ví dụ sử dụng:
- Bây giờ, nếu bạn nhập khẩu từ another-file.ts, bạn sẽ có quyền truy cập tới tất cả các thành phần được xuất khẩu từ user-api.ts:

```tsx
// app.ts
import { fetchUser, createUser, UserProfile } from './index,ts';

const user: UserProfile = {
  id: '1',
  name: 'John Doe',
  city: 'New York',
  email: 'john.doe@example.com'
};

createUser(user);
fetchUser(user.id);
```

## Kết luận:
- Câu lệnh export * from './user-api' là một cách hiệu quả để tái xuất khẩu tất cả các thành phần từ một module khác, giúp tổ chức mã nguồn và quản lý các module trong dự án dễ dàng hơn.

###  Giải thích về đoan code bên dưới

```tsx
export const userApi = {
  getProfile: (): Promise<UserProfile> => axiosClient.get('/public-profile')
}
```

- Đoạn code bạn đưa ra là một phần của một module JavaScript hoặc TypeScript, sử dụng cú pháp ES6 và axios để gọi API. Dưới đây là giải thích chi tiết về từng phần của đoạn code:

```tsx
export const userApi = { ... }:
```

- Đây là cách xuất khẩu một đối tượng từ một module, cho phép các phần khác trong ứng dụng sử dụng đối tượng này. userApi là tên của đối tượng được xuất khẩu.

# getProfile: (): Promise<UserProfile> => axiosClient.get('/public-profile'):


- getProfile là một phương thức (hoặc function) của đối tượng userApi.
- (): Promise<UserProfile>: Đây là cách khai báo kiểu của phương thức getProfile. Phương thức này không nhận tham số nào (()) và trả về một Promise có kiểu dữ liệu UserProfile.
- axiosClient.get('/public-profile'): Đây là cách gọi một phương thức get từ đối tượng axiosClient, để gửi một yêu cầu GET đến đường dẫn /public-profile. axiosClient có thể là một instance của axios được cấu hình sẵn cho ứng dụng của bạn.

# Promise<UserProfile>:

- Promise là một đối tượng đại diện cho một giá trị mà có thể sẽ xuất hiện trong tương lai (kết quả của một phép toán bất đồng bộ). Trong trường hợp này, Promise<UserProfile> có nghĩa là hàm getProfile trả về một Promise mà khi Promise đó được giải quyết (resolved), giá trị trả về sẽ có kiểu UserProfile.

- Tóm lại, phương thức getProfile sẽ thực hiện một yêu cầu GET đến đường dẫn /public-profile và trả về một Promise. Khi Promise này được giải quyết, nó sẽ chứa dữ liệu của người dùng có kiểu UserProfile.

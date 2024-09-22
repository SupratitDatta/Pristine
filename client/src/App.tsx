import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth } from './Pages/Layout';
import Home from './Pages/Home';
import ListPage from './Pages/ListPage';
import SinglePost from './Pages/SinglePost';
import ProfilePage from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProfileUpdatePage from './Pages/ProfileUpdate';
import NewPostPage from './Pages/NewPost';
import NotFound from './Pages/NotFound';
import { listPageLoader, profilePageLoader, singlePageLoader } from './utils/loaders';
import './scss/app.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/list', element: <ListPage />, loader: listPageLoader },
            { path: '/:id', element: <SinglePost />, loader: singlePageLoader },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <SignUp /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        path: '/',
        element: <RequireAuth />,
        children: [
            { path: '/profile', element: <ProfilePage />, loader: profilePageLoader },
            { path: '/profile/update', element: <ProfileUpdatePage /> },
            { path: '/add', element: <NewPostPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
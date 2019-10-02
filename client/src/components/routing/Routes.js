import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Layout
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
// Auth
import Register from '../auth/Register';
import Login from '../auth/Login';
// Dashboard
import Dashboard from '../dashboard/Dashboard';
// Profile
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
// Posts
import Posts from '../posts/Posts';
import Post from '../post/Post';
// Drives
import Drives from '../drives/Drives';
import EditDrive from '../drive-forms/EditDrive';
import Group from '../drive/Group';
import Drive from '../drive/Drive';
const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/drives" component={Drives} />
        <PrivateRoute exact path="/edit-drive/:id" component={EditDrive} />
        <PrivateRoute exact path="/drives/:id" component={Drive} />
        <PrivateRoute exact path="/drives/group/:id" component={Group} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

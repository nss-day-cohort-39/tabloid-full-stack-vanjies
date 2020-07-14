import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";
import PostDetails from "./PostDetails"
import MyPostList from "./MyPostList";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import NewTagForm from "./NewTagForm";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/getbyuser" exact>
          {isLoggedIn ? <MyPostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newtag" exact>
          {isLoggedIn ? <NewTagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/newpost">
          <NewPostForm />
        </Route>

        <Route path={`/posts/:id`}>
          <PostDetails />
        </Route>
      </Switch>
    </main>
  );
};

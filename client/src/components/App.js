import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ChannelList from "./ChannelList";
import Channel from "./Channel";
import Post from "./Post";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/channels" component={ChannelList} />
        <Route path="/channels/:id" component={Channel} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default App;

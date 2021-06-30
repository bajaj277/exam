import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import uuid from "react-uuid";
import Home from "./home";
import config from "./config/config.json";
import http from "./utils/httpService";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    console.clear();
    const { data: posts } = await http.get(config.urlEndPoint);
    //http.get(config.urlEndPoint).then((response) => console.log(response.data))
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = {
      title: "NEW POST ADDED",
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias assumenda, quia ab ratione non tenetur, unde ea repellendus eaque iusto, incidunt possimus odit ducimus sunt nam dolor! Vel, illum commodi.",
    };
    const { data: post } = await http.post(config.urlEndPoint, obj);

    console.log(post);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async (post) => {
    post.title = "THE TITLE HAVE BEEN UPDATED!";
    post.body="THE BODY HAVE BEEN UPDATED"
    const { data } = await http.put(config.urlEndPoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async (post) => {
    try {
      const temp = await http.delete(config.urlEndPoint + "/" + post.id);
    } catch (err) {}

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
          
        <ToastContainer />
        
<div style={{textAlign:"center"}}>
<button className="btn btn-secondary btn-block btn-lg m-2" style={{minWidth:"100%"}} onClick={this.handleAdd}>
          Add New Post
        </button>
</div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

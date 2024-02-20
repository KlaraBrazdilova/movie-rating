import React, {Component} from "react";
import Modal from "./components/Modal";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      modal: false,
      activeItem:{
        title: "",
        rating: "",
      }
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/movies/")
      .then((res) => this.setState({movies: res.data}))
      .catch((err) => console.log(err));
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/movies/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/movies/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/movies/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {title: "", rating: ""};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  editItem = (item) => {
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  redenrMovies = () => {
    const {movies} = this.state;
    return movies.map((item) => (
      <div key={item.id} className="w-[75%] m-auto bg-slate-300 p-4 grid grid-cols-[4fr_1fr_1fr_1fr]">
        <span>{item.title}</span> 
        <span>{item.rating}</span>
        <button onClick={() => this.editItem(item)}>Edit</button>
        <button onClick={() => this.handleDelete(item)}>Delete</button>
      </div>
    ));
  };

  render() {
    return (
      <main className="bg-slate-400 w-100 h-[100vh]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold m-auto w-fit p-5">Movie Ratings</h1>
          <button onClick={this.createItem} className="text-white bg-slate-700 font-medium rounded-lg text-sm w-fit p-3 absolute bottom-10 right-10">Add Movie</button>
          {this.redenrMovies()}
        </div>

        {this.state.modal ? (
            <Modal 
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
      </main>
    );
  }
}

export default App;
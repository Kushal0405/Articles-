import React, { Component } from "react";
import Axios from "axios";
import List from "./list";
import Input from "./inputs";
import Buttons from "./buttons";
import Articles from "./articles";
export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.intialState,
      Date: new Date(),
    };
  }

  intialState = {
    article: "",
    author: "",
    subject: "",
    createdAt: null,
    isUpdate: false,
  };

  getdata() {
    Axios.get("http://localhost:4000/")
      .then((res) => {
        this.setState({
          data: res.data,
          fulldata: res.data,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getdata();
  }

  _handleChange = (date) => {
    this.setState({ date });
  };

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // ___________________________________________ONCLICK___________________________________________________

  _onClick = (e, data, _id) => {
    console.log(`http://localhost:4000/${data._id}`);
    Axios.get(`http://localhost:4000/${data._id}`)
      .then((res) => {
        const { author, article, subject, createdAt } = res.data;
        this.setState(
          {
            author,
            article,
            subject,
            createdAt,
            isUpdate: true,
          },
          () => localStorage.setItem("userData", JSON.stringify(data))
        );
      })
      .catch((err) => alert(JSON.stringify(err)));
  };

  ////-------------------------ONSUBMIT-----------------------------///

  _onSubmit = (e, data) => {
    e.preventDefault();
    const { author, article, subject, createdAt, isUpdate } = this.state;
    const prevData = JSON.parse(localStorage.getItem("userData"));
    console.log(prevData);
    if (isUpdate === true) {
      console.log("a");
      alert(JSON.stringify({ author, article, subject, createdAt }));
      Axios.patch(`http://localhost:4000/${prevData._id}`, {
        author,
        article,
        subject,
        createdAt,
      })
        .then((res) => {
          console.log(res.data);
          this.getdata();
          this.setState(this.intialState, () =>
            localStorage.removeItem("userData")
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("b");
      Axios.post("http://localhost:4000/", {
        author,
        article,
        subject,
        createdAt,
      })
        .then((res) => {
          console.log(res.data);
          this.getdata();
          this.setState(this.intialState);
        })
        .catch((err) => console.log(err));
    }
  };

  _handleDelete = (e, data) => {
    e.preventDefault();
    const { author, article, subject, createdAt } = this.state;
    const prevData = JSON.parse(localStorage.getItem("userData")) || [];
    console.log(prevData);

    //alert(`http://localhost:4000/${data._id}`)
    alert(JSON.stringify({ author, article, subject, createdAt }));
    Axios.delete(`http://localhost:4000/${prevData._id}`, {
      author,
      article,
      subject,
      createdAt,
    })
      .then((res) => {
        console.log(res.data);
        this.getdata();
      })
      .catch((err) => console.log(err));
  };
  _search = (e) => {
    // eslint-disable-next-line
    let result = this.state.data.filter((dataItem) => {
      if (dataItem.author.includes(e.target.value)) return dataItem;
    });
    if (result) this.setState({ data: result });
    if (e.target.value.trim() === "" && this.state.fulldata)
      this.setState({ data: this.state.fulldata });
  };
  cancelCourse = () => {
    this.myFormRef.reset();
  };
  render() {
    const { article, subject, author, createdAt } = this.state;

    return (
      <>
        <div className="container">
          <div
            className="container-fluid pt-4 mt-3 bg-secondary"
            style={{ paddingLeft: 150 }}
          >
            <div className="row">
              <div className="col-md-6">
                <input
                  className="form-control w-50 pl-5 mb-3"
                  name="search"
                  type="search"
                  placeholder="Search"
                  onChange={this._search}
                />
              </div>
            </div>
          </div>
          <form ref={(el) => (this.myFormRef = el)}>
            <List data={this.state} onClick={this._onClick} />
            <Articles values={article} onChange={this._onChange} />
            <Input
              values={{ subject, author, createdAt }}
              onChange={this._onChange}
              onHandleChange={this._handleChange}
              date={this.state.date}
            />
            <Buttons
              onClick={this._onSubmit}
              onHandleDelete={this._handleDelete}
            />
          </form>
        </div>
      </>
    );
  }
}

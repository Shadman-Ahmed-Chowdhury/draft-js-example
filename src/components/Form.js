import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

class Form extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    convertedContent: "",
  };
  handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleCkeditorChange = (event, editor) => {
    const data = editor.getData();
    this.setState({
      message: data,
    });
    console.log(data);
  };
  createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  render() {
    console.log(this.state);
    return (
      <div class="container">
        <h2>Hello from form component!</h2>

        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={this.handleCkeditorChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-sm btn-outline-dark" />
          </div>
        </form>

        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: this.state.message }}
        ></div>
      </div>
    );
  }
}

export default Form;

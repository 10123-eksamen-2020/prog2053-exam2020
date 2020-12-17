import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      msg: { type: String }
    };
  }

  constructor() {
    super();
    this.msg = 'Error';
  }

  static get styles() {
    return css`
      form {
        display: grid;
        grid-template-columns: 120px 200px;
        grid-gap: 5px;
        text-align: right;
      }
    `;
  }

  // din kode her
  render() {
    return html `
      <form>
        <lable for="uname">User-name</lable>
        <input type="email" id="uname" name="uname" placeholde="${this.user.uname}">

        <lable for="firstName">First name</lable>
        <input type="text" id="firstName" name="firstName" placeholde="${this.user.firstName}">

        <lable for="lastName">Last name</lable>
        <input type="text" id="lastName" name="lastName" placeholde="${this.user.lastName}">

        <lable for="oldpwd">Old password</lable>
        <input type="password" id="oldpwd" name="oldpwd" placeholde="${this.user.oldpwd}">

        <lable for="pwd">New password</lable>
        <input type="password" id="pwd" name="pwd" placeholde="${this.user.pwd}">

        <button type="submit" @submit="${(e) => {this.updateUser(e)}}"> Update </button>
        <p> ${this.msg} </p>
      </form>
    `;
  }

  updateUser(e) {
    var updateData = new FormData(e.target.form);
    updateData.append("uid", this.user.uid); // is this variabel

    fetch('api/updateUser.php', {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(updateData)
    }).then(response => response.json()).then(data => {
      try {
        if (data.status == 'fail') {
          this.msg = data.msg;
        } else {
          this.msg = data.status;
        }
      } catch(err) {
        console.log(err);
      }
    });
  }

}
customElements.define('edit-user', EditUser);

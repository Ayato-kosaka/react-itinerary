import React from "react";
import db from "Components/fireB/firestore"
import { withTranslation, WithTranslation } from "react-i18next";
import { PlusButton } from "Components/atoms/AT0004_PlusButton/view";
 
class YsiList extends React.Component<WithTranslation> {
  constructor(props) {
    super(props);
    this.state = {
      ysiList: []
    };
  }
  
  setClick = () => {
    var ysiName = document.getElementById("ystForm").elements["name"]["value"];
    console.log(ysiName)
    db.collection("yasais").add({name: ysiName})
      .then(function (docRef) {
        alert("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        alert("Error adding document: ", error);
      });
  }
 
  getClick = () => {
    let data = [];
    db.collection('yasais').get().then(snapShot => {
      snapShot.forEach(doc => {
        data.push(doc.data());
      });
      this.setState({ ysiList: data });
    });
  }
  
  render() {
    const { t } = this.props;
    return <>
      <form id="ystForm">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
      </form>
      <button onClick={this.setClick}>{t("野菜設定")}</button>
      
      <button onClick={this.getClick}>{t("野菜取得")}</button>
      {this.state.ysiList.map(val => (
        <p>{val.name}</p>
      ))}
      <PlusButton onClick={() => { alert("押すなアホ")}} />
    </>;
  }
}
 
export default withTranslation()(YsiList);
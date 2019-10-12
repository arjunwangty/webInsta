import React, { Component } from "react";
import axios from "axios";
import InputPannel from "./main/InputPannel";
import AboutUs from "./main/AboutUs";
import ContactPage from "./main/ContactPage";

import { Tabs, Descriptions, Button, message } from "antd";

const { TabPane } = Tabs;

class MainWindow extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1",
      url: "",
      aboutUs: "",
      email: "",
      mobile: "",
      urlProcessed: false
    };
  }

  handleSubmitUrl(key) {
    console.log(key.url);
    this.setState({
      url: key.url,
      urlProcessed: true
    });
  }

  handleSubmitAboutUs(key) {
    this.setState({
      aboutUs: key.aboutUs,
      activeTab: "2"
    });
  }

  handleSubmitContact(key) {
    console.log(key.mobile);
    console.log(key.email);
    this.setState({
      mobile: key.mobile,
      email: key.email,
      activeTab: "3"
    });
  }

  handleBack() {
    const prev = this.state.activeTab - 1;
    this.setState({
      activeTab: prev.toString()
    });
  }

  handleSubmit() {
    const { url, aboutUs, email, mobile } = this.state;
    axios
      .post("/userinfo", { url, aboutUs, email, mobile })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
    return message.success("Form submitted");

    //console.log();
  }

  render() {
    if (this.state.urlProcessed) {
      return (
        <div style={{ height: "500px" }}>
          <div style={{ marginBottom: "20px" }}>
            <InputPannel
              urlProcessed={this.state.urlProcessed}
              onSubmit={this.handleSubmitUrl.bind(this)}
            />
          </div>
          <Tabs activeKey={this.state.activeTab}>
            <TabPane tab="Step 1" key="1">
              <div style={{ marginBottom: "20px" }}>
                <AboutUs
                  onSubmit={this.handleSubmitAboutUs.bind(this)}
                  onBack={this.handleBack.bind(this)}
                />
              </div>
            </TabPane>
            <TabPane tab="Step 2" key="2">
              <div style={{ marginBottom: "20px" }}>
                <ContactPage
                  onSubmit={this.handleSubmitContact.bind(this)}
                  onBack={this.handleBack.bind(this)}
                />
              </div>
            </TabPane>
            <TabPane tab="Step 3" key="3">
              <div style={{ marginBottom: "20px" }}>
                <Descriptions title="User Info">
                  <Descriptions.Item label="Username">
                    {this.state.url}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-Mail">
                    {this.state.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                    {this.state.mobile}
                  </Descriptions.Item>
                  <Descriptions.Item label="About Me">
                    {this.state.aboutUs}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className="comment-field-button">
                <Button
                  key="back"
                  type="primary"
                  onClick={this.handleBack.bind(this)}
                  style={{ marginRight: "30px", marginBottom: "10px" }}
                >
                  Go Back
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Generate My Webpage
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div style={{ height: "600px" }}>
          <div style={{ marginBottom: "20px" }}>
            <InputPannel
              urlProcessed={this.state.urlProcessed}
              onSubmit={this.handleSubmitUrl.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
}

export default MainWindow;

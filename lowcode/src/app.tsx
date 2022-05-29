import React from "react";
import { Menu, Layout as AntLayout, Spin, Pagination, Dropdown } from "antd";

class APP extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Pagination defaultCurrent={1} total={50} />
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <a>1st Menu item</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a>2nd Menu item</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a>3rd Menu item</a>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a>Hover me</a>
                </Dropdown>
                <AntLayout style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>首页</AntLayout>
            </div>
        );
    }
}

export default APP;
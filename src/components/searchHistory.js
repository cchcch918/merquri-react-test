import {List, Divider} from "antd";
import React from "react";
import DateUtil from "../utils/DateUtil";
import ImageUtil from "../utils/ImageUtil";
import {
    SearchOutlined, DeleteOutlined
} from '@ant-design/icons';

function SearchHistory({weatherHistoryList, deleteRecord, searchResult}) {

    return (
        <div class="py-1">
            <h1>Search History</h1>
            <Divider/>
            <List
                size="small"
                bordered
                dataSource={weatherHistoryList}
                renderItem={(item, index) =>
                    <List.Item
                        actions={[
                            <a onClick={() => searchResult(index)}><SearchOutlined/></a>,
                            <a onClick={() => deleteRecord(index)}><DeleteOutlined/></a>
                        ]}>
                        <List.Item.Meta
                            avatar={ImageUtil.getWeatherAvatar(item.weather)}
                            title={item.location}
                            description={DateUtil.formatDate(item.dateTime, "DD/MMM/yyyy hh:MM:ss")}
                        >
                        </List.Item.Meta>
                    </List.Item>}
            />
        </div>
    )
}

export default SearchHistory;
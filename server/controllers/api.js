const { sqlQuery } = require('../db/db');

async function getUserInfo() {
    let sql = 'SELECT * FROM draw_UserInfo';

    return await sqlQuery(sql);
}

async function login(query) {
    let sql = `SELECT * FROM draw_UserInfo WHERE userName = ? AND passWord = ?`
    let values = [query.userName, query.passWord];

    return await sqlQuery(sql, values);
}

async function getRoomList() {
    let sql = 'SELECT * FROM draw_Room WHERE status = 1';

    return await sqlQuery(sql);
}

async function getRoomUserList(query) {
    let sql = `
    SELECT 
        ru.userId, ui.name userName
    FROM 
        draw_RoomUser ru
    LEFT JOIN 
        draw_userinfo ui ON ui.id = ru.userId
    WHERE 
        roomId = ?`;
    let values = [query.roomId];

    return await sqlQuery(sql, values);
}

async function getRoomIdByUserId(query) {
    let sql = `SELECT roomId from draw_roomuser WHERE userId = ?`;
    let values = [query.userId];
    let data = await sqlQuery(sql, values);
    
    return data ? (data[0] ? data[0].roomId : null) : null;
}

module.exports = {
    getUserInfo,
    login,
    getRoomList,
    getRoomUserList,
    getRoomIdByUserId
}
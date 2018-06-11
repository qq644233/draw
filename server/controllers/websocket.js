const { sqlQuery } = require('../db/db');


module.exports = {
    async createRoom(query) {
        let sql = 'INSERT INTO draw_Room(id, name, createTime, status) VALUES (0, ?, ?, ?)';
        let values = [query.name, query.createRoom, query.status];

        return await sqlQuery(sql, values);
    },
    async addRoomUser(query) {
        let sql = 'SELECT * FROM draw_RoomUser WHERE userId = ? AND roomId = ?';
        let values = [query.userId, query.roomId];
        let data = await sqlQuery(sql, values);
        if (data.length > 0) return;

        sql = 'INSERT INTO draw_RoomUser(id, userId, roomId) VALUES (0, ?, ?)';

        return await sqlQuery(sql, values);
    },
    async getAllRoomUserList() {
        let sql = `SELECT id,userId, roomId, lastActiveTime, isActive FROM draw_roomuser`;

        return await sqlQuery(sql);
    },
    async updateRoomUserActive(query) {
        let sql = `UPDATE draw_roomuser SET isActive = ? WHERE id = ?`;
        let values = [query.isActive, query.id];

        return await sqlQuery(sql, values);
    },
    async updateKeepAliveByUserId(query) {
        let sql = `UPDATE draw_roomuser SET isActive = ?, lastActiveTime = ? WHERE userId = ?`;
        let values = [query.isActive, query.lastActiveTime, query.userId];

        return await sqlQuery(sql, values);
    }
}
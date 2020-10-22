const mysql = require('../mysql');

exports.getScheduling = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM schedule")
        if (!result){
            return res.status(404).send({ error: error });
        }
        const response = {
            amount: result.length,
            schedule: result.map(prod => {
                return {
                    id_schedule: prod.id_schedule,
                    date_time: prod.date_time,
                    receiver: prod.receiver,
                    message: prod.message,
                    status: prod.status,
                    type_message: prod.type_message,
                    request: {
                        type: 'GET',
                        description: 'Returns the specific scheduling details',
                        url: 'http://localhost:3030/schedule/' + prod.id_schedule
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postScheduling = async (req, res, next) => {
    try {
        const query = `INSERT INTO schedule (date_time, receiver, message, status, type_message) 
                    VALUES (?, ?, ?, ?, ?)`;
        await mysql.execute(query, [
            req.body.date_time,
            req.body.receiver,
            req.body.message,
            req.body.status,
            req.body.type_message
        ]);

        const response = {
            message: 'Schedule successfully entered',
            scheduleCreated: {
                date_time: req.body.date_time,
                receiver: req.body.receiver,
                message: req.body.message,
                status: req.body.status,
                type_message: req.body.type_message,
                request: {
                    type: 'POST',
                    description: 'Inserts the schedule',
                    url: 'http://localhost:3030/schedule'
                }
            }
        }
        return res.status(200).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.get1Scheduling = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM schedule WHERE id_schedule = ?';
        const result = await mysql.execute(query, [req.params.id_schedule]);
        if (result.length == 0) {
            return res.status(404).send({
                message: 'No appointment was found with this id'
            })
        }
        const response = {
            Schedules: {
                id_schedule: result[0].id_schedule,
                date_time: result[0].date_time,
                receiver: result[0].receiver,
                message: result[0].message,
                status: result[0].status,
                type_message: result[0].type_message,
                request: {
                    type: 'GET',
                    description: 'Returns a schedule',
                    url: 'http://localhost:3030/schedule/'[0].id_schedule
                }
            }
        }
        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
exports.patchScheduling = async (req, res, next) => {

    try {
        const query = `UPDATE schedule
                        SET
                            date_time = ?,
                            receiver = ?,
                            message = ?,
                            status = ?,
                            type_message = ?
                    WHERE id_schedule = ?`
        await mysql.execute(query, [
            req.body.date_time,
            req.body.receiver,
            req.body.message,
            req.body.status,
            req.body.type_message,
            req.params.id_schedule
        ]);
        const response = {
            message: 'Schedule updated successfully',
            ActualizedScheduling: {
                id_schedule: req.body.id_schedule,
                date_time: req.body.date_time,
                receiver: req.body.receiver,
                message: req.body.message,
                status: req.body.status,
                type_message: req.body.type_message,
                request: {
                    type: 'PATCH',
                    description: 'Updated scheduling details',
                    url: 'http://localhost:3030/schedule/' + req.body.id_schedule
                }
            }
        }
        res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error })
    }

};

exports.deleteScheduling = async (req, res, next) => {
    try {
        const query = `DELETE FROM schedule WHERE id_schedule = ?`;
        await mysql.execute(query, [req.params.id_schedule]);
        const response = {
            message: 'Scheduling successfully removed',
            request: {
                type: 'DELETE',
                description: 'Removes scheduling',
                url: 'http://localhost:3030/schedule'
            }
        }
        res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};


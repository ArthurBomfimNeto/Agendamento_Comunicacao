const mysql = require('../mysql').pool;

exports.getScheduling = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM schedule',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
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
                return res.status(200).send(response)
            }
        )

    });
};

exports.postScheduling = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(`INSERT INTO schedule (date_time, receiver, message, status, type_message) 
                    VALUES (?, ?, ?, ?, ?)`,
            [req.body.date_time, req.body.receiver, req.body.message, req.body.status, req.body.type_message],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
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
                return res.status(200).send(response)
            }
        )
    });
};

exports.get1Scheduling = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM schedule WHERE id_schedule = ?',
            [req.params.id_schedule],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
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
            }
        )
    });
};

exports.patchScheduling = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`UPDATE schedule
                     SET
                          status = ?
                    WHERE id_schedule = ?`,
            [
                req.body.status,
                req.body.id_schedule
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
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
                            url: 'http://localhost:3030/schedule/' + req.body.id_produtos
                        }
                    }
                }
                res.status(202).send(response);
            }
        )
    });
};

exports.deleteScheduling = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`DELETE FROM schedule WHERE id_schedule = ?`,
            [req.params.id_schedule],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    message: 'Scheduling successfully removed',
                    request: {
                        tipo: 'DELETE',
                        descricao: 'Removes scheduling',
                        url: 'http://localhost:3030/schedule'
                    }
                }
                res.status(202).send(response);
            }
        )
    });
};



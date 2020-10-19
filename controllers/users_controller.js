const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM users WHERE email = ?',
            [req.body.email],
            (error, result) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length > 0) {
                    res.status(409).send({ message: 'User already registered' })
                } else {
                    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                        conn.query(
                            `INSERT INTO users (email, password) VALUES(?, ?)`,
                            [req.body.email, hash],
                            (error, result) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }
                                response = {
                                    message: 'User created successfully',
                                    usersCreated: {
                                        id_users: result.insertId,
                                        email: req.body.email
                                    }
                                }
                                return res.status(201).send({ response })
                            }
                        )
                    });
                }
            })

    });
};

exports.loginUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM users WHERE email = ?',
        [req.body.email],
        (error, results) => {
            conn.release();
            if (error) {return res.status(500).send({error: error})}
            if (results.length < 1){
                return res.status(401).send({ message: 'Authentication failure'})
            }
            bcrypt.compare(req.body.password, results[0].password, (error, result) => {
                if (error){
                    return res.status(401).send({ message: 'Authentication failure'}) 
                }
                if (result) {
                    console.log(result.id_user)
                    const token = jwt.sign({
                        id_user: results[0].id_user,
                        email: results[0].email 
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "10h"
                    });
                    return res.status(200).send({ 
                        message : 'Successfully authenticated',
                        token: token
                    });
                }
                return res.status(401).send({ message: 'Authentication failure'})
            });
        });
});

};
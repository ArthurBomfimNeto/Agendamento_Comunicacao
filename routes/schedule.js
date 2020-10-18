const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).send({
        message: 'Test GET'
    });
});
 
router.post('/', (req, res, next) => {

    const schedule = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    res.status(201).send({
        message:'Test POST',
        created : schedule
    });
});

router.get('/:id_schedule', (req, res, next) =>{
    const id = req.params.id_schedule
    if(id == 1 ){
        res.status(200).send({
            message: 'Test GET especial',
            id:id
        });
    }else{
        res.status(200).send({
            message: 'Test GET ',
            id:id
        });
    }
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        message:'Test PATCH'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        message:'Test DELETE'
    });
});

module.exports = router;

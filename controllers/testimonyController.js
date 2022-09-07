const { request, response } = require("express");
const { Testimony } = require("../db/models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const testimonyGet = async(req = request, res = response) => {
    //Recibe variable page
    let page = req.query.page;
    //Definir items por pagina
    let size = 10;

    page = page - 1
        //Si variable viene indefinida le asigno 0 (para mostrar primera pagina)
    if (page == undefined || page < 0) {
        page = 0;
    }
    //Desde que pagina comieza a mostrar (paginas que se salta)
    let pages = page * size
    try {
        const testimonies = await Testimony.findAndCountAll({
            attributes: ['id', 'name', 'content', 'image'],
            limit: size,
            offset: pages,
            where: {
                softDeleted: false
            }
        });

        let prev;
        let next;
        //Divide el total de datos por el tamaño de pagina y asigna a la variable 'limit' el numero entero menor
        let limit = Math.floor(testimonies.count / size);

        //Condición: si la pagina es mayor a 0, manda el enlace a la pagina anterior, por el contrario null
        prev = page > 0 ? next = `http://localhost:3000/testimony?page=${Number(page)}` : null

        //Condición: si la pagina es menora al total de paginas, manda el enlace a la pagina siguiente, por el contrario null
        next = page < limit ? next = `http://localhost:3000/testimony?page=${Number(page)+2}` : null

        return res.status(200).json({
            'testimonies': testimonies.rows,
            prev,
            next
        });

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}


const testimonyGetOne = async(req = request, res = response) => {

    const { id } = req.params;

    try {
        const testimony = await Testimony.findOne({
            where: {
                id: id,
                softDeleted: false
            }
        })

        res.status(200).json({
            testimony: testimony,
        })

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


const testimonyPost = async(req = request, res = response) => {

    const {
        name,
        content,
        image,
    } = req.body;

    const softDeleted = false;

    const newTestimony = new Testimony({
        name,
        content,
        image
    })

    try {
        await newTestimony.save()
        return res.status(201).json({
            testimony: newTestimony
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}


const testimonyPut = async(req = request, res = response) => {

    const { id } = req.params;

    const {
        name,
        description,
        image
    } = req.body;

    const updatedTestimony = {
        name,
        description,
        image
    }

    try {
        const testimony = await Testimony.findByPk(id)

        if (!testimony) {
            return res.status(404).json({
                msg: `testimony not found ${id}`
            })
        }

        await testimony.update(updatedTestimony);

        return res.status(200).json({
            testimony: testimony
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}


//virtual DELETE
const testimonyDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const updatedTestimony = {
        softDeleted: true
    }

    try {
        const testimony = await Testimony.findByPk(id)

        if (!testimony) {
            return res.status(404).json({
                msg: `testimony not found ${id}`
            })
        }

        await testimony.update(updatedTestimony);

        return res.status(200).json({
            testimony
        })

    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

//phisical DELETE
const testimonyPhisicalDelete = async(req = request, res = response) => {

    const { id } = req.params;

    try {
        const testimony = await testimony.findByPk(id)

        if (!testimony) {
            return res.status(404).json({
                msg: `testimony not found ${id}`
            })
        }

        await testimony.destroy();

        return res.status(200).json({
            msg: 'testimony Deleted'
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}


module.exports = {
    testimonyGet,
    testimonyGetOne,
    testimonyPost,
    testimonyPut,
    testimonyDelete,
}
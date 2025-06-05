import executeQuery from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import fs from 'fs';
import path from "path";

export async function view(req, res) {
    const search = req.query.search ?? '';

    res.render('admin/tech_stack/index', {
        tech_stacks: await executeQuery(`SELECT * FROM tech_stacks 
            WHERE name ILIKE '%${search}%'
            `).then(r => r.rows),
        search: search,
    });
}

export async function viewCreate(req, res) {
    res.render('admin/tech_stack/create');
}

export async function viewUpdate(req, res) {
    res.render('admin/tech_stack/update', {
        tech_stack: await executeQuery(`SELECT * FROM tech_stacks WHERE id=${req.params.id}`).then(r => r.rows[0]),
    });
}

export async function create(req, res) {
    await executeQuery(`INSERT INTO tech_stacks(name, image)
        VALUES (
        '${req.body.name}', 
        '${await saveFile(req.files.image)}'
    );`)

    res.redirect('/admin/tech-stack');
}

export async function update(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? null;

    /* delete image */
    if (image) {
        const image_path = await executeQuery(`select * FROM tech_stacks WHERE id=${id}`).then(r => r.rows[0].image);
        const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));
        
        fs.unlink(file_path, err => {
            if (err) req.flash('fail', 'Previous image is not found.');
        });
    }

    await executeQuery(`UPDATE tech_stacks
	SET
    name='${req.body.name}'
    ${image ? `,image='${await saveFile(image)}'` : ''}
	WHERE id=${id};`);

    res.redirect('/admin/tech-stack');
}

export async function remove(req, res) {
    const id = req.body.id;
    const image_path = await executeQuery(`SELECT * FROM tech_stacks WHERE id=${id}`).then(r => r.rows[0].image);
    const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));

    await executeQuery(`DELETE FROM tech_stacks WHERE id=${id}`);

    fs.unlink(file_path, err => {
        if (err) req.flash('fail', 'Previous image is not found.');
    });

    res.redirect('/admin/tech-stack');
}
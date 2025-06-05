import executeQuery from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import fs from 'fs';
import path from 'path';

export async function view(req, res) {
    const search = req.query.search ?? '';

    res.render('admin/project/index', {
        projects: await executeQuery(`SELECT * FROM projects 
            WHERE 
            name ILIKE '%${search}%'
            `)
            .then(r => r.rows),
        search: search,
    });
}

export async function viewCreate(req, res) {
    res.render('admin/project/create');
}

export async function viewUpdate(req, res) {
    res.render('admin/project/update', {
        ...await executeQuery(`SELECT * FROM projects WHERE id=${req.params.id}`)
            .then(r => r.rows[0]),
    });
}

export async function create(req, res) {
    await executeQuery(`INSERT INTO projects(name, description, image, tech_stacks, github, demo)
    VALUES (
        '${req.body.name}', 
        '${req.body.description}', 
        '${await saveFile(req.files.image)}',
        '{${req.body['tech_stacks[]'].join(',')}}',
        '${req.body.github}',
        '${req.body.demo}'
    );`)

    res.redirect('/admin/project');
}

export async function update(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? null;

    /* delete image */
    if (image) {
        const image_path = await executeQuery(`select * FROM projects WHERE id=${id}`).then(r => r.rows[0].image);
        const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));
        fs.unlink(file_path, err => {
            if (err) req.flash('fail', 'Previous image is not found.');
        });
    }

    await executeQuery(`UPDATE public.projects
	SET 
    name='${req.body.name}', 
    description='${req.body.description}', 
    tech_stacks='{${req.body['tech_stacks[]'].join(',')}}', 
    github='${req.body.github}', 
    demo='${req.body.demo}'
    ${image ? `,image='${await saveFile(image)}'` : ''}
	WHERE id=${id};`);

    res.redirect('/admin/project');
}

export async function remove(req, res) {
    const id = req.body.id;
    const image_path = await executeQuery(`SELECT * FROM projects WHERE id=${id}`).then(r => r.rows[0].image);
    const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));

    await executeQuery(`DELETE FROM projects WHERE id=${id}`);
    
    fs.unlink(file_path, err => {
        if (err) req.flash('fail', 'Previous image is not found.');
    });

    res.redirect('/admin/project');
}
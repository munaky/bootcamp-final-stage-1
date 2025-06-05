import executeQuery from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import fs from 'fs';
import path from 'path';

export async function view(req, res) {
    const search = req.query.search ?? '';

    res.render('admin/work_experience/index', {
        work_experiences: await executeQuery(`SELECT * FROM work_experiences 
            WHERE 
            role ILIKE '%${search}%' OR
            company ILIKE '%${search}%' OR
            start_date ILIKE '%${search}%' OR
            end_date ILIKE '%${search}%'
            ORDER BY id DESC`)
            .then(r => r.rows.map(x => {
                if(!x.end_date) x.end_date = 'Present';

                return x
            })),
        search: search,
    });
}

export async function viewCreate(req, res) {
    res.render('admin/work_experience/create');
}

export async function viewUpdate(req, res) {
    res.render('admin/work_experience/update', {
        ...await executeQuery(`SELECT * FROM work_experiences WHERE id=${req.params.id}`)
            .then(r => {
                let data = r.rows[0];

                data.tasks = data.tasks.join('\n');

                return data;
            }),
    });
}

export async function create(req, res) {
    await executeQuery(`INSERT INTO work_experiences(role, company, image, tasks, tech_stacks, start_date, end_date)
	VALUES (
        '${req.body.role}', 
        '${req.body.company}', 
        '${await saveFile(req.files.image)}', 
        '{${req.body.tasks.replaceAll(',', '&#44;').replaceAll('\n', ',')}}', 
        '{${
            Array.isArray(req.body['tech_stacks[]']) ?
            req.body['tech_stacks[]'].join(',') : 
            req.body['tech_stacks[]'] ?? 'Any'
        }}',
        '${req.body.start_date}',
        '${req.body.end_date}'
    );`)

    res.redirect('/admin/work-experience');
}

export async function update(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? null;

    /* delete image */
    if (image) {
        const image_path = await executeQuery(`select * FROM work_experiences WHERE id=${id}`).then(r => r.rows[0].image);
        const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));
        fs.unlink(file_path, err => {
            if (err) req.flash('fail', 'Previous image is not found.');
        });
    }

    await executeQuery(`UPDATE public.work_experiences
	SET  
    role='${req.body.role}', 
    company='${req.body.company}',  
    tasks='{${req.body.tasks.replaceAll(',', '&#44;').replaceAll('\n', ',')}}', 
    tech_stacks='{${
            Array.isArray(req.body['tech_stacks[]']) ?
            req.body['tech_stacks[]'].join(',') : 
            req.body['tech_stacks[]'] ?? 'Any'
        }}',
    start_date='${req.body.start_date}', 
    end_date='${req.body.end_date}'
    ${image ? `,image='${await saveFile(image)}'` : ''}
	WHERE id=${id};`);

    res.redirect('/admin/work-experience');
}

export async function remove(req, res) {
    const id = req.body.id;
    const image_path = await executeQuery(`SELECT * FROM work_experiences WHERE id=${id}`).then(r => r.rows[0].image);
    const file_path = path.join(req.app.locals.upload_path, image_path.split('/').at(-1));

    await executeQuery(`DELETE FROM work_experiences WHERE id=${id}`);
    
    fs.unlink(file_path, err => {
        if (err) req.flash('fail', 'Previous image is not found.');
    });

    res.redirect('/admin/work-experience');
}
import executeQuery from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import { fromXtoYDate } from "../utils/date.js";
import fs from 'fs';

export async function view(req, res) {
    res.render('admin/work_experience/index', {
        work_experiences: await executeQuery('SELECT * FROM work_experiences ORDER BY id DESC')
            .then(r => r.rows.map(x => {
                return {
                    ...x,
                    date: fromXtoYDate(x.start_date, x.end_date),
                }
            })),
    });
}

export async function viewEdit(req, res) {
    res.render('admin/work_experience/edit', {
        work_experience: await executeQuery(`SELECT * FROM work_experiences WHERE id=${req.params.id}`)
            .then(r => {
                let data = r.rows[0];

                data.tasks = data.tasks.join('\n');
                data.tech_stacks = data.tech_stacks.join('\n');

                return data;
            }),
    });
}

export async function create(req, res) {
    console.log(JSON.stringify(req.body.tasks.replaceAll('\r', '').split('\n')))
    await executeQuery(`INSERT INTO work_experiences(role, company, image, tasks, tech_stacks, start_date, end_date)
	VALUES (
        '${req.body.role}', 
        '${req.body.company}', 
        '${await saveFile(req.files.image)}', 
        '{${req.body.tasks.replaceAll('\n', ',')}}', 
        '{${req.body.tech_stacks.replaceAll('\n', ',')}}',
        '${req.body.start_date}',
        '${req.body.end_date}'
    );`)

    res.redirect('/admin/work_experience');
}

export async function update(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? null;

    /* delete image */
    if (image) {
        const image_path = await executeQuery(`select * FROM tech_stacks WHERE id=${id}`).then(r => r.rows[0].image);
        const file_path = `./src/public/images/uploads/${image_path.split('/').at(-1)}`
        fs.unlink(file_path, err => {
            if (err) throw err;
        });
    }

    await executeQuery(`UPDATE tech_stacks
    SET
    name='${req.body.name}'
    ${image ? `,image='${await saveFile(image)}'` : ''}
    WHERE id=${id};`);

    res.redirect('/admin/work_experience');
}

export async function remove(req, res) {
    const id = req.body.id;
    const image = await executeQuery(`select * FROM tech_stacks WHERE id=${id}`).then(r => r.rows[0].image);
    const file_path = `./src/public/images/uploads/${image.split('/').at(-1)}`

    await executeQuery(`DELETE FROM tech_stacks WHERE id=${id}`);

    /* delete image */
    fs.unlink(file_path, err => {
        if (err) throw err;
    });

    res.redirect('/admin/work_experience');
}
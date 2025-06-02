import executeQuery from "../utils/db.js";
import { saveFile } from "../utils/upload.js";
import fs from 'fs';

export async function view(req, res) {
    res.render('admin/tech_stack/index', {
        tech_stacks: await executeQuery('SELECT * FROM tech_stacks').then(r => r.rows),
    });
}

export async function viewEdit(req, res) {
    res.render('admin/tech_stack/edit', {
        tech_stack: await executeQuery(`SELECT * FROM tech_stacks WHERE id=${req.params.id}`).then(r => r.rows[0]),
    });
}

export async function create(req, res) {
    await executeQuery(`INSERT INTO tech_stacks(name, image)
        VALUES (
        '${req.body.name}', 
        '${await saveFile(req.files.image)}'
    );`)

    res.redirect('/admin/tech_stack');
}

export async function update(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? null;
    
    /* delete image */
    if(image){
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

    res.redirect('/admin/tech_stack');
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

    res.redirect('/admin/tech_stack');
}
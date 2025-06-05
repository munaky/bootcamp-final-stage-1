import executeQuery from "../utils/db.js";
import bcrypt from 'bcrypt';
import { saveFile } from "../utils/upload.js";

export async function viewLogin(req, res) {
    res.render('admin/auth/login');
}

export async function viewRegister(req, res) {
    res.render('admin/auth/register');
}

export async function register(req, res) {
    const email_exists = await executeQuery(`SELECT * FROM users WHERE email='${req.body.email}'`)
        .then(r => r.rows.length > 0 ? true : false)

    if (email_exists) {
        req.flash('fail', 'Email sudah terdaftar.');
        return res.redirect('/auth/register');
    };

    await executeQuery(`INSERT INTO users(name, email, password, image)
        VALUES(
            '${req.body.name}',
            '${req.body.email}',
            '${await bcrypt.hash(req.body.password, 10)}',
            '${await saveFile(req.files.image)}'
        );
        `);

    res.redirect('/auth/login')
}

export async function login(req, res) {
    const user = await executeQuery(`SELECT * FROM users WHERE email='${req.body.email}'`).then(r => r.rows[0])
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return res.redirect('/auth/login');

    req.session.user = {
        name: user.name,
        image: user.image,
    };

    req.flash('info', `Selamat Datang ${user.name}`);

    res.redirect('/admin');
}

export async function logout(req, res) {
    await req.session.destroy();

    res.redirect('/auth/login')
}
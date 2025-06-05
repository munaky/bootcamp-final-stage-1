import executeQuery from "../utils/db.js";

export default async function view(req, res){
    const count_tech_stacks = await executeQuery('SELECT COUNT(*) from tech_stacks;').then(r => r.rows[0].count);
    const count_work_experiences = await executeQuery('SELECT COUNT(*) from work_experiences;').then(r => r.rows[0].count);
    const count_projects = await executeQuery('SELECT COUNT(*) from projects;').then(r => r.rows[0].count);

    res.render('admin/dashboard/index', {
        count_tech_stacks,
        count_work_experiences, 
        count_projects,
    });
}
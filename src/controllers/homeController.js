import executeQuery from "../utils/db.js";
import { fromXtoYDate } from "../utils/date.js";

export async function view(req, res) {
    res.render('main', {
        tech_stacks: await executeQuery('SELECT * FROM tech_stacks').then(r => r.rows),
        projects: await executeQuery('SELECT * FROM projects ORDER BY id DESC').then(r => r.rows),
        work_experiences: await executeQuery('SELECT * FROM work_experiences ORDER BY id DESC')
            .then(r => r.rows.map(x => {
                return {
                    ...x,
                    date: fromXtoYDate(x.start_date, x.end_date),
                }
            })),
    })
}
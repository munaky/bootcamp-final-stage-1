export async function saveFile(file){
    const extension = file.name.split('.').at(-1);
    console.log(extension)
    const file_name = `${Date.now()}.${extension}`;

    await file.mv(`./src/public/images/uploads/${file_name}`);

    return `/images/uploads/${file_name}`;
}
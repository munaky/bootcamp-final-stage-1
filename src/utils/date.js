export function fromXtoYDate(start, end){
    const options = { year: 'numeric', month: 'short' };

    return `${new Date(start).toLocaleDateString('en-US', options)}` +
    ` - ` +
    `${end ? new Date(end).toLocaleDateString('en-US', options) : 'Present'}`;
}
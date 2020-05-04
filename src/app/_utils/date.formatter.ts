export class DateFormatter{
    getDate(d) {
        let date = new Date(d);
        let dia = date.getUTCDate() < 10? `0${date.getUTCDate()}`: date.getUTCDate();
        let mes = date.getUTCMonth() + 1 < 10? `0${date.getUTCMonth() + 1}`: date.getUTCMonth() + 1;
        let anho = date.getUTCFullYear();
        return `${dia}/${mes}/${anho}`;
    }
}
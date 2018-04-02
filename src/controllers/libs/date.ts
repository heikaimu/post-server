export const getNowDate = () => {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    const day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
    const dateStr = year + "-" + month + "-" + day;
    return dateStr;
}
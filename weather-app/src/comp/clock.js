function updateclock(){
    let today = new Date();
    let hours = today.getHours().toString().padStart(2, 0);
    let minutes = today.getMinutes().toString().padStart(2, 0);
    let seconds = today.getSeconds().toString().padStart(2, 0);
    const timestring = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timestring;
}
setInterval(updateclock,1000);
export default updateclock;
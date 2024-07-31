function updatedate(){
    let d = new Date();
    let options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: '2-digit' };
    let dateString = d.toLocaleDateString('en-GB', options);
    document.getElementById('date').textContent = dateString;
}
setInterval(updatedate, 1000);
export default updatedate;
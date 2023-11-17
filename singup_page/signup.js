function validform(){

    let fpass = document.forms['myform']['password'].value;
    // set conditions
    const iscapital = /[A-Z]/.test(fpass);
    const isnumber = /[0-9]/.test(fpass);
    const isspecial = /[@#$&]/.test(fpass);
    let x = document.getElementById('pass');
    if ( (iscapital && isnumber && isspecial ) == false){
        x.innerHTML = '*There password must contain atleast 6 characters,an uppercase letter,a number and a special character.';
        x.style.color = 'red';
        return false;
    }
    // else if (iscapital == false){
    //     alert('Include an uppercase letter')
    //     return false;
    // } else if (isnumber == false){
    //     alert('Include a number')
    //     return false;
    // } else if (isspecial == false){
    //     alert('Include a special character: [@,#,$,&]')
    //     return false;
    // }
    let confirm = document.forms['myform']['re-enter'].value;
    let y = document.getElementById('confirm');
    if (confirm != fpass){
        y.innerHTML = '*Password and Confirm password must be same!!';
        y.style.color = 'red';
        return false;
    }  
}
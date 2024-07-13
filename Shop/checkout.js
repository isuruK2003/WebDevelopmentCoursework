function isNumeric(stringNum) {
    return !isNaN(parseInt(stringNum));
}

function checkCardNumber(formRef) {
    let cardNum = formRef.card.value;
    let cardError = document.getElementById('card-error');

    if (cardNum == '') {
        cardError.innerHTML = '* Cannot be blank';

    } else if (isNaN(parseFloat(cardNum))) {
        cardError.innerHTML = '* Invalid card number';

    } else if (cardNum.length != 16) {
        console.log(cardNum.length);
        cardError.innerHTML = '* Should be 16 digit number';

    } else {
        cardError.innerHTML = '';
        return true;
    }
    return false;
}


function checkExpire(formRef) {
    let expireYear = formRef['expire-year'].value.trim();
    let expireMonth = formRef['expire-month'].value.trim();
    let errorDisp = document.getElementById('expire-error');

    let expireDate = new Date(`${expireYear}-${expireMonth}-02`);
    let today = new Date();

    if (expireYear == '' || expireMonth == '') {
        errorDisp.innerHTML = '* Cannot be blank';
    }

    // this is because js confuses dates with words in it
    if (!(isNumeric(expireYear) && isNumeric(expireMonth)) || isNaN(expireDate)) {
        errorDisp.innerHTML = ' * Incorrect date';

    } else if (expireDate < today) {
        errorDisp.innerHTML = ' * Expired Card';

    } else {
        errorDisp.innerHTML = '';
        return true;
    }
    return false;
}


function checkCvc(formRef) {
    let cvc = formRef.cvc.value;
    let errorDisp = document.getElementById('cvc-error');

    if (!isNumeric(cvc) || cvc.length != 3) {
        errorDisp.innerHTML = '*Invalid CVC';

    } else {
        errorDisp.innerHTML = '';
        return true;
    }
    return false;
}

function checkEmail(formRef) {
    let email = formRef.email.value;
    let errorDisp = document.getElementById('email-error');
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(emailRegex)) {
        errorDisp.innerHTML = '* Invalid email';

    } else {
        errorDisp.innerHTML = '';
        return true;
    }
    return false;

}

function checkForm(formRef) {
    let toCheck = ['fname', 'lname', 'address', 'email', 'card', 'expire-year', 'expire-month', 'cvc'];
    let hasError = false;

    for (let i = 0; i < toCheck.length; i++) {
        let value = formRef[toCheck[i]].value.trim();
        let errorDisp = document.getElementById(`${toCheck[i]}-error`);

        if (value == '') {
            errorDisp.innerHTML = '* Can not be blank';
            hasError = true;
        }
    }

    hasError = (checkCardNumber() &&
                checkExpire() &&
                checkEmail() &&
                checkCvc())
}

function resetForm(formRef) {
    let toCheck = ['fname', 'lname', 'address', 'email', 'card', 'expire-year', 'expire-month', 'cvc'];

    for (let i = 0; i < toCheck.length; i++) {
        formRef[toCheck[i]].value = '';
        document.getElementById(`${toCheck[i]}-error`).innerHTML = '';
    }
}

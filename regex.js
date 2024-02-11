/*  4 types of card was used in this code which are
    1. Visa card which contains between 13 to 16 digits with the first digit being 4
    2. Discover card which contains 16 digits with the first digit being 6
    3. American Express card which contains 15 digits with the first two digits being either 34 0r 37
    4. Master Card which contains 16 digits with the first 2 digits being bwtween 51-55
*/
const cardNumber = 6019123456789012;
if(!(/^\d{13,16}$/.test(cardNumber))){
    console.log('This card number is incorrect')
}else{
    //if the number cotains between 13-16 digits with the first digit being 4 it's Visa card
    if(/^(?=4)[0-9]{13,16}$/.test(cardNumber)){
        console.log('Visa card detected');

    //if the number cotains between 16 digits with the first digit being 6 it's Discover card    
    }else if(/^(?=6)[0-9]{16}$/.test(cardNumber)){
        console.log('Discover card detected');

    //if the number cotains between 13-16 digits with the first 2 digits being 34 or 37 it's American card
    }else if(/^(34|37)[0-9]{13}$/.test(cardNumber)){
        console.log('American Express card detected');
    
    //if the number cotains between 13-16 digits with the first 2 digits being between 51 to 55 it's American card
    }else if(/^(5[1-5])[0-9]{14}$/.test(cardNumber)){
        console.log('MasterCard detected')
    }else{
        console.log('The card does not match any of our patterns')
    }
}
/*
Visa card - 4678123456789012
Master Card - 5334987654321094
American Express - 370112345678901
Discover card - 6019123456789012
*/
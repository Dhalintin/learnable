class Telephone{
    constructor(){
        this.contacts = new Set();
    }

    addPhoneNumber(phoneNumber){
        if(/^(0)\d{10}|^(234)\d{10}$/.test(phoneNumber)){
            this.contacts.add(phoneNumber);
        }else{
            console.log('Please enter a valid phone number');
        }   
    }

    removePhoneNumber(phoneNumber){
        if(this.contacts.has(phoneNumber)){
            this.contacts.delete(phoneNumber)
        }else{
            console.log(`${phoneNumber} has not been added to the contact list.`)
        }
        
    }


    notify(number){
        if(this.contacts.has(number)){
            console.log(this.contacts)
            for(let contact of this.contacts){
                const observer = new Observer();
                observer.printPhoneNumber(number);
                observer.dialPhoneNumber(number)
            }
        }else{
            console.log(`You haven't added ${number} to the contact list`)
        }
    }
}

class Observer{
    printPhoneNumber(number){
        console.log(number);
    }

    dialPhoneNumber(number){
        console.log(`Now Dialling ${number}...`)
    }
}


// Sample Code
const phone = new Telephone();
phone.addPhoneNumber('2348153582943');
phone.addPhoneNumber('08069284112');
phone.addPhoneNumber('08069551006');
phone.notify('08069551006');
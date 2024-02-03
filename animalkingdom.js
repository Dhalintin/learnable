/*
    This is the Animalia class which is the base class
    It contains some of the characteristics (methods) that all animals posses like
    Habitat (where dey live) and nutrition ( what dey eat) because all animals live somewhere and eats something
 */
class Animalia{
    constructor(name, withBackBone = false, coldBlooded = false){
        if(this.constructor == Animalia){
            return new Error('You cannot instantisate this class')
        }
        this.name = name;
        this.withBackBone = withBackBone;
        this.coldBlooded = coldBlooded;
    }

    #animalType(blood, backbone){
        super.name;
        console.log(`${this.name}:  ${blood} animal ${backbone} backbone`)
        // return `${this.name}:  ${blood} animal ${backbone} backbone`;
    }

    animalType(blood, backbone){
        this.blood = blood;
        this.backbone = backbone
        let bloodtype = "cold blooded";
        let vetebrae = "with";
        
        if(this.blood == false){
            bloodtype = "warm blooded";
        }
        
        if(this.backbone == true){
            let vetebrae = "without"
        }

        this.#animalType(bloodtype, vetebrae)
    }

    habitat(home){
        this.home = home;
        console.log(`${this.name} lives in ${this.home}`)
    }

    nutrition(food){
        this.food = food;
        console.log(`${this.name} lives in ${this.food}`)
    }
}

/*
    These are the ColdBlooded and Vertbrae classes which inherits from the Animal class
    It represents the Phyla and has its own characteristics
 */
class ColdBlooded extends Animalia{
    cold(backbone){
        this.backbone = backbone;
        if(backbone == true){
            this.withBackBone = true;
            this.coldBlooded = true;
        }else{
            this.withBackBone = false;
            this.coldBlooded = true;
        }

        this.animalType(this.withBackBone, this.coldBlooded)
    }

    warm(backbone){
        this.backbone = backbone;
        if(backbone == true){
            this.withBackBone = true;
            this.coldBlooded = false;
        }else{
            this.withBackBone = false;
            this.coldBlooded = false;
        }
        this.animalType(this.withBackBone, this.coldBlooded)
    }

}

class Vertebrate extends Animalia{
    with(coldblood){
        this.coldblood = coldblood;
        if(coldblood == true){
            this.withBackBone = true;
            this.coldBlooded = true;
        }else{
            this.withBackBone = true;
            this.coldBlooded = false;
        }

        this.animalType(this.withBackBone, this.coldBlooded)
    }

    without(coldblood){
        this.coldblood = coldblood;
        if(coldblood == true){
            this.withBackBone = false;
            this.coldBlooded = true;
        }else{
            this.withBackBone = false;
            this.coldBlooded = false;
        }

        this.animalType(this.withBackBone, this.coldBlooded)
    }
}


/*
    These are the Anthropoda, Fish, Reptiles and Aves Classes inherits from the Coldblooded class
    These classes only has the classify method (for now) this method calls from the class that it inherits from
    It calls this class in a way to identify if the animal id cold-blooded or not and if the animal has vertebrae (backbone) or not
*/
class Anthropoda extends ColdBlooded{
    classify(){
        return this.cold(false)
    }
}

class Fish extends Vertebrate{
    classify(){
        return this.with(true)
    }
}

class Reptiles extends ColdBlooded{
    classify(){
        return this.cold(false)
    }
}

class Aves extends ColdBlooded{
    classify(){
        return this.warm(false)
    }
}

//The Amphibia and Mammal  Classes inherits from the Vetebrae class so if an animal is in the Anthropoda it means it is a coldblooded vertibrae
class Amphibia extends Vertebrate{
    classify(){
        return this.with(true)
    }
}

class Mammal extends Vertebrate{
    classify(){
        return this.with(true)
    }
}


//Here are test codes calling an instance of some of the classes
const frog = new Amphibia('Frog')
frog.classify();

const butterfly = new Anthropoda('Butterfly')
butterfly.classify();

const tortoise = new Reptiles('Tortoise')
tortoise.classify()

const eagle = new Aves('Eagle')
eagle.classify();

const cat = new Aves('Cat')
cat.classify();

const croocker = new Fish('Croocker')
croocker.classify()


/* This is the output from the test code

    Frog:  cold blooded animal with backbone
    Butterfly:  warm blooded animal with backbone
    Tortoise:  warm blooded animal with backbone
    Eagle:  warm blooded animal with backbone
    Cat:  warm blooded animal with backbone
    Croocker:  cold blooded animal with backbone
*/
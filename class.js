class Student{
    name = 'Darlington';
    type = 'Backend';
    static age = 28;

    static getAge(){
        console.log(Student.age);
    }
}

//Accessing Static Properties using the class
const std = Student.age;
console.log(std)

//Accessing Static Properties using the Getters
const std2 = Student.getAge();
console.log(std2)
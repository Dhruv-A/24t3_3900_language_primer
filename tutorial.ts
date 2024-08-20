/**
 * TypeScript Primer
 * 
 * This primer will cover:
 * 1. Basic TypeScript Data Types and Functions
 * 2. Object-Oriented Programming with TypeScript
 * 
 */

// ------------------------
// Basic Data Types and Operations
// ------------------------

// Strings: Can be denoted with either single quotes or double quotes.
const undergradCourseName: string = 'COMP3900';
const postgradCourseName: string = "COMP9900";

console.log(`The undergrad version of this course is ${undergradCourseName} and the postgrad version is ${postgradCourseName}.`);

// Numbers: TypeScript determines the type (integer or float) from the value.
const number: number = 5; // Integer
const decimal: number = 3.0; // Float

// Basic arithmetic operations
const addedNumbers: number = number + decimal;
const subtractedNumbers: number = number - decimal;
const multipliedNumbers: number = number * decimal;
const dividedNumbers: number = number / decimal;
const exponentResult: number = number ** 8; // Exponentiation

console.log(`Added: ${addedNumbers}, Subtracted: ${subtractedNumbers}, Multiplied: ${multipliedNumbers}, Divided: ${dividedNumbers}`);
console.log(`${number} raised to the power of 8 is ${exponentResult}`);

// Booleans and Logical Operators
const isUndergrad: boolean = true;
const isPostgrad: boolean = false;

console.log(`Is undergraduate: ${isUndergrad}`);
console.log(`Is postgraduate (negated): ${!isPostgrad}`);
console.log(`Both undergraduate and postgraduate: ${isUndergrad && isPostgrad}`);

// ------------------------
// Arrays and List Manipulation
// ------------------------

// Arrays in TypeScript can be dynamically sized.
const courses: string[] = ["COMP3900", "COMP9900"];

// Adding items using push method.
courses.push("COMP1234");

// Accessing array elements by index.
console.log(`Third course in the list: ${courses[2]}`);

// Iterating through arrays using for...of loop.
for (const course of courses) {
    console.log(course);
}

// Sorting arrays
const numbers: number[] = [5, 1, 7, 4];
numbers.sort((a, b) => a - b); // Sorting numbers in ascending order
console.log(`Sorted numbers: ${numbers.join(", ")}`);

// ------------------------
// Sets in TypeScript
// ------------------------

/**
 * Sets are a built-in object type in TypeScript (and JavaScript).
 * Sets store unique values of any type and automatically remove duplicates.
 */

// Creating a new set with some initial values.
const studentSet: Set<string> = new Set(["Student A", "Student B", "Student C"]);

// Adding new values to the set. Duplicates will be ignored.
studentSet.add("Student A");
studentSet.add("Student B");  // This will do nothing as "Student B" is already in the set.

console.log(`Students in the set:`);
studentSet.forEach(student => console.log(student));  // Output the unique students (but necessarily not in order)

// Checking the size of the set
console.log(`Number of unique students: ${studentSet.size}`);

// Deleting a value from the set
studentSet.delete("Student C");
console.log(`After removing Student C, students:`);
studentSet.forEach(student => console.log(student));

// Checking if a value is in the set
console.log(`Is Student A in the set? ${studentSet.has("Student A")}`);
console.log(`Is Student C in the set? ${studentSet.has("Student C")}`);

// Clearing all elements from the set
studentSet.clear();
console.log(`Number of students after clearing the set: ${studentSet.size}`);


// ------------------------
// Object-Oriented Programming in TypeScript
// ------------------------

// Defining a class with a constructor and methods.
class Student {
    name: string;
    zID: string;

    constructor(name: string, zID: string) {
        this.name = name;
        this.zID = zID;
    }

    printInfo(): void {
        console.log(`Student Name: ${this.name}, ZID: ${this.zID}`);
    }
}

// Creating an instance of a class (we call this an object)
const student = new Student("John Doe", "z1234567");
student.printInfo();  // Output student information

// ------------------------
// Handling more complex scenarios with classes
// ------------------------

class Course {
    students: Student[] = [];

    constructor(public courseName: string, public term: string) {}

    addStudent(student: Student): void {
        this.students.push(student);
    }

    printCourseInfo(): void {
        console.log(`Course: ${this.courseName}, Term: ${this.term}`);
        this.students.forEach(s => s.printInfo());
    }
}

// Creating a course and adding students
const course = new Course("COMP3900", "Term 2");
course.addStudent(new Student("Alice", "z7654321"));
course.addStudent(new Student("Bob", "z8765432"));
course.printCourseInfo();

// ------------------------
// Additional Concepts
// ------------------------

// Enums are used to define named constants.
enum WeekDays {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

const today: WeekDays = WeekDays.Wednesday;
console.log(`Today is ${WeekDays[today]}`);

// Interfaces can be used to define the structure of objects.
interface Tutor {
    name: string;
    course: string;
    availability: string[];
}

const tutor: Tutor = {
    name: "Example Tutor",
    course: "COMP3900",
    availability: ["Monday", "Wednesday", "Friday"]
};

console.log(`${tutor.name} teaches ${tutor.course} and is available on ${tutor.availability.join(", ")}.`);

const group = {  // we can create group(object) here for further use
    name: 'Kevin',
    age: 20,
    department: 'cs department',
    greet: () => {   // this will fail since the arrow(=>) function refers to the global node runtime scope instead of the 'group' object
        console.log('Hi, this is ' + this.name);
    },
    greetKevin() {   // this will be a local function (works!)
        console.log('Hi, this is ' + this.name);
    },

}

group.greet();
group.greetKevin();

/*------------        -------------*/

const printElements = ({name, greetKevin}) => {  // destructuring(set elements as param, only use the object as args)
    console.log(name);
    const bound = greetKevin.bind(group);  // we can also use call()/apply() here
    bound();
    // we have to use 'bind()' to set 'this' value, referring to the function invoked upon
}

printElements(group);

const {name, age} = group;  // object destructuring
console.log(age);

/*------------        -------------*/

const info = [  //arrayMethod
    'Thinking',
    'Sports'
]

console.log(info.map(info => {
    return 'About me: ' + info;
}));
console.log(info);

/*------------        -------------*/

const copiedInfo = [...info];
copiedInfo.push('Programming'); // immutability
console.log(copiedInfo);

/*------------        -------------*/

const toArray = (...args) => {  // Rest and Spread
    return args;
}

console.log(toArray(1, 2, 3, 4, 5));
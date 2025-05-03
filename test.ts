import { visitNodes } from "typescript"

const a = [
    {
        "Q.1": "What's the most efficient way to handle asynchronous operations in a large-scale JavaScript web application, prioritizing performance and maintainability?",
        "options": [
            
            {
                "a": "Callbacks"
            },
            {
                "b": "Promises"
            },
            {
                "c": "Async/Await with proper error handling and task scheduling"
            },
            {
                "d": "SetTimeout loops"
            }
        ]
    },
   
]
console.log(a[0]["Q.1"])
console.log(a[0].options[0].a)

const b =[
    [
        {
            "Q.1": "Explain the concept of event delegation in JavaScript and how it improves performance compared to attaching event listeners to individual elements, providing specific examples of its application in a dynamic web application."
        },
        {
            "Ans.1": "Event delegation leverages the bubbling phase of event propagation to attach a single event listener to a parent element.  Instead of attaching listeners to numerous child elements, the parent listens for events.  When an event occurs on a child, the event bubbles up to the parent, triggering the listener. This improves performance because it reduces the number of event listeners attached to the DOM, leading to fewer memory overhead and improved responsiveness. \n\nFor example, consider a dynamic list where items are added or removed frequently. Instead of attaching a 'click' listener to each list item individually, one listener could be attached to the list's parent (e.g., an `<ul>`). The listener would check the event's `target` property to determine which list item was clicked, and perform the appropriate action. This prevents the need to re-attach event listeners every time the list is updated.\n\nAnother example is handling form submissions within a dynamically generated form. Attaching a listener to the form itself, and then identifying the submitted element via `target`, is more efficient than individually attaching listeners to every submit button. sent "
        }
    ],
    
    
  ]

  console.log(b[0][0]["Q.1"])

//   //   console.log(b[0]["Ans.1"])


// const k = {
//     1:"my name is kaif"
// }
// console.log(k[1])

// const n = {1: 'What is the basic unit of life?', 2: 'Name two types of cells.', 3: 'What is the function of mitochondria?', 4: 'What is the difference between DNA and RNA?'}
console.log(typeof('a'))
// console.log(n[2])


const string = "true — The correct answer is a data structure that stores a collection of elements of the same data type.  The provided answer is completely unrelated.\n"

let change = string.trim().toLocaleLowerCase()
console.log(typeof(change))
console.log(change)


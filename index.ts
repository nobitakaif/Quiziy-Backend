import expres, { response } from "express"
import cors from "cors"
import { GoogleGenAI } from "@google/genai"
import { GoogleGenerativeAI } from "@google/generative-ai"

const ai = new GoogleGenAI( {apiKey:process.env.GEMINI_API_KEY} );
// const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
const app = expres()


app.use(expres.json())
app.use(cors())
// app.use(expres.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    console.log("someone is hitting home route")
    res.status(200).json({
        msg:"everything is fine"
    })
})

app.post("/testing",(req,res)=>{
    console.log("someone is hitting the /testing endpoint")
    res.status(200).json({
        msg:"Route is working"
    })
})

// app.post('/prompt',async function(req,res){
//     const difficultyLevel = req.body.difficultyLevel
//     const topic = req.body.topic
//     const question = req.body.question

//     if(!difficultyLevel || !topic || !question){
//         res.send("give me the all the details")
//         return 
//     }


//     try{
//         const result = await model.generateContentStream({
//             contents: [
//                 {
//                     role: "user", 
//                     parts: [{text: "i am giving a topic you have ask me questoin related to the topic and along with the question i'll give you difficulty level and number of question based on you have to ask me queston exact related the topic with provided difficulty level and number of question don't give me anything else. each question should be with number like Q.1 - like this , This is the topic " + topic + ", This is difficulty level "+ difficultyLevel + ", and number of question is " + question + " and you have to give me the answer of every quesion like ans.1 - like this. you need to ask to exact related the topic please don't ask out of the topic and if the difficulty level is more then medium then ask very difficult question that no one is able to give answer easily because you have act like interviewer, you don't need to mark the difficuly level anywhere, try to give response  should be like [[{'what it 2+2'}]] question answer should be in different obj like [[{'what is 2+2'}], [{'what is 3-3'}]] like this and please do not add anyword in the starting or ending like ```json[]```. why are you using ```json in starting end also using  in the end ``` this. you don't need return anything else just start response like this [[{}],[{}}]. Your response must be strictly valid JSON array like this: [[{{'Q.1': 'abc'}}], [{{'Q.2': 'xyz'}}]]. Do not skip anything. No explanation. No extra text."}]
//                 }
//             ],
//             generationConfig: {
//                 maxOutputTokens: 50000,
                
//             }
//         });
//         console.log((await result.response).text)
//             const answer = (await result.response).candidates?.[0]?.content?.parts?.[0]?.text?.trim();
       
//             const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))
//             await sleep(20000)

//         // // const finalAnswer = ((await result.response).text())
//         // // res.status(200).send(finalAnswer)
//         // // console.log(typeof(finalAnswer))

//         // let fixedAnswer = answer?.replace(/'/g, '"')
//         // fixedAnswer = fixedAnswer?.replace(/([{,]\s*)([A-Za-z0-9_.]+)\s*:/g, '$1"$2":')
//         // if(!fixedAnswer){
//         //     res.send(500)
//         //     return
//         // }
//         // const parsedAnswer = JSON.parse(fixedAnswer)
//         // res.status(200).json(parsedAnswer) 

//         // const answer = (await result.response).candidates?.[0]?.content?.parts?.[0]?.text?.trim();

// console.log("AI Raw Answer -->", answer)

// // let fixedAnswer = answer?.replace(/'/g, '"')

// // if (!fixedAnswer?.endsWith(']')) {
// //    fixedAnswer += ']'
// // }

// // let parsedAnswer;
// // try {
// //     if(!fixedAnswer){
// //         res.send(500)
// //         return
// //     }
// //    parsedAnswer = JSON.parse(fixedAnswer)
// // } catch (err) {
// //    console.log("JSON parse error", err)
// //     res.status(500).send("Invalid JSON format from AI")
// //     return
// // }

// // res.status(200).json(parsedAnswer)
// res.send(200)

//     }catch(e){
//         res.send("something went wrong")
//         return
//     }
// })


app.post("/prompt",async function(req,res){
    console.log("someone is hittin the /prompt endpoint")
    const difficultyLevel = req.body.difficultyLevel
    const topic = req.body.topic
    const question = req.body.question
    if(!difficultyLevel || !topic || !question){
        res.status(400).send("body is not present ")
        return 
    }
    const response = await ai.models.generateContent({
        model:"gemini-1.5-flash",
        contents:[{
            role:"user",
            // parts:[{text:"i am giving a topic you have ask me questoin related to the topic and along with the question i'll give you difficulty level and number of question based on you have to ask me queston exact related the topic with provided difficulty level and number of question don't give me anything else. each question should be with number like Q.1 - like this , This is the topic " + topic + ", This is difficulty level "+ difficultyLevel + ", and number of question is " + question + " and you have to give me the answer of every quesion like ans.1 - like this. you need to ask to exact related the topic please don't ask out of the topic and if the difficulty level is more then medium then ask very difficult question that no one is able to give answer easily because you have act like interviewer, you don't need to mark the difficuly level anywhere, try to give response  should be like [[{'what it 2+2'},{'ans':'4'}]] question answer should be in different obj like [[{'what is 2+2'},{2}], [{'what is 3-3'},{0}]] like this and please do not add anyword in the starting or ending like ```json[]```. why are you using ```json in starting end also using  in the end ``` this. you don't need return anything else just start response like this [[{}],[{}}]. Your response must be strictly valid JSON array like this: [[{{'Q.1': 'what is 2+2'},{'ans':'2'}}], [{{'Q.2': 'what is 2-2'},{'ans':'0'}}]]. Do not skip anything. No explanation. No extra text."}],
            parts:[
                {text:"i will give you a topic, difficultylevel and nummber of question based on the topic and difficulty Level you have to ask me question related to the topic. do not return me anything else if the number of question is 10 then ask me only 10 question not extra and less. here is difficulty Level " + difficultyLevel + " here is the topic "+ topic + " here is the number of question " + question + ". you don't need to give me this answer of questoin just ask me only question. if the difficulty level is more than medium then you have to ask me very difficult question because you have to act like an interviewe .you have return me response in the form of array like ['what is 2+2', 'what is 3-3'] something like this. please don't start response like this ```json[]```, don not use this format and also give me the answer of every question just like this ['what is 2+2' '2']. please do not send response with ``` ticks do not use, just use only [......] this not ```[....]``` this. r "}
            ],
                         
        }]
      });
    const result = response.text

    console.log(typeof(result))
    console.log(result)
    res.status(200).json({
        finalAnswer:result
    })
})


app.post("/check",async function(req,res){
    // check the ans is correct or not 
    // parse the question and answer in the body  
})


app.post("/checkbox",async function(req,res){
    console.log("someone is hitting the /checkbox end point")
    const difficultyLevel = req.body.difficultyLevel
    const topic = req.body.topic
    const question = req.body.question

    if(!difficultyLevel || !topic || !question){
        res.send("give me the all the details")
        return 
    }
    try{
        // const resposne = await ai.models.generateContent({
        //     model:"gemini-1.5-flash",
        //     contents: [
        //         {
        //             role:"user",
        //             parts:[{text:"i am giving you a topic and you have to ask me question related to the topic and you have to give me in the form of mcq like first give me the question Q.1 and then below give me 4 option and based on the question i'll select one these option, here's the topic " + topic + " and difficulty level " + difficultyLevel + " and number of question " + question + "and option word's length should be short and try to everytime you need to mu`st ask different question, and if the user give the difficulty level of more than medium then give the very difficult question because no one is easily able to give the answer and you have to act like and interviewer and  you have to give the response in the form of json object like [{ 'Q.1' : 'what is 2+2', [{'a' : '5' }, {'b' : '8'} , {'c' : '10'}, {'d' : '4'}] }] you have to follow this pattern and you have to give the option in few word don't send larg option's length"}],
        //         //     generationConfig: {
        //         //         maxOutputTokens: 100000,
                       
        //         //   }
        //         }
        //     ],
           
        // });

        async function main(){
            const response = await ai.models.generateContent({
                model:"gemini-1.5-flash",
                contents:[{
                    role:"user",
                    // parts:[{
                    //         text:`i am giving you a topic and you have to ask me question related to the topic and you have to give me in the form of mcq like first give me the question Q.1 and then below give me 4 option and based on the question i'll select one these option, here's the topic  ${topic}  and difficulty level  ${difficultyLevel}  and number of question  ${question} and option word's length should be short and try to everytime you need to must ask different question, and if the user give the difficulty level of more than medium then give the very difficult question because no one is easily able to give the answer and you have to act like and interviewer and
                    //         Act like a strict interviewer.

                    //         Rules:
                    //         1. You must always respond only in valid JSON array format.
                    //         2. Each question should be like:
                    //         [
                    //         {
                    //             "Q.1": "Your question here?",
                    //             "options": [
                    //             { "a": "option1" },
                    //             { "b": "option2" },
                    //             { "c": "option3" },
                    //             { "d": "option4" }
                    //             ]
                    //         }
                    //         ]
                    //         3. The option value must be maximum 2-3 words only.
                    //         4. Escape inner double quotes like this: \".
                    //         5. Do not add any explanation.
                    //         6. Generate ${question} number of questions on topic: ${topic}.
                    //         7. Difficulty: ${difficultyLevel}.
                    //         8. Questions must be unique and challenging.
                    //         9. Always validate output before sending.

                    //         Your response must be only the JSON array.

                    //         you have to give the response in the form of json object like [
                    //         {
                    //             "Q.1": "What is 2+2?",
                    //             "options": [
                    //             { "a": "5" },
                    //             { "b": "8" },
                    //             { "c": "10" },
                    //             { "d": "4" }
                    //             ]
                    //         }
                    //         ]
                    //         you have to follow this pattern and you have to give the option in few word don't send larg option's length. your reponse must should be type of arrary or object
                            
                    //         `
                    // }],
                    parts:[{text:
                        `Act like a strict interviewer.
                        You have to ask MCQ type question.
                    

                        Rules for generating response:

                        0. Do not generate question like -> define this....., create this....., etc and every option is fully meaningfull don't make option seprate like half correct option in a. and half correct option in b. 
                        
                        1. You must always respond only in valid JSON array format.

                        2. Each question should follow this structure:
                        [
                        {
                            "Q.1": "Your question here?",
                            "options": [
                            { "a": "option1" },
                            { "b": "option2" },
                            { "c": "option3" },
                            { "d": "option4" }
                            ]
                        }
                        ]

                        3. The option value must be very short — maximum 2-3 words only.

                        4. Escape inner double quotes like this: \".

                        5. Do not add any explanation, description, or extra text.

                        6. Generate exactly ${question} number of questions on the topic: ${topic}.

                        7. Difficulty Level: ${difficultyLevel}

                        8. Rules for Difficulty:
                        - If difficulty level is "easy" — generate simple basic questions.
                        - If difficulty level is "medium" — generate moderately tricky questions.
                        - If difficulty level is "hard" or above — generate very difficult and uncommon questions that are not easy to guess.

                        9. All questions must be unique and different from each other.

                        10. Validate your output strictly before sending.
                        
                        11. Everytime you have give tottaly different question as comparision previous question 

                        Important:
                        > If you generate invalid JSON or break any rule — your response will be rejected.
                        - Do not include explanations or extra messages in the output.
                        Your response must only be a valid JSON array. No extra text or notes.

                        ---

                        Example of valid response format:
                        [
                        {
                            "Q.1": "What is 2+2?",
                            "options": [
                            { "a": "5" },
                            { "b": "8" },
                            { "c": "10" },
                            { "d": "4" }
                            ]
                        }
                        ]

                        ---

                        User Input:
                        > Topic: ${topic}  
                        > Difficulty Level: ${difficultyLevel}  
                        > Number of Questions: ${question}
                        `}]
                    // generationConfig:{
                    //     maxOutputTokens: 100000,
                    // }
                }]
            })
            return response.text
        }
        let response = await main()
        const parseJson = JSON.stringify(response,null,2)
        res.status(200).json({
            finalAnswer:response
        })
        
        // const result = response.text

        // console.log(typeof(result))
        // console.log(result)
        // res.status(200).send(result)
    }catch(e){
        res.send("something went wrong")
        return
    }
})

const fixInvalidJSON = (data: string) => {
    let fixedData = data;
    fixedData = fixedData.replace(/```json|```/g, "");
    fixedData = fixedData.replace(/'/g, '"');
    fixedData = fixedData.replace(/(\w)"(\w)/g, '$1\\"$2');
    fixedData = fixedData.replace(/,\s*([}\]])/g, "$1");
    fixedData = fixedData.replace(/\n/g, "");
    if (fixedData.startsWith("json")) {
      fixedData = fixedData.replace("json", "").trim();
    }
    return fixedData;
  };


// parts:[{text:`you are teacher and you have to check the answer. We will provide you answer and along with question you have to check it the answer is correct or not. The questio type is MCQ but we will give you question and correct or answer you

//     Note - 1: you have to return "true" if the option is correct if the option is wrong the you have to return "false"
//     Note - 2: Question could be any kind eg. coding, governmnet exam, math, science, nursery to 12th, core subject etc. Question can be anything you don't need to predict the question, your task is to check the answer is correct or not according to the question.
//     Note - 3: if the answer is similar to the correct answer then also you needs to return true

//     Examples :
//     Q.1 What does print("Hello") do?
//         a : Adds 1+1
//         b : Prints Hello
//         c : Crashes
//         d : Errors

//         The correct answer is "Prints Hello" 
//         return true
//     This is actual sturcture of Question's type but we will give you only question and right option just like "Prints Hello"

//     here is some more example : 
//     Q.1 What is the cardinality of the set of all real numbers?
           
//         answer:c 
//         return ture 
    
//     Q.1 What does SSC stand for?
//         a :Staff Selection Commission
//         b :State Selection Committee
//         c :School Selection Commission
//         d :Subordinate Staff Committee

//         answer : state selection commission
//     return false because the correct full form is "Staff Selection Commission"

//     -- if the answer is correct then return true otherwise false
//     here is you ${question} and here is you answer ${answer}
    
//     Note :
//         Plese do not return anything else return only "true" or "false" but if the answer is false then you need to also explain why the answer is false and what is the right answer but if the answer is correct then return "true" nothing else 
//         `}]






// parts: [{
//     text: `You are a cool teacher. Only reply "true" if the answer is correct, or "false" if it is incorrect. and explain why answer is wrong. Question: ${question} Answer: ${answer}. Questoin - Answer can be anything you need to return the true and false based on the question. answer will be associated to the question, the question type is MCQ if the answer is related to the correct answer then you can also return true that means give i will give you only some word of answer just like we got the option in MCQ and only one option is correct exactly same
//     here is the some example of how you need to perform:
//     eg.1    question - "what is 2+2"
//             answer - "4" 
//             return true -> because the sum of 2+2 is 4 and the answer is 4 so you have to return true
//     eg.2    question - "who is the king of forest"
//             answer - "lion"
//             return true -> because the king of forest is lion answer is correct so you need to return true
//     eg.3    question - "is india country"
//             answer - "no"
//             return false -> because india is country and the answer is no so you need to return false
//     eg.4    question - "what is the full form of HTML?"
//             answer - "Hyper Temp Mermory Language
//             return false -> because the full of html is Hyper Text Markup Language so you need to return false
    
// NOTE: Question could be anything, your task only to check the answer is correct or not if correct then return "true" otherwise "false"  
// also you need to tell us why this question is wrong
//     `

// }],


// ----------------------------------- This prompt from chatgpt

    
  const checkQuiz = async (question: string, answer: string): Promise<any | null> => {
    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: {
            role: "user",
            parts: [{
                text: `You are an intelligent and helpful teacher. Your job is to verify whether a given answer is correct for a given multiple-choice question (MCQ). You know better every only one option contain correct answer if the provided answer in single word and related to the correct answer then you can also return "true".  You will receive a question and a possible answer (just the selected option, not all choices). You need to analyze and check if the provided answer is correct.
            
                Your response must follow these **strict rules**:
                
                =======================
                🔹 RESPONSE FORMAT:
                =======================
                - If the answer is correct or very close in meaning to the correct answer → return ONLY: **"true"**
                - If the answer is incorrect → return ONLY: **"false"**, and **also provide a short explanation** that includes:
                  - Why the answer is wrong
                  - What the correct answer is
                
                =======================
                🔹 IMPORTANT NOTES:
                =======================
                1. **DO NOT** return anything else besides "true" or "false" with explanation.
                2. If the answer is **similar** in wording or meaning to the correct option, return "true".
                3. The question can be from **any domain**: coding, math, science, competitive exams, general knowledge, nursery to class 12, etc.
                4. If the answer **uses different wording** but means the same thing, accept it as correct and return "true".
                5. Only **one** correct answer is assumed for each question.
                6. You know better only one option contain correct answer if the provided answer in single word or related to the correct answer then you have to must also return "true"
                
                =======================
                🔹 EXAMPLES: 
                =======================
                These are the only example you don't need to apply the method on this example, i will provide you question you have to apply to them, if the answer is incorrect then you tell us why the answer is incorrect and what it is the correct answer. Even the answer contain grammeticly mistake you have to avoid it 
                ✅ Example 1:  
                Question: What does print("Hello") do?  
                Answer: Prints Hello  
                → "true"
                
                
                
                ❌ Example 3:  
                Question: What does SSC stand for?  
                Answer: State Selection Commission  
                → "false" — The correct answer is **Staff Selection Commission**
                
                ❌ Example 4:  
                Question: What is the full form of HTML?  
                Answer: Hyper Text Making Language  
                → "false" — The correct answer is **HyperText Markup Language**
                
                ✅ Example 5:  
                Question: What is 3 x 5?  
                Answer: 15  
                → "true"
                
                ❌ Example 6:  
                Question: What is 3 x 5?  
                Answer: 12  
                → "false" — The correct answer is **15**
                
                ✅ Example 7 (close match):  
                Question: What is the chemical symbol for water?  
                Answer: H2O  
                → "true"
                
                =======================
                🔹 TASK:
                =======================
                Now use the instructions above to evaluate the following:
                
                Question: ${question}  
                Answer: ${answer}
                `
           
        }]
    }
  });

    const ans = response.text
    // const ans = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("inside the function:", ans);
    
    // return ans
    return ans?.trim().toLowerCase().startsWith("true");

}

app.post('/quizy',async function(req,res){
    const questions = req.body.one
    const answers = req.body.sec
    let totalCorrect = 0
    let result = []
    console.log(`get Question from client ${questions}, get Answer from client ${answers}`)
    console.log(questions ," ", answers)
    console.log(typeof(questions))
    for(let i = 0; i < questions.length;i++){
        result[i] = checkQuiz(questions[i],answers[i])
        if(await result[i] == true){
            totalCorrect= totalCorrect+1
        }
    }

    

    // let result = await checkQuiz(questions,answers)
    // result?.trim().toLowerCase().startsWith("false");
    console.log('inside the route',result)
    res.status(200).json({
        totalQuestion : questions.length,
        totalCorrect : totalCorrect,
        result,
    })
})


app.post('/submit',async function(req,res){
    console.log("someone is hittin the /submit endpoint")
    let questions:any = []
    let answer:any = []

    const getQuestionFromUser = req.body.allQuestion
    const getAnswerFromUser = req.body.allAnswer
    
    for(let i = 0;i<getQuestionFromUser.length;i++){
        questions.push(getQuestionFromUser[i])
        answer.push(getAnswerFromUser[i])
    }
    let totallCorrectAnswer:any = 0;
    async function checkResult(){
        const response = await ai.models.generateContent({
            model:"gemini-1.5-flash",
            contents:[{
                role:"user",                             
                parts:[{text:`{
                    You are given two arrays:


                    1. 'question' - an array of questions in string format. Question can be anything 
                    2. 'answer' - an array of answers corresponding to each question.

                    Your task is to evaluate each question and check if the provided answer is correct.

                    Rules (strictly follow this):
                    - Evaluate each question yourself (e.g., solve "what is 2+2").
                    - Compare the result with the corresponding value in the 'answer' array.
                    - If the answer is correct, return true; if incorrect, return false.
                    - Your final output should be a JSON object that includes:
                    - 'response': an array of booleans (true/false), one for each question.
                    - 'totalCorrect': an integer representing how many answers were correct.

                    Important:
                    - The length of the 'response' array must exactly match the length of the 'question' array.
                    - Only provide the response in the required JSON format.
                    - Do not include explanations or extra messages in the output.
                    - you have to give the give the response 100% accurate. This is most important based on your response i will marks out the students so please don't make any mistake
                    - you have to act like an examminar

                    Example input:
                    {
                    "question": ["what is 2+2", "what is 3+3", "what is 2*5"],
                    "answer": [4, 6, 20]
                    }
                    answer of questoin[0] is answer[0] something like this for all elements
                    Expected output:
                    {
                    "response": [true, true, false],
                    "totalCorrect": 2
                    }
                    you have to apply alll the example to this given question and given answer
                    here is your question ${questions}
                    here is your answer ${answer}


                `}]
                }],
                
        })
        return response.text
    }


    const response = await checkResult()
    let nextTotal :any = 0
    if(!response){
        console.log("response is empty")

        return
    }

    // const vaildResponse = response.replace(/'/g, '"');
    // const parseData = JSON.parse(vaildResponse)
    const vaildStr = fixInvalidJSON(response)
    const paresdStr = JSON.parse(vaildStr)
    console.log(paresdStr.response)
    // const newResponse = 
    const convertedArray = paresdStr.response.map(Boolean)
    console.log(typeof(convertedArray[0]))
    for(let i = 0 ; i<paresdStr.response.length; i++){
        if(paresdStr.response[i]){
            nextTotal= nextTotal+1
        }
    }
    // console.log(questions)
    // console.log(response)
    console.log(typeof(paresdStr.response[0]))
    console.log(nextTotal)
    res.json({
        questions:questions,
        answer : response,
        numebrOfQueston : questions.length,
        CorrectAnswer : totallCorrectAnswer
    })
})

app.listen(3002,()=>{
    console.log("server is running or port 3002")
})






